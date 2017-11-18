import JobExperience from "@protocol/network/types/JobExperience";
import Message from "./Message";
export default class JobExperienceMultiUpdateMessage extends Message {
public experiencesUpdate: JobExperience[];
constructor(experiencesUpdate: JobExperience[]) {
super();
this.experiencesUpdate = experiencesUpdate;

}
}
