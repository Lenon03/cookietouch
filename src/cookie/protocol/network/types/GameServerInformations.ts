import Type from "@/protocol/network/types/Type";

export default class GameServerInformations extends Type {
  public id: number;
  public status: number;
  public completion: number;
  public isSelectable: boolean;
  public charactersCount: number;
  public date: number;
  public _name: string;

  constructor(id = 0, status = 1, completion = 0, isSelectable = false, charactersCount = 0, date = 0, name = "") {
    super();
    this.id = id;
    this.status = status;
    this.completion = completion;
    this.isSelectable = isSelectable;
    this.charactersCount = charactersCount;
    this.date = date;
    this._name = name;
  }
}
