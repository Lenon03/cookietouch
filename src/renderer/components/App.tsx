import BreedsUtility from "@/core/BreedsUtility";
import MapPoint from "@/core/pathfinder/MapPoint";
import { BlockSpectatorScenarios } from "@/extensions/fights/configuration/enums/BlockSpectatorScenarios";
import { FightStartPlacement } from "@/extensions/fights/configuration/enums/FightStartPlacement";
import { FightTactics } from "@/extensions/fights/configuration/enums/FightTactics";
import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import { MapChangeDirections } from "@/game/managers/movements/MapChangeDirections";
import Account from "@account";
import SpellToBoostEntry from "@account/SpellToBoostEntry";
import { BoostableStats } from "@game/character/BoostableStats";
import DataManager from "@protocol/data";
import DTConstants from "@protocol/DTConstants";
import * as React from "react";
import Infos from "./Infos";

export class App extends React.Component<{}, {}> {

  public account: Account;

  constructor(props: {}) {
    super(props);
    const lang = "fr";
    DTConstants.Init()
    .then(() => MapPoint.Init())
    .then(() => DataManager.Init(lang))
    .then(() => BreedsUtility.Init());
    // this.account = new Account("favyqujuqebe", "dgWHrI4gRAIEqRET", lang);
    this.account = new Account("cookieproject2", "azerty123456", lang);
    this.account.data.server = "Herdegrize";
    this.account.data.character = "Devor-Juana"; // Devor-Juana Brucef-Aka
    // this.account.config.characterCreation.create = true;
    // this.account.config.characterCreation.server = "Herdegrize";
    // this.account.config.spellsToBoost.push(new SpellToBoostEntry(687, "Point Enflammé", 5));
    // this.account.config.statToBoost = BoostableStats.INTELLIGENCE;
  }

  public render() {
    return (
      <div>
        <h1>CookieTouch</h1>
        <button onClick={() => this.start()}>Start</button>
        <button onClick={() => this.stop()}>Stop</button>
        <hr />
        <button onClick={() => this.attack()}>Attack</button>
        <hr />
        <button onClick={() => this.changeMap(MapChangeDirections.Top)}>Top</button>
        <button onClick={() => this.changeMap(MapChangeDirections.Bottom)}>Bottom</button>
        <button onClick={() => this.changeMap(MapChangeDirections.Left)}>Left</button>
        <button onClick={() => this.changeMap(MapChangeDirections.Right)}>Right</button>
        <hr />
        <Infos account={this.account} />
      </div>
    );
  }

  private changeMap(dir: MapChangeDirections) {
    const res = this.account.game.managers.movements.changeMap(dir);
    this.account.logger.logDebug("", `Movement Result: ${res}`);
  }

  private attack() {
    // Sorts
    // const spell1 = new Spell(141, "Pression", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);
    // const spell2 = new Spell(155, "Vita", SpellTargets.SELF, 3, 1, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);
    // const spell3 = new Spell(153, "Puissance", SpellTargets.SELF, 1, 1, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);
    // const spell1 = new Spell(686, "Picole", SpellTargets.SELF, 3, 1, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);
    // const spell2 = new Spell(687, "Point Enflammé", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.FIRE, 100, 0, false, false, false, false);
    // const spell3 = new Spell(
    // 692, "Gueule de bois", SpellTargets.ENEMY, 2, 1, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);
    const spell1 = new Spell(34, "Invo Tofu", SpellTargets.EMPTY_CELL, 5, 1, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);
    const spell2 = new Spell(32, "Resis naturelle", SpellTargets.ALLY, 1, 1, 100, 100, SpellResistances.NEUTRAL, 100, 0, false, false, false, false);
    const spell3 = new Spell(21, "Griffe spectrale", SpellTargets.ENEMY, 1, 3, 100, 100, SpellResistances.FIRE, 100, 0, false, false, false, false);

    this.account.extensions.fights.config.spells = [];
    this.account.extensions.fights.config.spells.push(spell1);
    this.account.extensions.fights.config.spells.push(spell2);
    this.account.extensions.fights.config.spells.push(spell3);
    // config
    this.account.extensions.fights.config.startPlacement = FightStartPlacement.CLOSE_TO_ENEMIES;
    this.account.extensions.fights.config.monsterToApproach = -1;
    this.account.extensions.fights.config.spellToApproach = -1;
    this.account.extensions.fights.config.blockSpectatorScenario = BlockSpectatorScenarios.WHEN_SOMEONE_JOINS;
    this.account.extensions.fights.config.lockFight = false;
    this.account.extensions.fights.config.tactic = FightTactics.AGGRESSIVE;
    this.account.extensions.fights.config.maxCells = 4;
    this.account.extensions.fights.config.approachWhenNoSpellCasted = true;
    this.account.extensions.fights.config.baseApproachAllMonsters = true;
    this.account.extensions.fights.config.regenStart = 60;
    this.account.extensions.fights.config.regenEnd = 80;
    //
    const group = this.account.game.map.getMonstersGroup()[0];
    if (group !== undefined) {
      this.account.game.managers.movements.moveToCell(group.cellId);
    }
  }

  private start() {
    this.account.start();
  }

  private stop() {
    this.account.stop();
  }
}
