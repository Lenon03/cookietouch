import Message from "./Message";
export default class ExchangeStartOkJobIndexMessage extends Message {
public jobs: number[];
constructor(jobs: number[]) {
super();
this.jobs = jobs;

}
}
