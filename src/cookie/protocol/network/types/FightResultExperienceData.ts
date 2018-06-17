import Type from "./Type";

export default class FightResultExperienceData extends Type {

  public experience: number;
  public showexperience: boolean;
  public experiencelevelfloor: number;
  public showexperiencelevelfloor: boolean;
  public experiencenextlevelfloor: number;
  public showexperiencenextlevelfloor: boolean;
  public experiencefightdelta: number;
  public showexperiencefightdelta: boolean;
  public experienceforguild: number;
  public showexperienceforguild: boolean;
  public experienceformount: number;
  public showexperienceformount: boolean;
  public isincarnationexperience: boolean;
  public rerollexperiencemul: number;

  constructor(experience = 0, showexperience = false, experiencelevelfloor = 0,
              showexperiencelevelfloor = false, experiencenextlevelfloor = 0,
              showexperiencenextlevelfloor = false, experiencefightdelta = 0,
              showexperiencefightdelta = false, experienceforguild = 0, showexperienceforguild = false,
              experienceformount = 0, showexperienceformount = false, isincarnationexperience = false,
              rerollexperiencemul = 0) {
    super();
    this.experience = experience;
    this.showexperience = showexperience;
    this.experiencelevelfloor = experiencelevelfloor;
    this.showexperiencelevelfloor = showexperiencelevelfloor;
    this.experiencenextlevelfloor = experiencenextlevelfloor;
    this.showexperiencenextlevelfloor = showexperiencenextlevelfloor;
    this.experiencefightdelta = experiencefightdelta;
    this.showexperiencefightdelta = showexperiencefightdelta;
    this.experienceforguild = experienceforguild;
    this.showexperienceforguild = showexperienceforguild;
    this.experienceformount = experienceformount;
    this.showexperienceformount = showexperienceformount;
    this.isincarnationexperience = isincarnationexperience;
    this.rerollexperiencemul = rerollexperiencemul;
  }
}
