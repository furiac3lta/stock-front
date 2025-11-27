export interface Product {
  id: number;
  name: string;
  sku: string;
  stock: number;
  costPrice: number;
  salePrice: number;
  categoryId: number;
  active: boolean;
}
