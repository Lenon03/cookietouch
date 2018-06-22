import FightCommonInformations from "@/protocol/network/types/FightCommonInformations";
import GameRolePlayActorInformations from "@/protocol/network/types/GameRolePlayActorInformations";
import HouseInformations from "@/protocol/network/types/HouseInformations";
import HouseInformationsInside from "@/protocol/network/types/HouseInformationsInside";
import InteractiveElement from "@/protocol/network/types/InteractiveElement";
import MapObstacle from "@/protocol/network/types/MapObstacle";
import StatedElement from "@/protocol/network/types/StatedElement";
import MapComplementaryInformationsDataMessage from "@/protocol/network/messages/MapComplementaryInformationsDataMessage";

export default class MapComplementaryInformationsDataInHouseMessage extends MapComplementaryInformationsDataMessage {
  public currentHouse: HouseInformationsInside;

  constructor(subAreaId = 0, mapId = 0, currentHouse: HouseInformationsInside,
              houses: HouseInformations[], actors: GameRolePlayActorInformations[],
              interactiveElements: InteractiveElement[], statedElements: StatedElement[],
              obstacles: MapObstacle[], fights: FightCommonInformations[]) {
    super(subAreaId, mapId, houses, actors, interactiveElements, statedElements, obstacles, fights);
    this.currentHouse = currentHouse;

  }
}
