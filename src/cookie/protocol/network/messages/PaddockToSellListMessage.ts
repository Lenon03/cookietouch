import Message from "@/protocol/network/messages/Message";
import PaddockInformationsForSell from "@/protocol/network/types/PaddockInformationsForSell";

export default class PaddockToSellListMessage extends Message {
  public paddockList: PaddockInformationsForSell[];
  public pageIndex: number;
  public totalPage: number;

  constructor(pageIndex = 0, totalPage = 0, paddockList: PaddockInformationsForSell[]) {
    super();
    this.paddockList = paddockList;
    this.pageIndex = pageIndex;
    this.totalPage = totalPage;

  }
}
