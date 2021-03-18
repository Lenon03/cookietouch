import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import FightsPathfinder from "@/core/pathfinder/fights";
import MoveNode from "@/core/pathfinder/fights/MoveNode";
import MapPoint from "@/core/pathfinder/MapPoint";
import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import RangeNodeEntry from "@/extensions/fights/RangeNodeEntry";
import { SpellCastingResults } from "@/extensions/fights/SpellCastingResults";
import FighterEntry from "@/game/fight/fighters/FighterEntry";
import { SpellInabilityReasons } from "@/game/fight/SpellInabilityReasons";
import DataManager from "@/protocol/data";
import SpellLevels from "@/protocol/data/classes/SpellLevels";
import Spells from "@/protocol/data/classes/Spells";
import { DataTypes } from "@/protocol/data/DataTypes";

export default class SpellsManager {
  private account: Account;
  private enemiesTouched: number = 0;
  private spellIdToCast: number;
  private targetCellId: number;

  constructor(account: Account) {
    this.account = account;

    this.spellIdToCast = -1;
    this.targetCellId = -1;
  }

  public async manageSpell(spell: Spell): Promise<SpellCastingResults> {
    // Check if we have an AOE spell we need to cast
    if (this.spellIdToCast !== -1 && this.spellIdToCast === spell.spellId) {
      this.account.logger.logDebug(
        LanguageManager.trans("spellsManager"),
        LanguageManager.trans(
          "spellLaunchTouched",
          spell.spellName,
          this.targetCellId,
          this.enemiesTouched
        )
      );
      await this.account.game.fight.launchSpell(
        spell.spellId,
        this.targetCellId
      );

      this.spellIdToCast = -1;
      this.targetCellId = -1;
      this.enemiesTouched = 0;

      return SpellCastingResults.CASTED;
    }
    // Check for the distance
    if (!this.isDistanceGood(spell)) {
      return SpellCastingResults.NOT_CASTED;
    }
    if (!this.account.game.fight.playedFighter) {
      return SpellCastingResults.NOT_CASTED;
    }
    // In case its a spell we need to cast at a specific hp percentage
    if (this.account.game.fight.playedFighter.lifePercent > spell.characterHp) {
      return SpellCastingResults.NOT_CASTED;
    }
    // Simple spell
    if (spell.target === SpellTargets.EMPTY_CELL) {
      return this.castSpellOnEmptyCell(spell);
    }
    if (!spell.handToHand && !spell.aoe) {
      return this.castSimpleSpell(spell);
    }
    // HandToHand spell and we're h2h with someone
    if (
      spell.handToHand &&
      !spell.aoe &&
      this.account.game.fight.isHandToHandWithAnEnemy()
    ) {
      return this.castSimpleSpell(spell);
    }
    // HandToHand spell and we're not h2h with someone
    if (
      spell.handToHand &&
      !spell.aoe &&
      !this.account.game.fight.isHandToHandWithAnEnemy()
    ) {
      const target = this.getNearestTarget(spell);
      if (!target) {
        return SpellCastingResults.NOT_CASTED;
      }
      return this.moveToCastSimpleSpell(spell, target);
    }
    // AOE spell (even hand to hand)
    if (spell.aoe) {
      return this.castAoeSpell(spell);
    }
    return SpellCastingResults.NOT_CASTED;
  }

  private async castAoeSpell(spell: Spell): Promise<SpellCastingResults> {
    if (
      spell.target === SpellTargets.ALLY ||
      spell.target === SpellTargets.EMPTY_CELL
    ) {
      return SpellCastingResults.NOT_CASTED;
    }
    if (
      (await this.account.game.fight.canLaunchSpell(spell.spellId)) !==
      SpellInabilityReasons.NONE
    ) {
      return SpellCastingResults.NOT_CASTED;
    }

    if (!this.account.game.fight.playedFighter) {
      return SpellCastingResults.NOT_CASTED;
    }

    const spellEntry = this.account.game.character.getSpell(spell.spellId);
    const spellDataResp = await DataManager.get<Spells>(
      DataTypes.Spells,
      spell.spellId
    );
    const spellData = spellDataResp[0].object;
    const spellLevelResp = await DataManager.get<SpellLevels>(
      DataTypes.SpellLevels,
      spellData.spellLevels[spellEntry!.level - 1]
    );
    const spellLevel = spellLevelResp[0].object;

    // Get all the possible ranges
    const entries: RangeNodeEntry[] = [];
    // Include our current cell
    let entry = await this.getRangeNodeEntry(
      this.account.game.fight.playedFighter.cellId,
      null,
      spell,
      spellLevel
    );
    if (entry.touchedEnemiesByCell.size > 0) {
      entries.push(entry);
    }

    for (const [cellid, moveNode] of FightsPathfinder.getReachableZone(
      this.account.game.fight,
      this.account.game.map.data!,
      this.account.game.fight.playedFighter.cellId
    ).entries()) {
      if (!moveNode.reachable) {
        continue;
      }
      if (moveNode.ap > 0 || moveNode.mp > 0) {
        continue;
      }
      entry = await this.getRangeNodeEntry(cellid, moveNode, spell, spellLevel);
      if (entry.touchedEnemiesByCell.size > 0) {
        entries.push(entry);
      }
    }

    // Get a cell where we can hit the most
    // If we need to move, try to move with te lowest amount of mps (with the same number of touched enemies of course)
    let cellId = -1;
    let fromCellId = -1;
    let node: [number, MoveNode] | null = null;
    let touchedEnemies = 0;
    let usedMps = 99;

    for (const t of entries) {
      for (const [cellid, moveNode] of t.touchedEnemiesByCell.entries()) {
        // Check hand to hand
        if (
          spell.handToHand &&
          !this.account.game.fight.isHandToHandWithAnEnemy(t.fromCellId)
        ) {
          continue;
        }
        // Check if we can cast the spell first
        if (
          (await this.account.game.fight.canLaunchSpellOnTarget(
            spell.spellId,
            t.fromCellId,
            cellid
          )) !== SpellInabilityReasons.NONE
        ) {
          continue;
        }

        // >= in case a cell uses less mp
        if (moveNode < touchedEnemies) {
          continue;
        }
        if (
          moveNode <= touchedEnemies &&
          (moveNode !== touchedEnemies || t.mpUsed > usedMps)
        ) {
          continue;
        }
        touchedEnemies = moveNode;
        cellId = cellid;
        fromCellId = t.fromCellId;
        usedMps = t.mpUsed;
        if (t.node !== null) {
          node = [fromCellId, t.node];
        }
      }
    }

    if (cellId === -1) {
      return SpellCastingResults.NOT_CASTED;
    }
    if (node === null) {
      this.account.logger.logDebug(
        LanguageManager.trans("spellsManager"),
        LanguageManager.trans(
          "spellLaunchedAOE",
          spell.spellName,
          cellId,
          touchedEnemies
        )
      );
      await this.account.game.fight.launchSpell(spell.spellId, cellId);
      return SpellCastingResults.CASTED;
    } else {
      // We need to move
      this.account.logger.logDebug(
        LanguageManager.trans("spellsManager"),
        LanguageManager.trans("needToMoveToCast", fromCellId, spell.spellName)
      );
      // Set the spell to cast
      this.spellIdToCast = spell.spellId;
      this.targetCellId = cellId;
      this.enemiesTouched = touchedEnemies;

      await this.account.game.managers.movements.moveToCellInFight(node);
      return SpellCastingResults.MOVED;
    }
  }

  private async getRangeNodeEntry(
    fromCellId: number,
    node: MoveNode | null,
    spell: Spell,
    spellLevel: SpellLevels
  ): Promise<RangeNodeEntry> {
    // Calculate touched enemies for every cell in spell range
    const touchedEnemiesByCell = new Map<number, number>();
    const range = this.account.game.fight.getSpellRange(fromCellId, spellLevel);

    for (const t of range) {
      const tec = await this.getTouchedEnemiesCount(
        fromCellId,
        t,
        spell,
        spellLevel
      );
      if (tec > 0) {
        touchedEnemiesByCell.set(t, tec);
      }
    }
    return new RangeNodeEntry(fromCellId, touchedEnemiesByCell, node);
  }

  private async getTouchedEnemiesCount(
    fromCellId: number,
    targetCellId: number,
    spell: Spell,
    spellLevel: SpellLevels
  ): Promise<number> {
    let n = 0;
    const zone = await this.account.game.fight.getSpellZone(
      spell.spellId,
      fromCellId,
      targetCellId,
      spellLevel
    );
    if (zone === null) {
      return n;
    }
    for (const t of zone) {
      // Check SELF
      if (spell.carefulAoe && t.cellId === fromCellId) {
        return 0;
      }
      // Check ally
      if (spell.avoidAllies) {
        for (const ally of this.account.game.fight.allies) {
          if (ally.cellId === t.cellId) {
            return 0;
          }
        }
      }

      for (const enemy of this.account.game.fight.enemies) {
        if (enemy.cellId === t.cellId) {
          n++;
        }
      }
    }
    return n;
  }

  private async castSimpleSpell(spell: Spell): Promise<SpellCastingResults> {
    if (!this.account.game.fight.playedFighter) {
      return SpellCastingResults.NOT_CASTED;
    }
    if (
      (await this.account.game.fight.canLaunchSpell(spell.spellId)) !==
      SpellInabilityReasons.NONE
    ) {
      return SpellCastingResults.NOT_CASTED;
    }

    const target = this.getNearestTarget(spell);
    if (target !== null) {
      const sir = await this.account.game.fight.canLaunchSpellOnTarget(
        spell.spellId,
        this.account.game.fight.playedFighter.cellId,
        target.cellId
      );

      if (sir === SpellInabilityReasons.NONE) {
        this.account.logger.logDebug(
          LanguageManager.trans("spellsManager"),
          LanguageManager.trans(
            "spellCasted",
            spell.spellName,
            target.name,
            target.cellId
          )
        );
        await this.account.game.fight.launchSpell(spell.spellId, target.cellId);
        return SpellCastingResults.CASTED;
      }

      if (sir === SpellInabilityReasons.NOT_IN_RANGE) {
        return this.moveToCastSimpleSpell(spell, target);
      }
    } else if (spell.target === SpellTargets.EMPTY_CELL) {
      // A spell on empty cell is special case
      return this.castSpellOnEmptyCell(spell);
    }
    return SpellCastingResults.NOT_CASTED;
  }

  private async moveToCastSimpleSpell(
    spell: Spell,
    target: FighterEntry
  ): Promise<SpellCastingResults> {
    if (!target) {
      return SpellCastingResults.NOT_CASTED;
    }
    // We'll move to cast the spell (if we can) with the lowest number of MP possible
    let node: [number, MoveNode] | null = null;
    let pmUsed = 99;

    if (!this.account.game.map.data || !this.account.game.fight.playedFighter) {
      return SpellCastingResults.NOT_CASTED;
    }

    const reachableZone = FightsPathfinder.getReachableZone(
      this.account.game.fight,
      this.account.game.map.data,
      this.account.game.fight.playedFighter.cellId
    ).entries();

    for (const [cellId, moveNode] of reachableZone) {
      if (!moveNode.reachable || !moveNode.path) {
        continue;
      }

      // Only choose the safe paths
      // TODO: Maybe in the futur try to cast the spell even with tackle cost, in a good way of course
      if (moveNode.path.ap > 0 || moveNode.path.mp > 0) {
        continue;
      }

      if (
        spell.handToHand &&
        !this.account.game.fight.isHandToHandWithAnEnemy(cellId)
      ) {
        continue;
      }

      if (
        (await this.account.game.fight.canLaunchSpellOnTarget(
          spell.spellId,
          cellId,
          target.cellId
        )) !== SpellInabilityReasons.NONE
      ) {
        continue;
      }

      if (moveNode.path.reachable.length <= pmUsed) {
        node = [cellId, moveNode];
        pmUsed = moveNode.path.reachable.length;
      }
    }

    if (node !== null) {
      this.account.logger.logDebug(
        LanguageManager.trans("spellsManager"),
        LanguageManager.trans("moveToCast", node["0"], spell.spellName)
      );
      await this.account.game.managers.movements.moveToCellInFight(node);
      return SpellCastingResults.MOVED;
    }
    return SpellCastingResults.NOT_CASTED;
  }

  private async castSpellOnEmptyCell(
    spell: Spell
  ): Promise<SpellCastingResults> {
    if (
      (await this.account.game.fight.canLaunchSpell(spell.spellId)) !==
      SpellInabilityReasons.NONE
    ) {
      return SpellCastingResults.NOT_CASTED;
    }
    // In case we need to cast the spell on an empty case next to the character but all of them are taken
    if (
      spell.target === SpellTargets.EMPTY_CELL &&
      this.account.game.fight.getHandToHandEnemies().length === 4
    ) {
      return SpellCastingResults.NOT_CASTED;
    }

    if (!this.account.game.fight.playedFighter) {
      return SpellCastingResults.NOT_CASTED;
    }

    const spellEntry = this.account.game.character.getSpell(spell.spellId);
    if (!spellEntry) {
      return SpellCastingResults.NOT_CASTED;
    }
    const spellDataResp = await DataManager.get<Spells>(
      DataTypes.Spells,
      spell.spellId
    );
    const spellData = spellDataResp[0].object;
    const spellLevelResp = await DataManager.get<SpellLevels>(
      DataTypes.SpellLevels,
      spellData.spellLevels[spellEntry.level - 1]
    );
    const spellLevel = spellLevelResp[0].object;

    const range = this.account.game.fight.getSpellRange(
      this.account.game.fight.playedFighter.cellId,
      spellLevel
    );
    for (const t of range) {
      if (
        (await this.account.game.fight.canLaunchSpellOnTarget(
          spell.spellId,
          this.account.game.fight.playedFighter.cellId,
          t
        )) === SpellInabilityReasons.NONE
      ) {
        const mp = MapPoint.fromCellId(t);
        const pMp = MapPoint.fromCellId(
          this.account.game.fight.playedFighter.cellId
        );
        if (!mp || !pMp) {
          continue;
        }
        if (spell.handToHand && mp.distanceToCell(pMp) !== 1) {
          continue;
        }
        this.account.logger.logDebug(
          LanguageManager.trans("spellsManager"),
          LanguageManager.trans("spellCastedCell", spell.spellName, t)
        );
        await this.account.game.fight.launchSpell(spell.spellId, t);
        return SpellCastingResults.CASTED;
      }
    }
    return this.moveToCastSpellOnEmptyCell(spell, spellLevel);
  }

  private async moveToCastSpellOnEmptyCell(
    spell: Spell,
    spellLevel: SpellLevels
  ): Promise<SpellCastingResults> {
    // We'll move to cast the spell (if we can) with the lowest number of MP possible
    let node: [number, MoveNode] | null = null;
    let pmUsed = 99;
    if (!this.account.game.fight.playedFighter || !this.account.game.map.data) {
      return SpellCastingResults.NOT_CASTED;
    }
    for (const [cellid, moveNode] of FightsPathfinder.getReachableZone(
      this.account.game.fight,
      this.account.game.map.data,
      this.account.game.fight.playedFighter.cellId
    ).entries()) {
      if (!moveNode.reachable || !moveNode.path) {
        continue;
      }
      // Only choose the safe paths
      // TODO: Maybe in the futur try to cast the spell even with tackle cost, in a good way of course
      if (moveNode.path.ap > 0 || moveNode.path.mp > 0) {
        continue;
      }
      // if (spell.handToHand && MapPoint.fromCellId(kvp.key).distanceToCell(MapPoint.fromCellId())) {
      //   continue;
      // }
      const range = this.account.game.fight.getSpellRange(cellid, spellLevel);
      for (const t of range) {
        if (
          (await this.account.game.fight.canLaunchSpellOnTarget(
            spell.spellId,
            cellid,
            t
          )) !== SpellInabilityReasons.NONE
        ) {
          continue;
        }
        if (moveNode.path.reachable.length >= pmUsed) {
          continue;
        }
        node = [cellid, moveNode];
        pmUsed = moveNode.path.reachable.length;
      }
    }
    if (node !== null) {
      await this.account.game.managers.movements.moveToCellInFight(node);
      return SpellCastingResults.MOVED;
    }
    return SpellCastingResults.NOT_CASTED;
  }

  private getNearestTarget(spell: Spell): FighterEntry | null {
    if (spell.target === SpellTargets.SELF) {
      return this.account.game.fight.playedFighter;
    }

    if (spell.target === SpellTargets.EMPTY_CELL) {
      return null; // Assuming that the others never return null
    }

    const filter = (fighter: FighterEntry | null) => {
      if (!fighter) {
        return false;
      }
      // In case the user wants to ignore invocations
      if (
        this.account.extensions.fights.config.ignoreSummonedEnemies &&
        fighter.stats.summoned
      ) {
        return false;
      }

      return (
        fighter.lifePercent <= spell.targetHp &&
        this.isResistanceGood(spell, fighter)
      );
    };

    return spell.target === SpellTargets.ENEMY
      ? this.account.game.fight.getNearestEnemy(-1, filter)
      : this.account.game.fight.getNearestAlly(filter);
  }

  private isDistanceGood(spell: Spell): boolean {
    // This option is ignored when the value is 0
    if (spell.distanceToClosestMonster === 0) {
      return true;
    }

    const nearestEnemy = this.account.game.fight.getNearestEnemy();
    if (nearestEnemy === null) {
      return false;
    }

    if (!this.account.game.fight.playedFighter) {
      return true;
    }

    const mp = MapPoint.fromCellId(nearestEnemy.cellId);
    const mp2 = MapPoint.fromCellId(
      this.account.game.fight.playedFighter.cellId
    );
    if (!mp || !mp2) {
      return true;
    }
    return mp2.distanceToCell(mp) < spell.distanceToClosestMonster;
  }

  private isResistanceGood(spell: Spell, fighter: FighterEntry): boolean {
    switch (spell.resistance) {
      case SpellResistances.NEUTRAL:
        return (
          fighter.stats.neutralElementResistPercent <= spell.resistanceValue
        );
      case SpellResistances.EARTH:
        return fighter.stats.earthElementResistPercent <= spell.resistanceValue;
      case SpellResistances.FIRE:
        return fighter.stats.fireElementResistPercent <= spell.resistanceValue;
      case SpellResistances.WIND:
        return fighter.stats.airElementResistPercent <= spell.resistanceValue;
      default:
        // Water
        return fighter.stats.waterElementResistPercent <= spell.resistanceValue;
    }
  }
}
