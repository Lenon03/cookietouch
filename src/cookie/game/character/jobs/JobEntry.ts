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
  public id: number = 0;
  public level: number = 0;
  public name: string = "";
  public iconId: number = 0;
  public experience: number = 0;
  public experienceLevelFloor: number = 0;
  public experienceNextLevelFloor: number = 0;
  public collectSkills: List<CollectSkillEntry> = new List();

  public static async setup(
    job: JobDescription,
    jobData: Jobs
  ): Promise<JobEntry> {
    const jobEntry = new JobEntry();
    jobEntry.id = job.jobId;
    jobEntry.name = jobData.nameId;
    jobEntry.iconId = jobData.iconId;
    jobEntry.collectSkills = new List<CollectSkillEntry>();

    if (job.skills.length > 0) {
      const skillId = job.skills.map(s => s.skillId);
      const skillsResp = await DataManager.get<Skills>(
        DataTypes.Skills,
        ...skillId
      );

      for (const skill of job.skills) {
        if (skill._type === "SkillActionDescriptionCollect") {
          const item = skillsResp.find(s => s.id === skill.skillId);
          const object = item && item.object;
          if (!object) {
            continue;
          }
          const c = new CollectSkillEntry(
            skill as SkillActionDescriptionCollect,
            object
          );
          jobEntry.collectSkills.Add(c);
        }
      }
    }
    return jobEntry;
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
