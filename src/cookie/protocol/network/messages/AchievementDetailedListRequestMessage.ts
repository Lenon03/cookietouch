import Message from "./Message";

export default class AchievementDetailedListRequestMessage extends Message {
  public categoryId: number;

  constructor(categoryId = 0) {
    super();
    this.categoryId = categoryId;
  }
}
