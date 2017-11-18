import Message from "./Message";
export default class ObjectAveragePricesMessage extends Message {
public ids: number[];
public avgPrices: number[];
constructor(ids: number[], avgPrices: number[]) {
super();
this.ids = ids;
this.avgPrices = avgPrices;

}
}
