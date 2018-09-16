import MonsterEntry from "@/game/map/entities/MonsterEntry";
import MovableEntity from "@/game/map/entities/MovableEntity";
import GameRolePlayGroupMonsterInformations from "@/protocol/network/types/GameRolePlayGroupMonsterInformations";

export default class MonstersGroupEntry extends MovableEntity {
  public id: number;
  public leader: MonsterEntry;
  public followers: MonsterEntry[] = [];

  public static async setup(
    infos: GameRolePlayGroupMonsterInformations
  ): Promise<MonstersGroupEntry> {
    const m = new MonstersGroupEntry();
    m.id = infos.contextualId;
    m.cellId = infos.disposition.cellId;
    for (const u of infos.staticInfos.underlings) {
      m.followers.push(await MonsterEntry.setup(u));
    }
    m.leader = await MonsterEntry.setup(
      infos.staticInfos.mainCreatureLightInfos
    );
    return m;
  }

  get monstersCount() {
    return this.followers.length + 1;
  }

  get totalLevel() {
    if (this.followers.length > 0) {
      return (
        this.leader.level +
        this.followers.map(f => f.level).reduce((prev, next) => prev + next)
      );
    } else {
      return this.leader.level;
    }
  }

  public containsMonster(gid: number): boolean {
    if (this.leader.genericId === gid) {
      return true;
    }

    for (const f of this.followers) {
      if (f.genericId === gid) {
        return true;
      }
    }

    return false;
  }
}
