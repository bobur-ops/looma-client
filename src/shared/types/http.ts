export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export type QueryCustomOptions = {
  enabled?: boolean;
};

export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  totalPages: number;
  page: number;
}

export interface ApiResponse<TData, TMeta = PaginationMeta> {
  code: number;
  message: string;
  data: TData;
  meta?: TMeta;
  success: boolean;
  time: string;
}
