import request from '@/utils/request'

export const register = function (info) {
  return request.post('user/register', info)
}
