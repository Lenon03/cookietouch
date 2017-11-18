import ExchangeObjectMovePricedMessage from "./ExchangeObjectMovePricedMessage";
export default class ExchangeObjectModifyPricedMessage extends ExchangeObjectMovePricedMessage {
constructor(objectUID = 0, quantity = 0, price = 0) {
super(objectUID, quantity, price );

}
}
