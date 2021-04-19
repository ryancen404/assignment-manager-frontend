
export interface BaseResponse<T = unknown> {
  // 业务状态码 0 失败 1 成功
  code: 0 | 1,
  message: string,
  content: T | null
}