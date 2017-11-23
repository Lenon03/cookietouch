import { BlockSpectatorScenarios } from "@/extensions/fights/configuration/enums/BlockSpectatorScenarios";
import { FightStartPlacement } from "@/extensions/fights/configuration/enums/FightStartPlacement";
import { FightTactics } from "@/extensions/fights/configuration/enums/FightTactics";
import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import { MapChangeDirections } from "@/game/managers/movements/MapChangeDirections";
import Account from "@account";
import DataManager from "@protocol/data";
import DTConstants from "@protocol/DTConstants";
import * as React from "react";
import Game from "./Game";
import Infos from "./Infos";

export class App extends React.Component<{}, {}> {

  public account: Account;

  constructor(props: {}) {
    super(props);
    const lang = "fr";
    DTConstants.Init();
    DataManager.Init(lang);
    this.account = new Account("cookieproject1", "azerty123456", lang);
  }

  public render() {
    return (
      <div>
        <Game />
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
    const pression = new Spell(141, "??", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);
    const vita = new Spell(155, "??", SpellTargets.SELF, 3, 1, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);
    const puissance = new Spell(153, "??", SpellTargets.SELF, 1, 1, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);

    this.account.extensions.fights.config.spells.push(pression);
    this.account.extensions.fights.config.spells.push(vita);
    this.account.extensions.fights.config.spells.push(puissance);
    // config
    this.account.extensions.fights.config.startPlacement = FightStartPlacement.CLOSE_TO_ENEMIES;
    this.account.extensions.fights.config.monsterToApproach = -1;
    this.account.extensions.fights.config.spellToApproach = -1;
    this.account.extensions.fights.config.blockSpectatorScenario = BlockSpectatorScenarios.NEVER;
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
