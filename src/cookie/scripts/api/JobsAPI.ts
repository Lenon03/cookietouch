import Account from "@account";

export default class JobsAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public hasJob(jobId: number): boolean {
    return this.account.game.character.jobs.jobs.FirstOrDefault((j) => j.id === jobId) !== undefined;
  }

  public name(jobId: number): string {
    const job = this.account.game.character.jobs.jobs.FirstOrDefault((j) => j.id === jobId);
    return job ? job.name : "";
  }

  public level(jobId: number): number {
    const job = this.account.game.character.jobs.jobs.FirstOrDefault((j) => j.id === jobId);
    return job ? job.level : 0;
  }

  public getCollectSkills(jobId: number): number[] {
    const job = this.account.game.character.jobs.jobs.FirstOrDefault((j) => j.id === jobId);
    return job ? job.collectSkills.Select((f) => f.interactiveId).ToArray() : [];
  }

  public getAllCollectSkills() {
    return this.account.game.character.jobs.collectSkillsIds.ToArray();
  }
}
