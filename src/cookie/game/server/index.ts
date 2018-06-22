import { DataTypes } from "@/protocol/data/DataTypes";
import Account from "@/account";
import DataManager from "@/protocol/data";
import Servers from "@/protocol/data/classes/Servers";
import CharacterBaseInformations from "@/protocol/network/types/CharacterBaseInformations";
import LiteEvent from "@/utils/LiteEvent";

export default class Server {
  public id: number;
  public name: string;
  public characters: CharacterBaseInformations[] = [];

  private account: Account;
  private readonly onServerSelected = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
  }

  public get ServerSelected() {
    return this.onServerSelected.expose();
  }

  public async UpdateSelectedServerDataMessage(message: any) {
    this.id = message.serverId;
    const serverResp = await DataManager.get<Servers>(
      DataTypes.Servers,
      this.id
    );
    this.name = serverResp[0].object.nameId;
    this.onServerSelected.trigger();
  }

  public async UpdateCharactersListMessage(message: any) {
    if (message.characters.length > 0) {
      this.characters.concat(message.characters);
    }
  }
}
