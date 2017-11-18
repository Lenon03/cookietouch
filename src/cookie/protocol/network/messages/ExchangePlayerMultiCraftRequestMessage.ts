import ExchangeRequestMessage from "./ExchangeRequestMessage";
export default class ExchangePlayerMultiCraftRequestMessage extends ExchangeRequestMessage {
public target: number;
public skillId: number;
constructor(exchangeType = 0, target = 0, skillId = 0) {
super(exchangeType );
this.target = target;
this.skillId = skillId;

}
}
