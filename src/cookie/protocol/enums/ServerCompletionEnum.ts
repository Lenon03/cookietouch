export enum ServerCompletionEnum {
  /** Le taux d'occupation du serveur est bas. */
  COMPLETION_RECOMANDATED = 0,
  /** Le taux d'occuatpion du serveur est moyen. */
  COMPLETION_AVERAGE = 1,
  /** Le taux d'occuatpion du serveur est élevé. */
  COMPLETION_HIGH = 2,
  /** Le serveur n'est pas disponible pour l'instant ? */
  COMPLETION_COMING_SOON = 3,
  /** Le serveur est complet. */
  COMPLETION_FULL = 4,
}
