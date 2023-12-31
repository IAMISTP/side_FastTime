import { instance } from './client';

export interface PostArticle {
  title: string;
  content: string;
  anonymity: boolean;
}

export interface Article {
  id: number;
  nickname: string;
  title: string;
  anonymity: boolean;
  content: string;
  likeCount: number;
  commentCounts: number;
  createdAt: string | null;
  lastModifiedAt: string | null;
}

export interface ApiResponse<T> {
  data: T[];
}

export interface QueryParam {
  page?: number;
  pageSize?: number;
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async ({ page, pageSize = 10 }: QueryParam) => {
    const response = await instance.get<ApiResponse<T>>(this.endpoint, {
      params: {
        page,
        pageSize,
      },
    });

    if (response.status === 403) {
      const error = new Error('Forbidden');
      error.name = 'Forbidden';
      throw error;
    }

    return response.data.data;
  };

  getArticleById = (id: number) => {
    return instance.get<T>(`${this.endpoint}/${id}`).then((res) => res.data);
  };

  post = (article: PostArticle) => {
    return instance.post(this.endpoint, article).then((res) => res.data);
  };
}

export default APIClient;
