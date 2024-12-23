export interface Page {
    id: number;
    title: string;
    slug: string;
    content: object; 
    authorId?: string; 
    isPublished: boolean;
    publishedAt?: Date; 
    createdAt: Date;
    updatedAt: Date;
    tags?: string[]; 
    category?: string; 
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
      canonicalUrl?: string;
    }; 
  }