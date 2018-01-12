import Account from "@account";

export enum ScriptActionResults {
  DONE,
  PROCESSING,
  FAILED,
}

export default abstract class ScriptAction {
  protected static async doneResult(): Promise<ScriptActionResults> {
    return ScriptActionResults.DONE;
  }
  protected static async processingResult(): Promise<ScriptActionResults> {
    return ScriptActionResults.PROCESSING;
  }
  protected static async failedResult(): Promise<ScriptActionResults> {
    return ScriptActionResults.FAILED;
  }

  public get name(): string {
    return this.constructor.toString().match(/\w+/g)[1];
  }

  public abstract async process(account: Account): Promise<ScriptActionResults>;
}
