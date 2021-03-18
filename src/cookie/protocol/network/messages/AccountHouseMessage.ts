import Message from "@/protocol/network/messages/Message";
import AccountHouseInformations from "@/protocol/network/types/AccountHouseInformations";

export default class AccountHouseMessage extends Message {
  public houses: AccountHouseInformations[];

  constructor(houses: AccountHouseInformations[]) {
    super();
    this.houses = houses;

  }
}
