export interface IUserInformation {
  created: number;
  email: string;
  email_normalized: string;
  iden: string;
  image_url: string;
  max_upload_size: number;
  modified: number;
  name: string;
}
export interface IDevice {
  active: boolean;
  app_version: number;
  created: number;
  iden: string;
  manufacturer: string;
  model: string;
  modified: number;
  nickname: string;
  push_token: string;
}
export interface IDevices {
  devices: IDevice[];
}

export enum NotificationType {
  LEVEL_JOB,
  LEVEL,
  PRIVATE_MESSAGE,
  IN_JAIL,
  CAPTCHA_REQUEST,
  MOD_ON_MAP,
  MOD_PRIVATE_MESSAGE,
  DISCONNECT,
  SCRIPT_ERROR
}

export interface INotificationData {
  level?: number;
  senderName?: string;
  message?: string;
  levelJob?: number;
  jobName?: string;
  error?: string;
}
