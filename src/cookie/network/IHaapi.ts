export enum HaapiErrorReasons {
  FAILED = "FAILED",
  BAN = "BAN"
}

export interface IHaapi {
  key: string;
  account_id: number;
  ip: string;
  added_date: string;
  meta: any[];
  data: {
    country: string;
    currency: string;
  };
  access: any[];
  refresh_token: string;
  expiration_date: string;
  reason: HaapiErrorReasons;
}
