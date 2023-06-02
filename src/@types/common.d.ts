interface BasePayload {
  token?: number;
  limit?: number;

  [key: string]: any;
}

interface BaseResponse<T = any> {
  data: T;
  message: string;
  ref: string | null;
  client?: boolean;
}

type ResponseList<T = any> = {
  data: T;
  totalCount: number;
};

interface Dictionary<T = any> {
  [key: string | number]: T;
}

interface KeyboardState {
  open: boolean;
  height: number;
}
