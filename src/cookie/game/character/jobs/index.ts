import Account from "@account";
import DataManager from "@protocol/data";
import Jobs from "@protocol/data/classes/Jobs";
import LiteEvent from "@utils/LiteEvent";
import { sleep } from "@utils/Time";
import { List } from "linqts";
import JobEntry from "./JobEntry";

export default class Job {
  public jobs: List<JobEntry>;

  private account: Account;
  private _jobsInitialized: boolean;

  public get JobsUpdated() { return this.onJobsUpdated.expose(); }
  private readonly onJobsUpdated = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.jobs = new List<JobEntry>();
  }

  public hasCollectSkills(id: number) {
    return this.jobs.FirstOrDefault((j) => j.collectSkills.FirstOrDefault((s) => s.interactiveId === id) !== undefined) !== undefined;
  }

  get collectSkillsIds() {
    return this.jobs.SelectMany((j) => j.collectSkills.Select((s) => s.interactiveId));
  }

  public async UpdateJobDescriptionMessage(message: any) {
    this._jobsInitialized = false;
    this.jobs = new List<JobEntry>();

    const jobsData = await DataManager.get(Jobs, ...message.jobsDescription.map((f: any) => f.jobId));

    for (const job of message.jobsDescription) {
      const jobEntry = new JobEntry(job, jobsData.find((f) => f.id === job.jobId).object);
      this.jobs.Add(jobEntry);
    }

    this._jobsInitialized = true;

    this.onJobsUpdated.trigger();
  }

  public async UpdateJobExperienceMultiUpdateMessage(message: any) {
    // Ugly fix
    while (!this._jobsInitialized) {
      await sleep(50);
    }

    for (const exp of message.experiencesUpdate) {
      this.jobs.FirstOrDefault((j) => j.id === exp.jobId).UpdateJobExperience(exp);
    }

    this.onJobsUpdated.trigger();
  }

  public async UpdateJobExperienceUpdateMessage(message: any) {
    this.jobs.FirstOrDefault((j) => j.id === message.experiencesUpdate.jobId).UpdateJobExperience(message.experiencesUpdate);
    this.onJobsUpdated.trigger();
  }
}
