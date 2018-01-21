import Account from "@/account";
import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import Group from "@/groups/Group";
import IEntity from "@/utils/IEntity";
import LiteEvent from "@/utils/LiteEvent";
import { sleep } from "@/utils/Time";
import { List } from "linqts";

export default class CookieMain {
  public static entities = new List<IEntity>();
  public static selectedAccount: Account = null;

  public static get connectedAccounts(): List<Account> {
    return this.entities.Select((e) => {
      if (e instanceof Account) {
        return e;
      }
      return (e as Group).chief;
    });
  }

  public static connectAccounts(accountConfigs: List<AccountConfiguration>) {
    accountConfigs.ForEach((accountConfig) => {
      const account = new Account(accountConfig);
      this.entities.Add(account);
      this.onEntitiesUpdated.trigger();
      this.selectedAccount = account;
      this.onSelectedAccountChanged.trigger(this.selectedAccount);
      account.start();
    });
  }

  public static connectGroup(chief: AccountConfiguration, members: List<AccountConfiguration>) {
    const group = new Group(new Account(chief));
    members.ForEach((m) => group.addMember(new Account(m)));
    this.entities.Add(group);
    this.onEntitiesUpdated.trigger();
    this.selectedAccount = group.chief;
    this.onSelectedAccountChanged.trigger(this.selectedAccount);
    group.connect();
  }

  public static async removeSelectedAccount() {
    if (!this.selectedAccount) {
      return;
    }

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
    // Dispose
    group = null;
  }

  public static async disconnectAccount(account: Account) {
    if (account.network.connected) {
      account.network.close();
      await sleep(400);
    }
  }

  public static refreshSelectedAccount(index: number) {
    // If there are no account left, set it to null
    if (this.entities.Count() === 0 || index === -1) {
      this.selectedAccount = null;
    } else {
      // Otherwise look for another one
      index = index > this.entities.Count() - 1 ? this.entities.Count() - 1 : index;
      const entity = this.entities.ElementAt(index);
      if (entity instanceof Group) {
        this.selectedAccount = entity.chief;
      } else {
        this.selectedAccount = entity as Account;
      }
    }
    this.onEntitiesUpdated.trigger();
    this.onSelectedAccountChanged.trigger(this.selectedAccount);
  }

  public static get SelectedAccountChanged() { return this.onSelectedAccountChanged.expose(); }
  private static readonly onSelectedAccountChanged = new LiteEvent<Account>();
  public static get EntitiesUpdated() { return this.onEntitiesUpdated.expose(); }
  private static readonly onEntitiesUpdated = new LiteEvent<void>();
}
