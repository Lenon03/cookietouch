export default class GameServerInformations {
  public id: number;
  public status: number;
  public completion: number;
  public isSelectable: boolean;
  public charactersCount: number;
  public date: number;
  public name: string;
  constructor(id = 0, status = 1, completion = 0, isSelectable = false, charactersCount = 0, date = 0, name = "") {
    this.id = id;
    this.status = status;
    this.completion = completion;
    this.isSelectable = isSelectable;
    this.charactersCount = charactersCount;
    this.date = date;
    this.name = name;

  }
}
