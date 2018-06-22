import CollectSkillEntry from "@/game/character/jobs/skills/CollectSkillEntry";
import DataManager from "@/protocol/data";
import Jobs from "@/protocol/data/classes/Jobs";
import Skills from "@/protocol/data/classes/Skills";
import { DataTypes } from "@/protocol/data/DataTypes";
import DTConstants from "@/protocol/DTConstants";
import JobDescription from "@/protocol/network/types/JobDescription";
import JobExperience from "@/protocol/network/types/JobExperience";
import SkillActionDescriptionCollect from "@/protocol/network/types/SkillActionDescriptionCollect";
import { List } from "linqts";

export default class JobEntry {
  public id: number;
  public level: number;
  public name: string;
  public iconId: number;
  public experience: number;
  public experienceLevelFloor: number;
  public experienceNextLevelFloor: number;
  public collectSkills: List<CollectSkillEntry>;

  constructor(job: JobDescription, jobData: Jobs) {
    this.id = job.jobId;
    this.name = jobData.nameId;
    this.iconId = jobData.iconId;
    this.collectSkills = new List<CollectSkillEntry>();

    if (job.skills.length > 0) {
      const skillId = job.skills.map(s => s.skillId);
      DataManager.get<Skills>(DataTypes.Skills, ...skillId).then(resp => {
        const skillsResp = resp;

        for (const skill of job.skills) {
          if (skill._type === "SkillActionDescriptionCollect") {
            const c = new CollectSkillEntry(
              skill as SkillActionDescriptionCollect,
              skillsResp.find(s => s.id === skill.skillId).object
            );
            this.collectSkills.Add(c);
          }
        }
      });
    }
  }

  get experiencePercent() {
    return this.experience === 0
      ? 0
      : this.experienceNextLevelFloor === 0
        ? 100
        : ((this.experience - this.experienceLevelFloor) /
            (this.experienceNextLevelFloor - this.experienceLevelFloor)) *
          100;
  }

  get iconUrl() {
    return `${DTConstants.config.assetsUrl}/gfx/jobs/${this.iconId}.png`;
  }

  public async UpdateJobExperience(jobExp: JobExperience) {
    this.level = jobExp.jobLevel;
    this.experience = jobExp.jobXP;
    this.experienceLevelFloor = jobExp.jobXpLevelFloor;
    this.experienceNextLevelFloor = jobExp.jobXpNextLevelFloor;
  }
}
