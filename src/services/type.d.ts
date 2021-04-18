
export interface BaseResponse {
  // 业务状态码 0 失败 1 成功
  stateCode: 0 | 1,
  message: string,
  content: JSON
}