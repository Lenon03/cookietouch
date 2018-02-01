import ChatServerMessage from "./ChatServerMessage";

export default class ChatAdminServerMessage extends ChatServerMessage {
  constructor(channel = 0, content = "", timestamp = 0, fingerprint = "",
              senderId = 0, senderName = "", senderAccountId = 0) {
    super(channel, content, timestamp, fingerprint, senderId, senderName, senderAccountId);

  }
}
