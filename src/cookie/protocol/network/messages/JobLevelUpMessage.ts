import JobDescription from "@protocol/network/types/JobDescription";
import Message from "./Message";
export default class JobLevelUpMessage extends Message {
public newLevel: number;
public jobsDescription: JobDescription;
constructor(newLevel = 0, jobsDescription: JobDescription) {
super();
this.newLevel = newLevel;
this.jobsDescription = jobsDescription;

}
}
