import AbstractContactInformations from "./AbstractContactInformations";

export default class IgnoredInformations extends AbstractContactInformations {
  constructor(accountId = 0, accountName = "") {
    super(accountId, accountName);
  }
}
