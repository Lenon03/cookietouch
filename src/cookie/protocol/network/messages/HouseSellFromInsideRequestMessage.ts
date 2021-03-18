import HouseSellRequestMessage from "@/protocol/network/messages/HouseSellRequestMessage";

export default class HouseSellFromInsideRequestMessage extends HouseSellRequestMessage {
  constructor(amount = 0) {
    super(amount);

  }
}
