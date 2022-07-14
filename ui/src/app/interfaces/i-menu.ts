export interface IMenu {
  id: number;
  MenuDisplayName: string;
  MenuUrl: string;
  MenuIcon: string;
  ParentId: number;
  OrderIndex: number;
  IsViewPaged: boolean;
  MenuPosition: number;
  createAt: Date;
  updateAt: Date;
}
