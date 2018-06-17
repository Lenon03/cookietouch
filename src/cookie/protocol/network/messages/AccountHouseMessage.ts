import AccountHouseInformations from "@protocol/network/types/AccountHouseInformations";
import Message from "./Message";

export default class AccountHouseMessage extends Message {
  public houses: AccountHouseInformations[];

  constructor(houses: AccountHouseInformations[]) {
    super();
    this.houses = houses;

  }
}
