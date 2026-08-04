export interface IMetaPagination {
  totalPages: number;
  totalData: number;
  totalDataPerPage: number;
  page: number;
  limit: number;
}

export interface IResponseEntity<T = unknown> {
  code: number;
  status: boolean;
  message: string;
  data?: T;
  meta?: IMetaPagination;
}
