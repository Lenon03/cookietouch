import AbstractPartyMessage from "@/protocol/network/messages/AbstractPartyMessage";
import MapCoordinatesExtended from "@/protocol/network/types/MapCoordinatesExtended";

export default class PartyMemberInFightMessage extends AbstractPartyMessage {
  public reason: number;
  public memberId: number;
  public memberAccountId: number;
  public memberName: string;
  public fightId: number;
  public fightMap: MapCoordinatesExtended;
  public secondsBeforeFightStart: number;

  constructor(partyId = 0, reason = 0, memberId = 0, memberAccountId = 0, memberName = "",
              fightId = 0, fightMap: MapCoordinatesExtended, secondsBeforeFightStart = 0) {
    super(partyId);
    this.reason = reason;
    this.memberId = memberId;
    this.memberAccountId = memberAccountId;
    this.memberName = memberName;
    this.fightId = fightId;
    this.fightMap = fightMap;
    this.secondsBeforeFightStart = secondsBeforeFightStart;

  }
}
