import AdminCommandMessage from "@/protocol/network/messages/AdminCommandMessage";

export default class AdminQuietCommandMessage extends AdminCommandMessage {
  constructor(content = "") {
    super();

  }
}
