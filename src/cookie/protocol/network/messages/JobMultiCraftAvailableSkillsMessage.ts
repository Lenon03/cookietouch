import JobAllowMultiCraftRequestMessage from "./JobAllowMultiCraftRequestMessage";
export default class JobMultiCraftAvailableSkillsMessage extends JobAllowMultiCraftRequestMessage {
public skills: number[];
public playerId: number;
constructor(enabled = false, playerId = 0, skills: number[]) {
super(enabled );
this.skills = skills;
this.playerId = playerId;

}
}
