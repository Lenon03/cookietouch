import Account from "@/account";
import SpellEntry from "@/game/character/SpellEntry";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const characterSpellsTabStyles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxHeight: 400,
      overflowY: "auto",
      padding: 10
    },
    table: {
      minWidth: 700
    }
  });

export interface ICharacterSpellsTabProps
  extends WithStyles<typeof characterSpellsTabStyles> {
  account: Account;
}

export interface ICharacterSpellsTabState {
  spells: SpellEntry[];
  spellsPoints: number;
}
