export enum FightEventEnum {
  /** Évènenement de combat inconnu. */
  UNKNOWN_FIGHT_EVENT = "unknown",
  /** Un combattant gagne des points de vie. */
  FIGHTER_LIFE_GAIN = "fighterLifeGain",
  /** Un combattant perd des points de vie. */
  FIGHTER_LIFE_LOSS = "fighterLifeLoss",
  /** Un combattant perd des points de vie qui entraine la mort de celui-ci. */
  FIGHTER_LIFE_LOSS_AND_DEATH = "fightLifeLossAndDeath",
  /** Un combattant devait subir des dégâts, mais il n"a finalement rien subi. */
  FIGHTER_NO_CHANGE = "fighterNoChange",
  /** Un combattant meurt. */
  FIGHTER_DEATH = "fighterDeath",
  /** Le combat est fini. */
  FIGHT_END = "fightEnd",
  /** Un combattant quitte le combat. */
  FIGHTER_LEAVE = "fighterLeave",
  /** Un combattant change d"apparence. */
  FIGHTER_CHANGE_LOOK = "fighterChangeLook",
  /** Un combattant a été désenvouté. */
  FIGHTER_GOT_DISPELLED = "fighterGotDispelled",
  /** Un sort d"un combattant a été désenvouté. */
  FIGHTER_SPELL_DISPELLED = "fighterSpellDispelled",
  /** La durée des effets d"un combatant a été modifié. */
  FIGHTER_EFFECTS_MODIFY_DURATION = "fighterEffectsModifyDuration",
  /** Le cooldown d"un sort d"un combattant a été modifié. */
  FIGHTER_SPELL_COOLDOWN_VARIATION = "fighterSpellCooldownVariation",
  /** Un combattant est immunisé au sort venant d"etre lancé. */
  FIGHTER_SPELL_IMMUNITY = "fighterSpellImmunity",
  /** Un combattant a esquivé la perte de points d"action. */
  FIGHTER_AP_LOSS_DODGED = "fighterDodgedAPLoss",
  /** Un combattant a esquivé la perte de points de mouvement. */
  FIGHTER_MP_LOSS_DODGED = "fighterDodgedMPLoss",
  /** Deux combattants ont échangés leurs positions respectives. */
  FIGHTERS_POSITION_EXCHANGE = "fightersExchangedPositions",
  /** L"état de visibilité d"un combattant a changé. */
  FIGHTER_VISIBILITY_CHANGED = "fighterVisibilityChanged",
  /** Un combattant a été arrêté par un obstacle invisible. */
  FIGHTER_INVISIBLE_OBSTACLE = "fighterInvisibleObstacle",
  /** Un combattant a été tué par un autre. */
  FIGHTER_GOT_KILLED = "fighterGotKilled",
  /** Un combattant a reçu un boost temporaire. */
  FIGHTER_TEMPORARY_BOOSTED = "fighterTemporaryBoosted",
  /** Un combattant a utilisé des points d"action. */
  FIGHTER_AP_USED = "fighterUsedAP",
  /** Un combattant a perdu des points d"action. */
  FIGHTER_AP_LOST = "fighterLostAP",
  /** Un combattant a gagné des points d"action. */
  FIGHTER_AP_GAINED = "fighterGainedAP",
  /** Un combattant a utilisé des points de de mouvement. */
  FIGHTER_MP_USED = "fighterUsedMP",
  /** Un combattant a perdu des points de de mouvement. */
  FIGHTER_MP_LOST = "fighterLostMP",
  /** Un combattant a gagné des points de mouvement. */
  FIGHTER_MP_GAINED = "fighterGainedMP",
  /** Un combattant gagne des points de bouclier. (Non utilisé actuellement) */
  FIGHTER_SHIELD_GAIN = "fighterShieldGain",
  /** Un combattant perd des points de bouclier. */
  FIGHTER_SHIELD_LOSS = "fighterShieldLoss",
  /** Un combattant a réduit des dégâts subis. */
  FIGHTER_REDUCED_DAMAGES = "fighterReducedDamages",
  /** Un combattant a renvoyé des dégâts subis. */
  FIGHTER_REFLECTED_DAMAGES = "fighterReflectedDamages",
  /** Un combattant a renvoyé un sort. */
  FIGHTER_REFLECTED_SPELL = "fighterReflectedSpell",
  /** Un combattant a glissé. */
  FIGHTER_SLIDE = "fighterSlided",
  /** Un combattant a lancé un sort. */
  FIGHTER_CASTED_SPELL = "fighterCastedSpell",
  /** Un combattant a attaqué au corps à corps avec une arme. */
  FIGHTER_CLOSE_COMBAT = "fighterCloseCombat",
  /** Un combattant a fait un coup critique. */
  FIGHTER_DID_CRITICAL_HIT = "fighterDidCriticalHit",
  /** Un combattant a fait un echec critique. */
  FIGHTER_DID_CRITICAL_MISS = "fighterDidCriticalMiss",
  /** Un combattant est entré dans un état. */
  FIGHTER_ENTERING_STATE = "fighterEnteredState",
  /** Un combattant est sorti d"un état. */
  FIGHTER_LEAVING_STATE = "fighterLeftState",
  /** Un combattant a volé des Kamas à un autre. */
  FIGHTER_STEALING_KAMAS = "fighterStoleKamas",
  /** Un combattant a invoqué une créature. */
  FIGHTER_SUMMONED = "fighterSummoned",
  /** Un combattant a été taclé. */
  FIGHTER_GOT_TACKLED = "fighterGotTackled",
  /** Un combattant s"est téléporté. */
  FIGHTER_TELEPORTED = "fighterTeleported",
  /** Un combattant a activé un glyphe. */
  FIGHTER_TRIGGERED_GLYPH = "fighterTriggeredGlyph",
  /** Un combattant a activé un piège. */
  FIGHTER_TRIGGERED_TRAP = "fighterTriggeredTrap",
  /** Un combattant en a ramassé un autre. */
  FIGHTER_CARRY = "fighterCarry",
  /** Un combattant en a lancé un autre. */
  FIGHTER_THROW = "fighterThrow",
  /** Un glyphe est apparu sur le terrain. */
  GLYPH_APPEARED = "glyphAppeared",
  /** Un glyphe a disparu du terrain. */
  GLYPH_DISAPPEARED = "glyphDisappeared",
  /** Un piège est apparu sur le terrain. */
  TRAP_APPEARED = "trapAppeared",
  /** Un piège a disparu du terrain. */
  TRAP_DISAPPEARED = "trapDisappeared",
}
