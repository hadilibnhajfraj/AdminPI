export interface AnnonceOffre {
  dateDebutAnnonce: Date;
  dateFinAnnonce: Date;
  description: string;
  idProduits: string[]; // Assuming this is an array of product IDs as strings
  prix: number;
  image?: string; // Optional field
  numberOfViews: number;
  numberOfLikes: number;
  status: 'active' | 'inactive';
}
