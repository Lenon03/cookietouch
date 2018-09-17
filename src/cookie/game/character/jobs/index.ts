import Account from "@/account";
import JobEntry from "@/game/character/jobs/JobEntry";
import DataManager from "@/protocol/data";
import Jobs from "@/protocol/data/classes/Jobs";
import { DataTypes } from "@/protocol/data/DataTypes";
import JobExperienceMultiUpdateMessage from "@/protocol/network/messages/JobExperienceMultiUpdateMessage";
import JobExperienceUpdateMessage from "@/protocol/network/messages/JobExperienceUpdateMessage";
import JobLevelUpMessage from "@/protocol/network/messages/JobLevelUpMessage";
import LiteEvent from "@/utils/LiteEvent";
import Pushbullet from "@/utils/Pushbullet";
import { NotificationType } from "@/utils/Pushbullet/types";
import { sleep } from "@/utils/Time";
import { List } from "linqts";

export default class Job {
  public jobs: List<JobEntry>;
  private account: Account;
  private _jobsInitialized: boolean;
  private readonly onJobsUpdated = new LiteEvent<void>();

  constructor(account: Account) {
    this.jobs = new List<JobEntry>();
    this.account = account;
  }

  public get JobsUpdated() {
    return this.onJobsUpdated.expose();
  }

  get collectSkillsIds() {
    return this.jobs.SelectMany(j =>
      j.collectSkills.Select(s => s.interactiveId)
    );
  }

  public hasCollectSkills(id: number) {
    return (
      this.jobs.FirstOrDefault(
        j =>
          j.collectSkills.FirstOrDefault(s => s.interactiveId === id) !==
          undefined
      ) !== undefined
    );
  }

  public async UpdateJobDescriptionMessage(message: any) {
    this._jobsInitialized = false;
    this.jobs = new List<JobEntry>();

    const jobsData = await DataManager.get<Jobs>(
      DataTypes.Jobs,
      ...message.jobsDescription.map(f => f.jobId)
    );

    for (const job of message.jobsDescription) {
      const jobEntry = await JobEntry.setup(
        job,
        jobsData.find(f => f.id === job.jobId).object
      );
      this.jobs.Add(jobEntry);
    }

    this._jobsInitialized = true;

    this.onJobsUpdated.trigger();
  }

  public async UpdateJobExperienceMultiUpdateMessage(
    message: JobExperienceMultiUpdateMessage
  ) {
    // Ugly fix
    while (!this._jobsInitialized) {
      await sleep(50);
    }

    for (const exp of message.experiencesUpdate) {
      this.jobs
        .FirstOrDefault(j => j.id === exp.jobId)
        .UpdateJobExperience(exp);
    }

    this.onJobsUpdated.trigger();
  }

  public async UpdateJobExperienceUpdateMessage(
    message: JobExperienceUpdateMessage
  ) {
    this.jobs
      .FirstOrDefault(j => j.id === message.experiencesUpdate.jobId)
      .UpdateJobExperience(message.experiencesUpdate);
    this.onJobsUpdated.trigger();
  }

  public async UpdateJobLevelUpMessage(message: JobLevelUpMessage) {
    const job = this.jobs.FirstOrDefault(
      j => j.id === message.jobsDescription.jobId
    );
    const jobsData = await DataManager.get<Jobs>(
      DataTypes.Jobs,
      message.jobsDescription.jobId
    );
    if (job) {
      this.jobs.Remove(job);
    }
    const newJob = await JobEntry.setup(
      message.jobsDescription,
      jobsData[0].object
    );
    Pushbullet.sendNotification(NotificationType.LEVEL_JOB, this.account, {
      jobName: newJob.name,
      levelJob: newJob.level
    });
    this.jobs.Add(newJob);
  }
}
