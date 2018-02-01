import ShowCellMessage from "./ShowCellMessage";

export default class ShowCellSpectatorMessage extends ShowCellMessage {
  public playerName: string;

  constructor(sourceId = 0, cellId = 0, playerName = "") {
    super(sourceId, cellId);
    this.playerName = playerName;

  }
}
