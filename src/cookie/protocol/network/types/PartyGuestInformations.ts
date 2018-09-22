import EntityLook from "@/protocol/network/types/EntityLook";
import PartyCompanionBaseInformations from "@/protocol/network/types/PartyCompanionBaseInformations";
import PlayerStatus from "@/protocol/network/types/PlayerStatus";
import Type from "@/protocol/network/types/Type";

export default class PartyGuestInformations extends Type {
  public companions: PartyCompanionBaseInformations[];
  public guestId: number;
  public hostId: number;
  public name: string;
  public guestLook: EntityLook;
  public breed: number;
  public sex: boolean;
  public status: PlayerStatus;

  constructor(
    guestId = 0,
    hostId = 0,
    name = "",
    guestLook = new EntityLook(),
    breed = 0,
    sex = false,
    status = new PlayerStatus(),
    companions: PartyCompanionBaseInformations[] = []
  ) {
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
