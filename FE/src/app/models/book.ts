export interface Books {
  _id: string;
  title: string;
  description: string;
  publishDate: Date;
  pageCount: number;
  price: number;
  availableQuantity: number;
  imageUrl: string;
  imageId: string;
  //publisher: string;
  //author: string;
  categories: [];
  reviews: [];
  //discount: string;
}
