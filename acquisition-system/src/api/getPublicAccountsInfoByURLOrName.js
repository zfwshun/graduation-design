import request from '@/utils/request'

export const getPublicAccountsInfoByURLOrName = function (obj) {
  return request.get('acquisition/public_accounts_info', { params: obj })
}
