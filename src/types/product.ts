export interface Product{
  _id: string;
  name: string;
  price: number;
  description?: string;
  discount?: number;
  images?: string[];
  categoryId?: string;
  brandId?: string;
  isFeatured?: boolean;
  isNewProduct?: boolean;
}
