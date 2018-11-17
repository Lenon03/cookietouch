import AveragePricesFrame from "@/frames/common/AveragePricesFrame";
import GoultinesFrame from "@/frames/common/GoultinesFrame";
import QueueFrame from "@/frames/common/QueueFrame";
import SecurityFrame from "@/frames/common/SecurityFrame";
import CharacterSelectionFrame from "@/frames/connection/CharacterSelectionFrame";
import IdentificationFrame from "@/frames/connection/IdentificationFrame";
import ServerSelectionFrame from "@/frames/connection/ServerSelectionFrame";
import AchievementsFrame from "@/frames/game/AchievementsFrames";
import BidFrame from "@/frames/game/BidFrame";
import CharacterFrame from "@/frames/game/CharacterFrame";
import ChatFrame from "@/frames/game/ChatFrame";
import CraftFrame from "@/frames/game/CraftFrame";
import ExchangeFrame from "@/frames/game/ExchangeFrame";
import FightFrame from "@/frames/game/FightFrame";
import InventoryFrame from "@/frames/game/InventoryFrame";
import MapFrame from "@/frames/game/MapFrame";
import MountFrame from "@/frames/game/MountFrame";
import NpcsFrame from "@/frames/game/NpcsFrame";
import QuestsFrame from "@/frames/game/QuestsFrame";
import StorageFrame from "@/frames/game/StorageFrame";
import Dispatcher from "@/utils/Dispatcher";

export interface IFrame {
  register: () => void;
}

export default class Frames {
  public static dispatcher: Dispatcher = new Dispatcher();

  private static frames: IFrame[] = [
    new ChatFrame(),
    new CraftFrame(),
    new QueueFrame(),
    new SecurityFrame(),
    new CharacterSelectionFrame(),
    new IdentificationFrame(),
    new ServerSelectionFrame(),
    new MapFrame(),
    new CharacterFrame(),
    new InventoryFrame(),
    new AchievementsFrame(),
    new BidFrame(),
    new ExchangeFrame(),
    new NpcsFrame(),
    new QuestsFrame(),
    new StorageFrame(),
    new FightFrame(),
    new AveragePricesFrame(),
    new GoultinesFrame(),
    new MountFrame()
  ];

  public static Init() {
    for (const f of this.frames) {
      f.register();
    }
  }
}
