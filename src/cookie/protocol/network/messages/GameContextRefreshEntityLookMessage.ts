import EntityLook from "@protocol/network/types/EntityLook";
import Message from "./Message";
export default class GameContextRefreshEntityLookMessage extends Message {
public id: number;
public look: EntityLook;
constructor(id = 0, look: EntityLook) {
super();
this.id = id;
this.look = look;

}
}
