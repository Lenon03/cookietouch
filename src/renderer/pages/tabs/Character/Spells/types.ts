import Account from "@/account";
import SpellEntry from "@/game/character/SpellEntry";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { CharacterSpellsTabStyle } from "@renderer/pages/tabs/Character/Spells/styles";

export interface ICharacterSpellsTabProps {
  account: Account;
}

export interface ICharacterSpellsTabState {
  spells: SpellEntry[];
  spellsPoints: number;
}

export type CharacterSpellsTabProps = ICharacterSpellsTabProps &
  WithStyles<CharacterSpellsTabStyle>;
