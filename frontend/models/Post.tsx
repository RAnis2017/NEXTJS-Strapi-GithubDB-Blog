export interface Post {
  id: number;
  attributes: {
    title: string;
    content: string;
    createdAt: any;
    updatedAt: any;
    publishedAt: any;
  };
}

export interface PostJsonResponse {
  data: Post[];
}
