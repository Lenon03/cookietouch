import EntityLook from "./EntityLook";
import PartyCompanionBaseInformations from "./PartyCompanionBaseInformations";
import PlayerStatus from "./PlayerStatus";
import Type from "./Type";

export default class PartyGuestInformations extends Type {
  public companions: PartyCompanionBaseInformations[];
  public guestId: number;
  public hostId: number;
  public name: string;
  public guestLook: EntityLook;
  public breed: number;
  public sex: boolean;
  public status: PlayerStatus;

  constructor(guestId = 0, hostId = 0, name = "", guestLook: EntityLook = null,
              breed = 0, sex = false, status: PlayerStatus = null,
              companions: PartyCompanionBaseInformations[] = null) {
    super();
    this.companions = companions;
    this.guestId = guestId;
    this.hostId = hostId;
    this.name = name;
    this.guestLook = guestLook;
    this.breed = breed;
    this.sex = sex;
    this.status = status;
  }
}
