import Data from "@/protocol/data/Data";

export default class ChatChannels extends Data {
  public nameId: string = "";
  public descriptionId: string = "";
  public shortcut: string = "";
  public shortcutKey: string = "";
  public isPrivate: boolean = false;
  public allowObjects: boolean = false;
}
