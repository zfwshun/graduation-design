import request from '@/utils/request'

export const getUserInfo = function () {
  return request.get('user/get_user_info')
}
