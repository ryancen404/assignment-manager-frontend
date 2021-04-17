export interface BaseResponse {
  // 0 失败 1 成功
  stateCode: 0 | 1,
  message: string,
  data: JSON
}