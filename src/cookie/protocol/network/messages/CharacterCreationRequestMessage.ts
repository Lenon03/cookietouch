import Message from "./Message";
export default class CharacterCreationRequestMessage extends Message {
public colors: number[];
public name: string;
public breed: number;
public sex: boolean;
public cosmeticId: number;
constructor(name = "", breed = 0, sex = false, cosmeticId = 0, colors: number[]) {
super();
this.colors = colors;
this.name = name;
this.breed = breed;
this.sex = sex;
this.cosmeticId = cosmeticId;

}
}
