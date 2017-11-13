import DofusTouchClient from "../dofus/DofusTouchClient";
import HaapiConnection from "../dofus/HaapiConnection";
import ConnectionFrame from "../frames/ConnectionFrame";
import Dispatcher from "../utils/Dispatcher";
import Character from "./Character";

export class Account {

  public username: string;
  public password: string;
  public character: Character;
  public client: DofusTouchClient;
  public haapi: HaapiConnection;
  public dispatcher: Dispatcher;
  public salt: string;
  public key: number[];
  public ticket: string;
  public server: any;
  public accountCreation: number;
  public accountId: number;
  public communityId: number;
  public hasRights: boolean;
  public login: number;
  public nickname: string;
  public secretQuestion: string;
  public subscriptionEndDate: number;
  public wasAlreadyConnected: boolean;

  private connectionFrame: ConnectionFrame;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.dispatcher = new Dispatcher();
    this.haapi = new HaapiConnection();
    this.character = new Character(this);
    this.client = new DofusTouchClient(this);

    this.frames();
  }

  public connect() {
    this.haapi.processHaapi(this.username, this.password)
    .then(() => {
      console.log("Haapi : ", this.haapi);
      this.client.connect(this.haapi.config.sessionId, this.haapi.config.dataUrl);
    });
  }

  public disconnect() {
    this.client.close();
  }

  private frames() {
    this.connectionFrame = new ConnectionFrame(this);
  }
}
