import Message from "@/protocol/network/messages/Message";
import StartupActionAddObject from "@/protocol/network/types/StartupActionAddObject";

export default class StartupActionsListMessage extends Message {
  public actions: StartupActionAddObject[];

  constructor(actions: StartupActionAddObject[]) {
    super();
    this.actions = actions;

  }
}
