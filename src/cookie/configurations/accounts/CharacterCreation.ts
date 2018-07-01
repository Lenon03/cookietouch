export interface ICharacterCreation {
  create: boolean;
  name: string;
  server: number;
  breed: number;
  sex: number;
  head: number;
  colors: number[];
  completeTutorial: boolean;
}

export default class CharacterCreation implements ICharacterCreation {
  public create: boolean = false;
  public name: string = "";
  public server: number = -1;
  public breed: number = -1;
  public sex: number = -1;
  public head: number = -1;
  public colors: number[] = [];
  public completeTutorial: boolean = true;

  public toJSON(): ICharacterCreation {
    return Object.assign({}, this, {});
  }

  public static fromJSON(json: ICharacterCreation | string): CharacterCreation {
    if (typeof json === "string") {
      return JSON.parse(json, CharacterCreation.reviver);
    } else {
      const characterCreation = Object.create(CharacterCreation.prototype);
      return { ...characterCreation, ...json };
    }
  }

  public static reviver(key: string, value: string): any {
    return key === "" ? CharacterCreation.fromJSON(value) : value;
  }
}
