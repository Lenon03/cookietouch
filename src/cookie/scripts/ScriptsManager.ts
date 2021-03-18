import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import LanguageManager from "@/configurations/language/LanguageManager";
import { BoostableStats } from "@/game/character/BoostableStats";
import { PlayerLifeStatusEnum } from "@/protocol/enums/PlayerLifeStatusEnum";
import FightAction from "@/scripts/actions/fight/FightAction";
import GatherAction from "@/scripts/actions/gather/GatherAction";
import DelayAction from "@/scripts/actions/global/DelayAction";
import LeaveDialogAction from "@/scripts/actions/global/LeaveDialogAction";
import ChangeMapAction from "@/scripts/actions/map/ChangeMapAction";
import UseAction from "@/scripts/actions/map/UseAction";
import WaitMapChangeAction from "@/scripts/actions/map/WaitMapChangeAction";
import NpcBankAction from "@/scripts/actions/npcs/NpcBankAction";
import ScriptAction from "@/scripts/actions/ScriptAction";
import StorageGetAutoRegenStoreAction from "@/scripts/actions/storage/StorageGetAutoRegenStoreAction";
import StorageGetItemAction from "@/scripts/actions/storage/StorageGetItemAction";
import StorageGetKamasAction from "@/scripts/actions/storage/StorageGetKamasAction";
import StoragePutAllItemsAction from "@/scripts/actions/storage/StoragePutAllItemsAction";
import StoragePutItemAction from "@/scripts/actions/storage/StoragePutItemAction";
import StoragePutKamasAction from "@/scripts/actions/storage/StoragePutKamasAction";
import API from "@/scripts/api";
import ChangeMapFlag from "@/scripts/flags/ChangeMapFlag";
import CustomFlag from "@/scripts/flags/CustomFlag";
import DoorFlag from "@/scripts/flags/DoorFlag";
import FightFlag from "@/scripts/flags/FightFlag";
import GatherFlag from "@/scripts/flags/GatherFlag";
import { IFlag, IFlagType } from "@/scripts/flags/IFlag";
import NpcBankFlag from "@/scripts/flags/NpcBankFlag";
import PhenixFlag from "@/scripts/flags/PhenixFlag";
import { FunctionTypes } from "@/scripts/FunctionTypes";
import ActionsManager, {
  IActionsManagerEventData
} from "@/scripts/managers/ActionsManager";
import JsonScriptManager, { IMap } from "@/scripts/managers/JsonScriptManager";
import LiteEvent from "@/utils/LiteEvent";
import Pushbullet from "@/utils/Pushbullet";
import { NotificationType } from "@/utils/Pushbullet/types";
import { isEmpty } from "@/utils/String";
import { sleep } from "@/utils/Time";
import * as fs from "fs";
import { List } from "linqts";
import * as path from "path";

export default class ScriptsManager {
  public actionsManager: ActionsManager;
  public currentScriptName: string | undefined;
  public enabled: boolean = false;
  public paused: boolean = false;
  private api: API;
  private readonly onScriptLoaded = new LiteEvent<string>();
  private readonly onScriptStarted = new LiteEvent<any>();
  private readonly onScriptStopped = new LiteEvent<string>();
  private account: Account;
  private entryFlags: List<IFlag>;
  private entryFlagsIndex: number = 0;
  private _currentFunctionType: FunctionTypes = FunctionTypes.MOVE;
  private _scriptManager: JsonScriptManager;

  constructor(account: Account) {
    this.account = account;
    this._scriptManager = new JsonScriptManager();
    this.api = new API(account);
    this.actionsManager = new ActionsManager(account);
    this.entryFlags = new List<IFlag>();

    this.account.game.fight.FightJoined.on(this.onFightJoined);
    this.account.game.fight.FightEnded.on(this.onFightEnded);
    this.actionsManager.ActionsFinished.on(this.onActionsFinished);
    this.actionsManager.CustomHandled.on(this.onCustomHandled);
  }

  get running(): boolean {
    return this.account.isGroupChief === true
      ? this.enabled && !this.paused
      : this.account.group!.chief.scripts.running === true;
  }

  public get ScriptLoaded() {
    return this.onScriptLoaded.expose();
  }

  public get ScriptStarted() {
    return this.onScriptStarted.expose();
  }

  public get ScriptStopped() {
    return this.onScriptStopped.expose();
  }

  get currentFunctionType(): FunctionTypes {
    return this.account.isGroupChief
      ? this._currentFunctionType
      : this.account.group!.chief.scripts._currentFunctionType;
  }

  set currentFunctionType(type: FunctionTypes) {
    if (this.account.isGroupChief) {
      this._currentFunctionType = type;
    } else {
      this.account.group!.chief.scripts._currentFunctionType = type;
    }
  }

  get scriptManager(): JsonScriptManager {
    return this.account.isGroupChief
      ? this._scriptManager
      : this.account.group!.chief.scripts._scriptManager;
  }

  private get gotToMaxPods(): boolean {
    const maxPods = this.scriptManager.config.MAX_PODS
      ? this.scriptManager.config.MAX_PODS
      : 90;
    return this.account.game.character.inventory.weightPercent >= maxPods;
  }

  public fromFile(filePath: string) {
    if (this.enabled) {
      this.account.logger.logError(
        LanguageManager.trans("script"),
        LanguageManager.trans("cantStartMultipleScript")
      );
      return;
    }
    if (!fs.existsSync(filePath) || path.extname(filePath) !== ".js") {
      this.account.logger.logError(
        LanguageManager.trans("script"),
        LanguageManager.trans("scriptErrorFormat")
      );
      return;
    }
    this.scriptManager.loadFromFile(
      filePath,
      this.account.accountConfig.username,
      this.beforeDoFile
    );
    this.currentScriptName = path.basename(filePath, ".js");
    this.account.logger.logInfo(
      LanguageManager.trans("script"),
      LanguageManager.trans("scriptLoaded", path.basename(filePath, ".js"))
    );
    this.onScriptLoaded.trigger(this.currentScriptName);
  }

  public async applyCheckings() {
    // Check for death
    await this.checkForDeath();
    if (!this.running) {
      return;
    }
    // Only check for regeneration when we're alive and kicking
    if (
      this.account.game.character.lifeStatus ===
      PlayerLifeStatusEnum.STATUS_ALIVE_AND_KICKING
    ) {
      // Check for regeneration in the script
      await this.checkScriptRegeneration();
      if (!this.running) {
        return;
      }
      // Check for regeneration
      await this.checkRegeneration();
      if (!this.running) {
        return;
      }
    }

    // Check for bags
    await this.checkForBags();
    if (!this.running) {
      return;
    }
    // Check for auto boosting
    await this.checkAutoBoosting();
    if (!this.running) {
      return;
    }
    // Check if the character got to MAX_PODS
    await this.checkForMaxPods();
    if (!this.running) {
      return;
    }
    // Check for auto mount
    await this.checkForMount();
  }

  public async startScript() {
    if (!this.currentScriptName || isEmpty(this.currentScriptName)) {
      return;
    }
    if (this.enabled || this.account.isBusy) {
      return;
    }
    // If this account is a group chief, do some checkings
    if (this.account.hasGroup && this.account.isGroupChief) {
      if (this.account.group!.isAnyoneBusy) {
        this.account.logger.logError(
          LanguageManager.trans("script"),
          LanguageManager.trans("errorLaunchScriptBusy")
        );
        return;
      }
    }

    this.enabled = true;
    this.account.logger.logInfo(
      LanguageManager.trans("script"),
      LanguageManager.trans("scriptStarted")
    );
    this.onScriptStarted.trigger();
    this.currentFunctionType = FunctionTypes.MOVE;
    await this.processScript();
  }

  public stopScript(reason: string = "") {
    // In case the account is a member of a group, stop the chief's group.
    if (
      this.account.hasGroup &&
      !this.account.isGroupChief &&
      this.account.group!.chief.scripts.enabled
    ) {
      this.account.group!.chief.scripts.stopScript(reason);
      return;
    }
    if (!this.enabled) {
      return;
    }
    this.enabled = false;
    this.paused = false;
    this.entryFlags = new List<IFlag>();
    this.entryFlagsIndex = 0;

    this.account.game.managers.cancel();
    this.actionsManager.clearEverything();

    // If the account is a group chief, do the same for members
    if (this.account.hasGroup && this.account.isGroupChief) {
      this.account.group!.membersCleaningAndClearing();
    }

    if (reason === "") {
      this.account.logger.logInfo(
        LanguageManager.trans("script"),
        LanguageManager.trans("scriptStopped")
      );
    } else {
      Pushbullet.sendNotification(NotificationType.SCRIPT_ERROR, this.account, {
        error: reason
      });
      this.account.logger.logError(
        LanguageManager.trans("script"),
        LanguageManager.trans("scriptStoppedReason", reason)
      );
    }

    this.onScriptStopped.trigger(reason);
  }

  private async processScript() {
    if (!this.running) {
      return;
    }
    try {
      // If this account is a group chief, do some checkings
      if (this.account.hasGroup && this.account.isGroupChief) {
        await this.account.group!.regroupMembersIfNeeded();
        if (this.account.group!.isAnyoneBusy) {
          this.stopScript(LanguageManager.trans("someoneBusy"));
          return;
        }
      }

      // If this account is a group chief, apply a group checking
      if (this.account.hasGroup && this.account.isGroupChief) {
        await this.account.group!.applyCheckings();
      } else {
        // Otherwise apply a solo checking
        await this.applyCheckings();
      }

      // In case the script gets stopped after the checkings
      if (!this.running) {
        return;
      }

      // Handle function
      const entries = this.scriptManager.getFunctionEntries(
        this.currentFunctionType
      );

      // In case the script doesn't have a function we need
      if (!entries) {
        this.stopScript(
          LanguageManager.trans(
            "scriptDoesntInclude",
            FunctionTypes[this.currentFunctionType]
          )
        );
        return;
      }

      for (const entry of entries.maps) {
        // If the entry doesn't have the map flag (unlikely, but possible)
        if (!entry.map) {
          continue;
        }
        // Continue if this isn't the right entry for this map
        if (!this.account.game.map.isOnMap(entry.map.toString())) {
          continue;
        }
        this.parseEntry(entry);
        await this.processCurrentEntryFlag();
        return;
      }

      // In case no entry was found in this map
      this.stopScript(
        LanguageManager.trans(
          "mapNoEntry",
          this.account.game.map.currentPosition,
          this.account.game.map.id
        )
      );
    } catch (error) {
      this.account.logger.logError(LanguageManager.trans("script"), error);
      this.stopScript();
    }
  }

  private parseEntry(entry: IMap) {
    this.entryFlags = new List();
    this.entryFlagsIndex = 0;

    if (this.currentFunctionType === FunctionTypes.MOVE) {
      if (entry.gather) {
        this.entryFlags.Add(new GatherFlag());
      }
      if (entry.fight) {
        this.entryFlags.Add(new FightFlag());
      }
    }

    if (this.currentFunctionType === FunctionTypes.BANK) {
      if (entry.npcBank) {
        this.entryFlags.Add(new NpcBankFlag());
      }
    }

    if (this.currentFunctionType === FunctionTypes.PHENIX) {
      if (entry.phenix) {
        this.entryFlags.Add(new PhenixFlag(entry.phenix));
      }
    }

    if (entry.custom) {
      this.entryFlags.Add(new CustomFlag(entry.custom));
    }

    if (entry.door) {
      this.entryFlags.Add(new DoorFlag(entry.door));
    }

    if (entry.path) {
      this.entryFlags.Add(new ChangeMapFlag(entry.path));
    }

    // Check if there is at least one valid flag
    if (this.entryFlags.Count() === 0) {
      this.stopScript(LanguageManager.trans("mapNothingToDo"));
    }
  }

  private async processEntryFlags(avoidChecks: boolean = false) {
    if (!this.running) {
      return;
    }

    // Check for max pods
    if (this.gotToMaxPods) {
      await this.processScript();
      return;
    }

    if (!avoidChecks) {
      switch (this.entryFlags.ElementAt(this.entryFlagsIndex).type) {
        case IFlagType.GatherFlag:
          const gatherAction = this.createGatherAction();
          if (!gatherAction) {
            return;
          }
          // We'll assume gatherAction can never be null
          if (
            this.account.game.managers.gathers.canGather(
              ...gatherAction.elements
            )
          ) {
            await this.processCurrentEntryFlag(gatherAction);
            return;
          }
          break;
        case IFlagType.FightFlag:
          const fightAction = this.createFightAction();
          if (
            this.account.game.map.canFight(
              fightAction.minMonsters,
              fightAction.maxMonsters,
              fightAction.minMonstersLevel,
              fightAction.maxMonstersLevel,
              fightAction.forbiddenMonsters,
              fightAction.mandatoryMonsters
            )
          ) {
            await this.processCurrentEntryFlag(fightAction);
            return;
          }
          break;
      }
    }

    // Otherwise just move to the next flag
    this.entryFlagsIndex++;
    // If we processed all the flags
    if (this.entryFlagsIndex === this.entryFlags.Count()) {
      this.stopScript(LanguageManager.trans("nothingToDo"));
    } else {
      await this.processCurrentEntryFlag();
    }
  }

  private async processCurrentEntryFlag(alreadyParsedAction?: ScriptAction) {
    if (!this.running) {
      return;
    }
    const currentFlag = this.entryFlags.ElementAt(this.entryFlagsIndex);
    switch (currentFlag.type) {
      case IFlagType.GatherFlag:
        await this.handleGatherFlag(alreadyParsedAction as GatherAction);
        break;
      case IFlagType.FightFlag:
        await this.handleFightFlag(alreadyParsedAction as FightAction);
        break;
      case IFlagType.NpcBankFlag:
        await this.handleNpcBankFlag();
        break;
      case IFlagType.PhenixFlag:
        await this.handlePhenixFlag(currentFlag as PhenixFlag);
        break;
      case IFlagType.CustomFlag:
        await this.actionsManager.handleCustom(
          (currentFlag as CustomFlag).func
        );
        break;
      case IFlagType.DoorFlag:
        await this.handleDoorFlag(currentFlag as DoorFlag);
        break;
      case IFlagType.ChangeMapFlag:
        await this.handleChangeMapFlag(currentFlag as ChangeMapFlag);
        break;
    }
  }

  private async checkForDeath() {
    // Check first if the character is a tombstone to free it
    if (
      this.account.game.character.lifeStatus ===
      PlayerLifeStatusEnum.STATUS_TOMBSTONE
    ) {
      this.account.logger.logInfo(
        LanguageManager.trans("scriptsManager"),
        LanguageManager.trans("characterTombstone")
      );
      this.account.network.sendMessageFree(
        "GameRolePlayFreeSoulRequestMessage"
      );
      // Wait for a map change since after a free soul, we get teleported
      await this.account.game.map.waitMapChange(10);
      await sleep(1000);
    }
    // Check if the character is a phantom (in case the user reconnects as a phantom and not a tombstone)
    if (
      this.account.game.character.lifeStatus ===
      PlayerLifeStatusEnum.STATUS_PHANTOM
    ) {
      this.account.logger.logInfo(
        LanguageManager.trans("scriptsManager"),
        LanguageManager.trans("characterPhantom")
      );
      this.currentFunctionType = FunctionTypes.PHENIX;
    }
  }

  private async checkScriptRegeneration() {
    // Check if the AUTO_REGEN parameter exists
    const autoRegen = this.scriptManager.config.AUTO_REGEN;
    if (!autoRegen || !this.account.config.autoRegenAccepted) {
      return;
    }

    const minLife = this.scriptManager.config.AUTO_REGEN.minLife
      ? this.scriptManager.config.AUTO_REGEN.minLife
      : 0;
    const maxLife = this.scriptManager.config.AUTO_REGEN.maxLife
      ? this.scriptManager.config.AUTO_REGEN.maxLife
      : 100;
    // Check if we need to regenerate
    if (
      minLife === 0 ||
      this.account.game.character.stats.lifePercent > minLife
    ) {
      return;
    }
    // Calculate how much HP we need back, base on maxLife
    const endHp =
      (maxLife * this.account.game.character.stats.maxLifePoints) / 100;
    let hpToRegen = endHp - this.account.game.character.stats.lifePoints;
    // Get the items that the user wants us to use for regen
    const items = this.scriptManager.config.AUTO_REGEN.items
      ? this.scriptManager.config.AUTO_REGEN.items
      : [];
    for (const t of items) {
      // Hard coded the value 20 because its useless to waste a regen item for this much hp to regen
      if (hpToRegen < 20) {
        break;
      }
      const obj = this.account.game.character.inventory.getObjectByGid(t);
      // If the item doesn't exist, go to the next one
      if (!obj) {
        continue;
      }
      // If the item is not a regen item, go to the next one
      if (obj.regenValue && obj.regenValue <= 0) {
        continue;
      }
      // Get how much quantity we need
      const neededQty = Math.floor(hpToRegen / obj.regenValue!);
      // Then get how much quantity we actually have
      const validQty = Math.min(neededQty, obj.quantity);
      // Use the object
      this.account.game.character.inventory.useObject(obj, validQty);
      await sleep(800);
      // Decreate the hp to regen
      hpToRegen -= obj.regenValue! * validQty;
    }
  }

  private async checkRegeneration() {
    // This option is disabled if the value is 0
    if (this.account.extensions.fights.config.regenStart === 0) {
      return;
    }
    // In case some user is...
    if (
      this.account.extensions.fights.config.regenEnd <=
      this.account.extensions.fights.config.regenStart
    ) {
      return;
    }
    // Check if we need to regen
    if (
      this.account.game.character.stats.lifePercent <=
      this.account.extensions.fights.config.regenStart
    ) {
      // Calculate how much HP we need back, based on the regenEnd option
      const endHp =
        (this.account.extensions.fights.config.regenEnd *
          this.account.game.character.stats.maxLifePoints) /
        100;
      const hpToRegen = endHp - this.account.game.character.stats.lifePoints;
      if (hpToRegen > 0) {
        const estimatedTime = hpToRegen / 2;
        // Use sits emote for double hp regen (if we're not already sitting)
        if (this.account.state !== AccountStates.REGENERATING) {
          this.account.game.character.sit();
        }
        this.account.logger.logInfo(
          LanguageManager.trans("scriptsManager"),
          LanguageManager.trans("hpToGetBack", hpToRegen, estimatedTime)
        );
        // Then just wait it before continuing
        for (
          let i = 0;
          i < estimatedTime &&
          this.account.game.character.stats.lifePercent <=
          this.account.extensions.fights.config.regenEnd &&
          this.running;
          i++
        ) {
          await sleep(1000);
        }
        if (this.running) {
          // Make the character get up when he's done
          if (this.account.state === AccountStates.REGENERATING) {
            this.account.game.character.sit();
          }
          this.account.logger.logInfo(
            LanguageManager.trans("scriptsManager"),
            LanguageManager.trans("regenEnded")
          );
        }
      }
    }
  }

  private async checkForBags() {
    if (!this.scriptManager.config.OPEN_BAGS) {
      return;
    }
    const bags = this.account.game.character.inventory.objects.Where(
      o => o !== undefined && o.typeId === 100 && o.superTypeId === 6
    );
    if (bags.Count() > 0) {
      bags.ForEach(async b => {
        if (!b) {
          return;
        }
        this.account.game.character.inventory.useObject(b);
        await sleep(800);
      });
      this.account.logger.logInfo(
        LanguageManager.trans("scripts"),
        LanguageManager.trans("bagsOpen", bags.Count())
      );
    }
  }

  private async checkAutoBoosting() {
    // Stat
    if (
      this.account.config.statToBoost !== BoostableStats.NONE &&
      this.account.game.character.stats.statsPoints > 0
    ) {
      if (
        this.account.game.character.autoBoostStat(
          this.account.config.statToBoost
        )
      ) {
        await sleep(1000);
      }
    }
    // Spells
    if (
      this.account.config.spellsToBoost.length > 0 &&
      this.account.game.character.stats.spellsPoints > 0
    ) {
      for (const spellToBoost of this.account.config.spellsToBoost) {
        if (
          this.account.game.character.autoLevelUpSpell(
            spellToBoost.id,
            spellToBoost.level
          )
        ) {
          await sleep(1000);
        }
      }
    }
  }

  private async checkForMount() {
    if (
      !this.account.config.autoMount ||
      !this.account.game.character.mount.hasMount ||
      this.account.game.character.mount.isRiding
    ) {
      return;
    }
    this.account.game.character.mount.toggleRiding();
    this.account.logger.logInfo(
      LanguageManager.trans("scripts"),
      LanguageManager.trans("nowOnMount")
    );
    await sleep(1000);
  }

  private async checkForMaxPods() {
    // We'll only change the function type if the current one is MOVE
    // This will prevent us from overwriting an ongoing PHENIX session
    if (this.gotToMaxPods && this.currentFunctionType === FunctionTypes.MOVE) {
      // Check if there is an AUTO_DELETE option
      await this.checkForAutoDelete();
      await sleep(1000);
      // To fix this bug https://pastebin.com/HWYjTjuE
      // We will check if the script is running (since a fight pauses the script)
      if (!this.running) {
        return;
      }
      // If the character is still full
      if (this.gotToMaxPods) {
        this.account.logger.logInfo(
          LanguageManager.trans("scripts"),
          LanguageManager.trans("maxPodsReached")
        );
        this.currentFunctionType = FunctionTypes.BANK;
      }
    }
  }

  private async checkForAutoDelete() {
    const autoDeleteElements = this.scriptManager.config.AUTO_DELETE;
    // If the script has an AUTO_DELETE configuration
    if (autoDeleteElements) {
      this.account.logger.logDebug(
        LanguageManager.trans("scripts"),
        LanguageManager.trans("autoDeleteStarted")
      );
      for (const gid of autoDeleteElements) {
        // Remove all the objects and not only the first one, because sometimes objects are simplette to 1-s
        for (const obj of this.account.game.character.inventory
          .getObjectsByGid(gid)
          .ToArray()) {
          this.account.game.character.inventory.deleteObject(obj, 0);
          await sleep(800);
        }
      }
      this.account.logger.logDebug(
        LanguageManager.trans("scripts"),
        LanguageManager.trans("autoDeleteEnded")
      );
    }
  }

  private async checkForSpecialCases(): Promise<boolean> {
    // Special case: When we release the character from being a phantom, we have to go back to the move function.
    // Group special case: only reset the current function when everyone is alive
    if (
      this.currentFunctionType === FunctionTypes.PHENIX &&
      (this.account.hasGroup && this.account.isGroupChief
        ? this.account.group!.isEveryoneAliveAndKicking
        : this.account.game.character.lifeStatus ===
        PlayerLifeStatusEnum.STATUS_ALIVE_AND_KICKING)
    ) {
      this.account.logger.logDebug(
        LanguageManager.trans("scripts"),
        LanguageManager.trans("characterNoMorePhantom")
      );
      this.currentFunctionType = FunctionTypes.MOVE;
      await this.processScript();
      return true;
    }
    // Special case: When it's the BANK function and the character is not fullpods anymore
    // Group special case: only reset the current function when everyone is not full pods anymore
    if (
      this.currentFunctionType === FunctionTypes.BANK &&
      (this.account.hasGroup && this.account.isGroupChief
        ? !this.account.group!.isAnyoneFullWeight
        : !this.gotToMaxPods)
    ) {
      this.account.logger.logDebug(
        LanguageManager.trans("scripts"),
        LanguageManager.trans("characterNoMoreFullWeight")
      );
      this.currentFunctionType = FunctionTypes.MOVE;
      await this.processScript();
      return true;
    }
    // No special case
    return false;
  }

  private async handleGatherFlag(gatherAction: GatherAction) {
    const action = gatherAction ? gatherAction : this.createGatherAction();
    // If the action is null, it's probably due to the character not having resources to gather (no jobs usually)
    if (!action) {
      return;
    }
    // If we can actually gather in this map, enqueue the action
    if (this.account.game.managers.gathers.canGather(...action.elements)) {
      await this.actionsManager.enqueueAction(action, true);
    } else {
      // Otherwise move to next flag
      // We'll avoid the checks because we know we can't gather anymore
      this.account.logger.logDebug(
        LanguageManager.trans("scripts"),
        LanguageManager.trans("noResource")
      );
      await this.processEntryFlags(true);
    }
  }

  private createGatherAction(): GatherAction | null {
    // Check if the script has the elements to gather
    const elementsToGather = this.scriptManager.config.ELEMENTS_TO_GATHER;
    const resourcesIds = new List<number>();
    // If yes
    if (elementsToGather) {
      for (const etg of elementsToGather) {
        if (this.account.game.character.jobs.hasCollectSkills(etg)) {
          resourcesIds.Add(etg);
        }
      }
    }
    // If the list of resources is empty (not set in the script)
    if (resourcesIds.Count() === 0) {
      resourcesIds.AddRange(
        this.account.game.character.jobs.collectSkillsIds.ToArray()
      );
    }
    // In case the character has no jobs or something
    if (resourcesIds.Count() === 0) {
      this.stopScript(LanguageManager.trans("gathersListEmpty"));
      return null;
    }
    return new GatherAction(resourcesIds.ToArray());
  }

  private async handleFightFlag(fightAction: FightAction) {
    const action = fightAction ? fightAction : this.createFightAction();
    // If we got the max fights per map, reprocess entry flags
    const maxFightsPerMap = this.scriptManager.config.MAX_FIGHTS_PER_MAP
      ? this.scriptManager.config.MAX_FIGHTS_PER_MAP
      : -1;
    if (
      maxFightsPerMap !== -1 &&
      this.actionsManager.fightsOnThisMap >= maxFightsPerMap
    ) {
      this.account.logger.logDebug(
        LanguageManager.trans("scripts"),
        LanguageManager.trans("maxFightsPerMap", maxFightsPerMap)
      );
      await this.processEntryFlags(true);
      return;
    }
    // If we can actually fight in this map, enqueue the action
    if (
      this.account.game.map.canFight(
        action.minMonsters,
        action.maxMonsters,
        action.minMonstersLevel,
        action.maxMonstersLevel,
        action.forbiddenMonsters,
        action.mandatoryMonsters
      )
    ) {
      await this.actionsManager.enqueueAction(action, true);
    } else {
      // Otherwise move to the next flag
      // We'll avoid the checks because we know we can't fight anymore
      this.account.logger.logDebug(
        LanguageManager.trans("scripts"),
        LanguageManager.trans("noMonstersGroup")
      );
      await this.processEntryFlags(true);
    }
  }

  private createFightAction(): FightAction {
    const minMonsters = this.scriptManager.config.MIN_MONSTERS
      ? this.scriptManager.config.MIN_MONSTERS
      : 1;
    const maxMonsters = this.scriptManager.config.MAX_MONSTERS
      ? this.scriptManager.config.MAX_MONSTERS
      : 8;
    const minLevel = this.scriptManager.config.MIN_MONSTERS_LEVEL
      ? this.scriptManager.config.MIN_MONSTERS_LEVEL
      : 1;
    const maxLevel = this.scriptManager.config.MAX_MONSTERS_LEVEL
      ? this.scriptManager.config.MAX_MONSTERS_LEVEL
      : 1000;
    const forbiddenMonsters = [];
    const mandatoryMonsters = [];
    // Forbidden monsters
    let entry = this.scriptManager.config.FORBIDDEN_MONSTERS;
    if (entry) {
      for (const fm of entry) {
        forbiddenMonsters.push(fm);
      }
    }
    // mandatory monsters
    entry = this.scriptManager.config.MANDATORY_MONSTERS;
    if (entry) {
      for (const fm of entry) {
        mandatoryMonsters.push(fm);
      }
    }
    return new FightAction(
      minMonsters,
      maxMonsters,
      minLevel,
      maxLevel,
      forbiddenMonsters,
      mandatoryMonsters
    );
  }

  private async handleNpcBankFlag() {
    // Opening the storage
    await this.actionsManager.enqueueAction(new NpcBankAction(-1, -1));
    // BANK_PUT_ITEMS
    const bankPutItems = this.scriptManager.config.BANK_PUT_ITEMS;
    if (bankPutItems && bankPutItems.length > 0) {
      for (const val of bankPutItems) {
        if (typeof val.id === "number" && typeof val.quantity === "number") {
          await this.actionsManager.enqueueAction(
            new StoragePutItemAction(val.id, val.quantity)
          );
        }
      }
    } else {
      // If BANK_PUT_ITEMS is not set, put all items
      await this.actionsManager.enqueueAction(new StoragePutAllItemsAction());
    }
    // BANK_GET_ITEMS
    const bankGetItems = this.scriptManager.config.BANK_GET_ITEMS;
    if (bankGetItems && bankGetItems.length > 0) {
      for (const val of bankGetItems) {
        if (typeof val.id === "number" && typeof val.quantity === "number") {
          await this.actionsManager.enqueueAction(
            new StorageGetItemAction(val.id, val.quantity)
          );
        }
      }
    }
    // AUTO_REGEN store
    const autoRegen = this.scriptManager.config.AUTO_REGEN;
    if (autoRegen) {
      if (autoRegen.store > 0) {
        await this.actionsManager.enqueueAction(
          new StorageGetAutoRegenStoreAction(autoRegen.items, autoRegen.store)
        );
      }
    }
    // BANK_PUT_KAMAS
    let amount = this.scriptManager.config.BANK_PUT_KAMAS
      ? this.scriptManager.config.BANK_PUT_KAMAS
      : -1;
    if (amount >= 0) {
      await this.actionsManager.enqueueAction(
        new StoragePutKamasAction(amount)
      );
    }
    // BANK_GET_KAMAS
    amount = this.scriptManager.config.BANK_GET_KAMAS
      ? this.scriptManager.config.BANK_GET_KAMAS
      : -1;
    if (amount >= 0) {
      await this.actionsManager.enqueueAction(
        new StorageGetKamasAction(amount)
      );
    }
    // Leave the storage
    await this.actionsManager.enqueueAction(new LeaveDialogAction(), true);
  }

  private async handlePhenixFlag(flag: PhenixFlag) {
    const phenix = this.account.game.map.phenixs.find(
      ph => ph.cellId === flag.cellId
    );
    // If the phenix wasn't found
    if (!phenix) {
      this.stopScript(LanguageManager.trans("noPhenixOnCell", flag.cellId));
      return;
    }
    await this.actionsManager.enqueueAction(new UseAction(flag.cellId, -1));
    await this.actionsManager.enqueueAction(new DelayAction(2000), true);
  }

  private async handleDoorFlag(flag: DoorFlag) {
    const door = this.account.game.map.doors.find(
      d => d.cellId === flag.cellId
    );
    if (!door) {
      this.stopScript(LanguageManager.trans("noDoorOnCell", flag.cellId));
      return;
    }
    await this.actionsManager.enqueueAction(new UseAction(flag.cellId, -1));
    await this.actionsManager.enqueueAction(
      new WaitMapChangeAction(10000),
      true
    );
  }

  private async handleChangeMapFlag(flag: ChangeMapFlag) {
    const action = ChangeMapAction.tryParse(flag.where);
    if (action) {
      await this.actionsManager.enqueueAction(action, true);
    } else {
      this.stopScript(LanguageManager.trans("invalidDirection"));
    }
  }

  private onFightJoined = () => {
    if (!this.enabled) {
      return;
    }
    this.paused = true;
    this.account.game.managers.gathers.cancelGather();
    this.account.game.managers.interactives.cancelUse();
    this.account.logger.logDebug(
      LanguageManager.trans("scripts"),
      LanguageManager.trans("paused")
    );
  };

  private onFightEnded = () => {
    if (!this.enabled) {
      return;
    }
    this.paused = false;
    this.account.logger.logDebug(
      LanguageManager.trans("scripts"),
      LanguageManager.trans("unpaused")
    );
  };

  private onActionsFinished = async (data?: IActionsManagerEventData) => {
    // If this account is a member of a group
    if (this.account.hasGroup) {
      // If this account is not the chief, ignore this event since the group will handle it
      if (!this.account.isGroupChief) {
        return;
      }
      // Otherwise wait for all the actionsFinished events from the members
      this.account.logger.logDebug(
        LanguageManager.trans("groups"),
        LanguageManager.trans("waitingAllMembers")
      );
      await this.account.group!.waitForAllActionsFinished();
      this.account.logger.logDebug(
        LanguageManager.trans("groups"),
        LanguageManager.trans("allMembersDone")
      );
    }
    // Check for special cases (full pods, phenix)
    if (await this.checkForSpecialCases()) {
      return;
    }
    // If a map changed occured, re-process the script
    if (data && data.mapChanged) {
      await this.processScript();
    } else {
      await this.processEntryFlags();
    }
  };

  private onCustomHandled = async (data?: IActionsManagerEventData) => {
    // If this account is a member of a group, ignore this event because group will handle it
    if (this.account.hasGroup && !this.account.isGroupChief) {
      return;
    }
    // Check for special cases (full pods, phenix)
    if (await this.checkForSpecialCases()) {
      return;
    }
    // If a map changed occured, re-process the script
    if (data && data.mapChanged) {
      await this.processScript();
    } else {
      await this.processEntryFlags();
    }
  };

  private beforeDoFile = () => {
    (global as any).API[this.account.accountConfig.username] = this.api;

    (global as any).API[this.account.accountConfig.username].isFighting = () =>
      this.account.isFighting;
    (global as any).API[this.account.accountConfig.username].isGathering = () =>
      this.account.isGathering;
    (global as any).API[this.account.accountConfig.username].isInDialog = () =>
      this.account.isInDialog;

    (global as any).API[this.account.accountConfig.username].printMessage = (
      message: string
    ) => {
      this.account.logger.logMessage(LanguageManager.trans("scripts"), message);
    };

    (global as any).API[this.account.accountConfig.username].printDebug = (
      message: string
    ) => {
      this.account.logger.logDebug(LanguageManager.trans("scripts"), message);
    };

    (global as any).API[this.account.accountConfig.username].printSuccess = (
      message: string
    ) => {
      this.account.logger.logInfo(LanguageManager.trans("scripts"), message);
    };

    (global as any).API[this.account.accountConfig.username].printError = (
      message: string
    ) => {
      this.account.logger.logError(LanguageManager.trans("scripts"), message);
    };

    (global as any).API[this.account.accountConfig.username].stopScript = (
      reason?: string
    ) => {
      this.stopScript(reason);
    };

    (global as any).API[this.account.accountConfig.username].delayFunc = async (
      delay: number
    ) => {
      await this.actionsManager.enqueueAction(new DelayAction(delay), true);
    };

    (global as any).API[
      this.account.accountConfig.username
    ].leaveDialogFunc = async (): Promise<boolean> => {
      if (this.account.isInDialog) {
        await this.actionsManager.enqueueAction(new LeaveDialogAction(), true);
        return true;
      }
      return false;
    };
  };
}
