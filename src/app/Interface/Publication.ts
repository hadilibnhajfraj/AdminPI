export class Publication {
  id: number;
  contenu: string;
  datePublication: Date;
  urlMedia: string;
  commentaires?: Array<{ data: string, createdAt: Date, user: { id: string } }>;
    authorName?: string;
    user: { id: number };   
}
