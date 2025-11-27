import { MovementType } from './movement-type.enum';

export interface Movement {
  id: number;
  productId: number;
  quantity: number;
  type: MovementType;
  description: string;
  user: string;
  date: string;
}
