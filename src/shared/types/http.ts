export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export type QueryCustomOptions = {
  enabled?: boolean;
};
