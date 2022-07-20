export interface IAgentContract {
  id: number;
  AgentId: number;
  DepositCommission: number;
  DepositType: number; // 0: value, 1: percentage
  WithdrawalCommission: number;
  WithdrawalType: number; // 0: value, 1: percentage
  RecruitCommission: number;
  RecruitType: number; // 0: value, 1: percentage
  createdAt: Date;
  updatedAt: Date;
}
