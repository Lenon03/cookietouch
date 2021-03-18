import Account from "@/account";
import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import Group from "@/groups/Group";
import IEntity from "@/utils/IEntity";
import LiteEvent from "@/utils/LiteEvent";
import { sleep } from "@/utils/Time";
import { List } from "linqts";

export default class CookieMain {
  public static entities = new List<IEntity>();
  private static _selectedAccount: Account | null = null;
  private static readonly onSelectedAccountChanged = new LiteEvent<Account | null>();
  private static readonly onEntitiesUpdated = new LiteEvent<void>();

  public static get selectedAccount() {
    return this._selectedAccount;
  }

  public static set selectedAccount(account: Account | null) {
    this._selectedAccount = account;
    this.onSelectedAccountChanged.trigger(this._selectedAccount);
  }

  public static get connectedAccounts(): List<Account> {
    return this.entities.Select(e => {
      if (e instanceof Account) {
        return e;
      }
      return (e as Group).chief;
    });
  }

  public static get SelectedAccountChanged() {
    return this.onSelectedAccountChanged.expose();
  }

  public static get EntitiesUpdated() {
    return this.onEntitiesUpdated.expose();
  }

  public static connectAccounts(accountConfigs: List<AccountConfiguration>) {
    accountConfigs.ForEach(async accountConfig => {
      if (!accountConfig) {
        return;
      }
      const account = new Account(accountConfig);
      this.entities.Add(account);
      this.onEntitiesUpdated.trigger();
      this.selectedAccount = account;
      await account.start();
    });
  }

  public static async connectGroup(
    chief: AccountConfiguration,
    members: List<AccountConfiguration>
  ) {
    const group = new Group(new Account(chief));
    members.ForEach(m => m && group.addMember(new Account(m)));
    this.entities.Add(group);
    this.onEntitiesUpdated.trigger();
    this.selectedAccount = group.chief;
    await group.connect();
  }

  public static async removeSelectedAccount() {
    if (!this.selectedAccount) {
      return;
    }
    this.selectedAccount.planificationTimer.stop();
    let index = -1;

    // Remove the account from the list
    for (let i = this.entities.Count() - 1; i >= 0; i--) {
      const entity = this.entities.ElementAt(i);
      if (entity instanceof Account && entity === this.selectedAccount) {
        index = i;
        await this.disconnectAccount(this.selectedAccount);
        this.entities.RemoveAt(i);
        break;
      }
      if (entity instanceof Group) {
        // In case the user wants to remove the chief, remove the whole group
        if (entity.chief === this.selectedAccount) {
          await this.removeGroup(entity, i);
          return;
        }
        for (let j = entity.members.Count(); j >= 0; j--) {
          if (entity.members.ElementAt(j) !== this.selectedAccount) {
            continue;
          }
          index = i;
          await this.disconnectAccount(this.selectedAccount);
          entity.members.RemoveAt(j);
          break;
        }
      }
    }
    // Set another account as a selectedAccount
    this.refreshSelectedAccount(index);
  }

  public static async removeGroup(group: Group, index: number) {
    // Disconnect the chief
    await this.disconnectAccount(group.chief);
    // Disconnect the members
    for (let i = group.members.Count() - 1; i >= 0; i--) {
      await this.disconnectAccount(group.members.ElementAt(i));
    }
    // Remove the group from entities
    this.entities.RemoveAt(index);
    // Set another account as a selectedAccount
    this.refreshSelectedAccount(index);
  }

  public static async disconnectAccount(account: Account) {
    if (account.network.connected) {
      account.network.close();
      await sleep(400);
    }
  }

  // For now to communicate between AddAccountForm And AccountsList
  public static refreshEntities() {
    this.onEntitiesUpdated.trigger();
  }

  private static refreshSelectedAccount(index: number) {
    // If there are no account left, set it to null
    if (this.entities.Count() === 0 || index === -1) {
      this.selectedAccount = null;
    } else {
      // Otherwise look for another one
      index =
        index > this.entities.Count() - 1 ? this.entities.Count() - 1 : index;
      const entity = this.entities.ElementAt(index);
      this.selectedAccount =
        entity instanceof Group ? entity.chief : (entity as Account);
    }
    this.onEntitiesUpdated.trigger();
    this.onSelectedAccountChanged.trigger(this.selectedAccount);
  }
}
