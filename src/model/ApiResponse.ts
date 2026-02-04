export interface Meta {
  status: boolean;
  message: string;
}

export interface ApiResponse<T> {
  meta: Meta;
  data: T;
  pagination: Pagination;
}

export interface Pagination {
  total_count: number;
  per_page: number;
  page: number;
  total_pages: number;
}
