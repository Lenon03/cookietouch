import CharacterBaseInformations from "./CharacterBaseInformations";
import EntityLook from "./EntityLook";

export default class CharacterHardcoreInformations extends CharacterBaseInformations {

  public deathstate: number;
  public deathcount: number;
  public deathmaxlevel: number;

  constructor(id = 0, level = 0, name = "", entitylook: EntityLook, breed = 0,
              sex = false, deathstate = 0, deathcount = 0, deathmaxlevel = 0) {
    super(id, level, name, entitylook, breed, sex);
    this.deathstate = deathstate;
    this.deathcount = deathcount;
    this.deathmaxlevel = deathmaxlevel;
  }
}
