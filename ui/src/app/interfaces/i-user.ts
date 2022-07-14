export interface IUser {
  id: number;
  UserName: string;
  Avatar: string;
  Email: string;
  ContactNo: string;
  Wallet: number;
  BonusCredit: number;
  WithdrawalDetails: string;
  UserStatus: number;
  DateOfRegistration: Date;
  LastUpdated: Date;
  Roles: string[];
}
