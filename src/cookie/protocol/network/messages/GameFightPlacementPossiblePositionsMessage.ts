import Message from "./Message";
export default class GameFightPlacementPossiblePositionsMessage extends Message {
  public positionsForChallengers: number[];
  public positionsForDefenders: number[];
  public teamNumber: number;
  constructor(teamNumber = 2, positionsForChallengers: number[], positionsForDefenders: number[]) {
    super();
    this.positionsForChallengers = positionsForChallengers;
    this.positionsForDefenders = positionsForDefenders;
    this.teamNumber = teamNumber;

  }
}
