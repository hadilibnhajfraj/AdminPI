

export class Product {
  id!: number;
  title!: string;
  price!: number;
  quantity!: number;
  like!: number;
  imageUrl?: string; // Assuming products have images, adjust if needed
  category?: string; // Assuming products have categories, adjust if needed
}
