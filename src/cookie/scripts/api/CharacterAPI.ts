import Account from "@account";
import { PlayerLifeStatusEnum } from "@protocol/enums/PlayerLifeStatusEnum";

export default class CharacterAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public isAlive(): boolean {
    return this.account.game.character.lifeStatus === PlayerLifeStatusEnum.STATUS_ALIVE_AND_KICKING;
  }

  public isTombstone(): boolean {
    return this.account.game.character.lifeStatus === PlayerLifeStatusEnum.STATUS_TOMBSTONE;
  }

  public isPhantom(): boolean {
    return this.account.game.character.lifeStatus === PlayerLifeStatusEnum.STATUS_PHANTOM;
  }

  public name(): string {
    return this.account.game.character.name;
  }

  public level(): number {
    return this.account.game.character.level;
  }

  public sex(): boolean {
    return this.account.game.character.sex;
  }

  public lifePoints(): number {
    return this.account.game.character.stats.lifePoints;
  }

  public maxLifePoints(): number {
    return this.account.game.character.stats.maxLifePoints;
  }

  public lifePointsP(): number {
    return this.account.game.character.stats.lifePercent;
  }

  public experience(): number {
    return this.account.game.character.stats.experiencePercent;
  }

  public energyPoints(): number {
    return this.account.game.character.stats.energyPoints;
  }

  public maxEnergyPoints(): number {
    return this.account.game.character.stats.maxEnergyPoints;
  }

  public energyPointsP(): number {
    return this.account.game.character.stats.energyPercent;
  }

  public get kamas(): number {
    return this.account.game.character.inventory.kamas;
  }

  public sit() {
    this.account.game.character.sit();
  }

  public freeSoul(): boolean {
    return this.account.game.character.freeSoul;
  }
}
