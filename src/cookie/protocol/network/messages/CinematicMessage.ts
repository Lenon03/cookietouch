import Message from "./Message";
export default class CinematicMessage extends Message {
public cinematicId: number;
constructor(cinematicId = 0) {
super();
this.cinematicId = cinematicId;

}
}
