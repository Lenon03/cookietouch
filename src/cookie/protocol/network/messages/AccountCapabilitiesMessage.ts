import Message from "./Message";

export default class AccountCapabilitiesMessage extends Message {
  public accountId: number;
  public tutorialAvailable: boolean;
  public breedsVisible: number;
  public breedsAvailable: number;
  public status: number;

  constructor(accountId = 0, tutorialAvailable = false, breedsVisible = 0, breedsAvailable = 0, status = -1) {
    super();
    this.accountId = accountId;
    this.tutorialAvailable = tutorialAvailable;
    this.breedsVisible = breedsVisible;
    this.breedsAvailable = breedsAvailable;
    this.status = status;

  }
}
