import Message from "@/protocol/network/messages/Message";
import HouseInformationsForSell from "@/protocol/network/types/HouseInformationsForSell";

export default class HouseToSellListMessage extends Message {
  public houseList: HouseInformationsForSell[];
  public pageIndex: number;
  public totalPage: number;

  constructor(pageIndex = 0, totalPage = 0, houseList: HouseInformationsForSell[]) {
    super();
    this.houseList = houseList;
    this.pageIndex = pageIndex;
    this.totalPage = totalPage;

  }
}
