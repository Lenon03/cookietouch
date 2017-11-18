import Account from "@account";
import DataManager from "@protocol/data";
import Jobs from "@protocol/data/classes/Jobs";
import LiteEvent from "@utils/LiteEvent";
import { sleep } from "@utils/Time";
import JobEntry from "./JobEntry";

export default class Job {
  public jobs: JobEntry[];

  private account: Account;
  private _jobsInitialized: boolean;

  public get JobsUpdated() { return this.onJobsUpdated.expose(); }
  private readonly onJobsUpdated = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.jobs = new Array<JobEntry>();
  }

  public hasCollectSkills(id: number) {
    return this.jobs.find((j) => j.collectSkills.find((s) => s.interactiveId === id) !== undefined) !== undefined;
  }

  get collectSkillsIds() {
    const tmp = this.jobs.map((j) => j.collectSkills.map((s) => s.interactiveId));
    return tmp.reduce((a, b) => a.concat(b));
  }

  public async UpdateJobDescriptionMessage(message: any) {
    this._jobsInitialized = false;
    this.jobs = new Array<JobEntry>();

    const jobsData = await DataManager.get(Jobs, ...message.jobsDescription.map((f: any) => f.jobId));

    for (const job of message.jobsDescription) {
      const jobEntry = new JobEntry(job, jobsData.find((f) => f.id === job.jobId).object);
      this.jobs.push(jobEntry);
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
      this.jobs.find((j) => j.id === exp.jobId).UpdateJobExperience(exp);
    }

    this.onJobsUpdated.trigger();
  }

  public async UpdateJobExperienceUpdateMessage(message: any) {
    this.jobs.find((j) => j.id === message.experiencesUpdate.jobId).UpdateJobExperience(message.experiencesUpdate);
    this.onJobsUpdated.trigger();
  }
}
