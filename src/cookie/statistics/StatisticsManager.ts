import Account from "@/account";
import { GatherResults } from "@/game/managers/gathers";
import DataManager from "@/protocol/data";
import Items from "@/protocol/data/classes/Items";
import AchievementRewardSuccessMessage from "@/protocol/network/messages/AchievementRewardSuccessMessage";
import CharacterExperienceGainMessage from "@/protocol/network/messages/CharacterExperienceGainMessage";
import CharacterLevelUpMessage from "@/protocol/network/messages/CharacterLevelUpMessage";
import DisplayNumericalValueMessage from "@/protocol/network/messages/DisplayNumericalValueMessage";
import GameFightEndMessage from "@/protocol/network/messages/GameFightEndMessage";
import FightResultPlayerListEntry from "@/protocol/network/types/FightResultPlayerListEntry";
import ObjectObtainedEntry from "@/statistics/ObjectObtainedEntry";
import { List } from "linqts";

export default class StatisticsManager {

  public objectsObtainedInFights: List<ObjectObtainedEntry>;
  public objectsObtainedInGathers: List<ObjectObtainedEntry>;
  public achievementsFinished: number;
  public averageFightTime: number;
  public experienceGained: number;
  public fightsCount: number;
  public fightsLost: number;
  public fightsWon: number;
  public gathersCount: number;
  public kamasGained: number;
  // -> General
  public levelsGained: number;
  // -> Fights
  public totalFightsTime: number;
  // -> Gathers
  public totalGathersTime: number;

  private lastObjectGained: number;
  private gatherStartTime: [number, number];

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.achievementsFinished = 0;
    this.averageFightTime = 0;
    this.experienceGained = 0;
    this.fightsCount = 0;
    this.fightsLost = 0;
    this.fightsWon = 0;
    this.gathersCount = 0;
    this.kamasGained = 0;
    this.levelsGained = 0;
    this.totalFightsTime = 0;
    this.totalGathersTime = 0;
    this.objectsObtainedInFights = new List();
    this.objectsObtainedInGathers = new List();
    this.lastObjectGained = 0;

    this.account.game.managers.gathers.GatherStarted.on(() => this.gatherStarted.bind(this));
    this.account.game.managers.gathers.GatherFinished.on(() => this.gatherFinished.bind(this));
    this.account.game.character.inventory.ObjectGained.on(() => this.objectGained.bind(this));
  }

  public UpdateGameFightEndMessage(message: GameFightEndMessage) {
    this.fightsCount++;
    this.totalFightsTime += message.duration;
    this.averageFightTime += ((message.duration - this.averageFightTime) / this.fightsCount);

    for (const t of message.results) {
      if (t._type === "FightResultPlayerListEntry") {
        const result = t as FightResultPlayerListEntry;
        if (result.id === this.account.game.character.id) {
          this.kamasGained += result.rewards.kamas;
          // Outcome 0 = Lost
          if (result.outcome === 0) {
            this.fightsLost++;
          } else {
            this.fightsWon++;
          }
          // Objects obtained
          for (let i = 0; i < result.rewards.objects.length; i += 2) {
            this.addOrUpdate(this.objectsObtainedInFights, result.rewards.objects[i], result.rewards.objects[i + 1]);
          }
        }
      }
    }
    // Set object's percentages
    const totalQty = this.objectsObtainedInFights.Sum((o) => o.quantity);
    this.objectsObtainedInFights.ForEach((obj) => {
      obj.percentage = obj.quantity / totalQty * 100;
    });
  }

  public UpdateCharacterExperienceGainMessage(message: CharacterExperienceGainMessage) {
    this.experienceGained += message.experienceCharacter;
  }

  public UpdateCharacterLevelUpMessage(message: CharacterLevelUpMessage) {
    this.levelsGained += message.newLevel - this.account.game.character.level;
  }

  public UpdateAchievementRewardSuccessMessage(message: AchievementRewardSuccessMessage) {
    this.achievementsFinished++;
  }

  public UpdateDisplayNumericalValueMessage(message: DisplayNumericalValueMessage) {
    if (message.entityId === this.account.game.character.id && this.lastObjectGained !== 0) {
      this.addOrUpdate(this.objectsObtainedInGathers, this.lastObjectGained, message.value);
      this.lastObjectGained = 0;
      // Set object's percentages
      const totalQty = this.objectsObtainedInGathers.Sum((o) => o.quantity);
      this.objectsObtainedInGathers.ForEach((obj) => {
        obj.percentage = obj.quantity / totalQty * 100;
      });
    }
  }

  private gatherStarted() {
    this.gatherStartTime = process.hrtime();
  }

  private gatherFinished(result: GatherResults) {
    if (result === GatherResults.GATHERED) {
      this.gathersCount++;
      const MS_PER_SEC = 1e3;
      const MS_PER_NS = 1e-6;
      const diff = process.hrtime(this.gatherStartTime);
      this.totalGathersTime += diff[0] * MS_PER_SEC + diff[1] * MS_PER_NS;
    }
  }

  private objectGained(obj: number) {
    this.lastObjectGained = obj;
  }

  private async addOrUpdate(list: List<ObjectObtainedEntry>, gid: number, qty: number) {
    let elem = list.FirstOrDefault((o) => o.gid === gid);
    if (!elem) {
      const itemResp = await DataManager.get(Items, gid);
      elem = new ObjectObtainedEntry(gid, itemResp[0].object.nameId, 0);
      list.Add(elem);
    }
    elem.quantity += qty;
  }
}
