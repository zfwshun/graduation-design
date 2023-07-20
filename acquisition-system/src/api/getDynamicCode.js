import request from '@/utils/request'

export const getDynamicCode = function (email) {
  return request.get('user/dynamic_code', { params: { email } })
}
