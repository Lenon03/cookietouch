import { Languages } from "@/configurations/language/Languages";

export default class GlobalConfiguration {
  public static anticaptchaKey: string;
  public static lang: Languages = Languages.ENGLISH;

  public load() {
    //
  }

  public save() {
    //
  }
}
