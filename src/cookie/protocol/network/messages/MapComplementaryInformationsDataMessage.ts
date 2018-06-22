import Message from "@/protocol/network/messages/Message";
import FightCommonInformations from "@/protocol/network/types/FightCommonInformations";
import GameRolePlayActorInformations from "@/protocol/network/types/GameRolePlayActorInformations";
import HouseInformations from "@/protocol/network/types/HouseInformations";
import InteractiveElement from "@/protocol/network/types/InteractiveElement";
import MapObstacle from "@/protocol/network/types/MapObstacle";
import StatedElement from "@/protocol/network/types/StatedElement";

export default class MapComplementaryInformationsDataMessage extends Message {
  public houses: HouseInformations[];
  public actors: GameRolePlayActorInformations[];
  public interactiveElements: InteractiveElement[];
  public statedElements: StatedElement[];
  public obstacles: MapObstacle[];
  public fights: FightCommonInformations[];
  public subAreaId: number;
  public mapId: number;

  constructor(subAreaId = 0, mapId = 0, houses: HouseInformations[],
              actors: GameRolePlayActorInformations[], interactiveElements: InteractiveElement[],
              statedElements: StatedElement[], obstacles: MapObstacle[], fights: FightCommonInformations[]) {
    super();
    this.houses = houses;
    this.actors = actors;
    this.interactiveElements = interactiveElements;
    this.statedElements = statedElements;
    this.obstacles = obstacles;
    this.fights = fights;
    this.subAreaId = subAreaId;
    this.mapId = mapId;

  }
}
