import request from '@/utils/request'

export const login = function (info) {
  return request.post('user/login', info)
}
