import Message from "./Message";
export default class UpdateLifePointsMessage extends Message {
public lifePoints: number;
public maxLifePoints: number;
constructor(lifePoints = 0, maxLifePoints = 0) {
super();
this.lifePoints = lifePoints;
this.maxLifePoints = maxLifePoints;

}
}
