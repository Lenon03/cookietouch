import Account from "@account";

export enum ScriptActionResults {
  DONE,
  PROCESSING,
  FAILED,
}

export default abstract class ScriptAction {
  protected static doneResult(): Promise<ScriptActionResults> {
    return new Promise((resolve, reject) => {
      return resolve(ScriptActionResults.DONE);
    });
  }
  protected static processingResult(): Promise<ScriptActionResults> {
    return new Promise((resolve, reject) => {
      return resolve(ScriptActionResults.PROCESSING);
    });
  }
  protected static failedResult(): Promise<ScriptActionResults> {
    return new Promise((resolve, reject) => {
      return resolve(ScriptActionResults.FAILED);
    });
  }

  protected abstract process(account: Account): Promise<ScriptActionResults>;
}
