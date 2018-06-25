import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import { Mutex } from "@/utils/Semaphore";
import { isEmpty } from "@/utils/String";
import { AntiCaptcha } from "anticaptcha";

const mutex = new Mutex();

export default class RecaptchaHandler {
  public static async getResponse(sitekey: string): Promise<string> {
    const release = await mutex.acquire();
    if (!isEmpty(GlobalConfiguration.anticaptchaKey)) {
      try {
        const ac = new AntiCaptcha(GlobalConfiguration.anticaptchaKey);
        if (await !ac.isBalanceGreaterThan(0)) {
          release();
          return "no-balance";
        } else {
          const taskId = await ac.createTask(
            "https://proxyconnection.touch.dofus.com/recaptcha",
            sitekey
          );

          const response = await ac.getTaskResult(taskId);
          release();
          return response.solution.gRecaptchaResponse;
        }
      } catch (error) {
        throw error;
      }
    }
    release();
    return "no-key";
  }
}
