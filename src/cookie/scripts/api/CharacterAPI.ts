import Account from "@account";
import { PlayerLifeStatusEnum } from "@protocol/enums/PlayerLifeStatusEnum";

export default class CharacterAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public get isAlive(): boolean {
    return (
      this.account.game.character.lifeStatus ===
      PlayerLifeStatusEnum.STATUS_ALIVE_AND_KICKING
    );
  }

  public get isTombstone(): boolean {
    return (
      this.account.game.character.lifeStatus ===
      PlayerLifeStatusEnum.STATUS_TOMBSTONE
    );
  }

  public get isPhantom(): boolean {
    return (
      this.account.game.character.lifeStatus ===
      PlayerLifeStatusEnum.STATUS_PHANTOM
    );
  }

  public get name(): string {
    return this.account.game.character.name;
  }

  public get level(): number {
    return this.account.game.character.level;
  }

  public get sex(): boolean {
    return this.account.game.character.sex;
  }

  public get lifePoints(): number {
    return this.account.game.character.stats.lifePoints;
  }

  public get maxLifePoints(): number {
    return this.account.game.character.stats.maxLifePoints;
  }

  public get lifePointsP(): number {
    return this.account.game.character.stats.lifePercent;
  }

  public get experience(): number {
    return this.account.game.character.stats.experiencePercent;
  }

  public get energyPoints(): number {
    return this.account.game.character.stats.energyPoints;
  }

  public get maxEnergyPoints(): number {
    return this.account.game.character.stats.maxEnergyPoints;
  }

  public get energyPointsP(): number {
    return this.account.game.character.stats.energyPercent;
  }

  public get kamas(): number {
    return this.account.game.character.inventory.kamas;
  }

  public freeSoul(): boolean {
    return this.account.game.character.freeSoul();
  }

  public sit() {
    this.account.game.character.sit();
  }
}
