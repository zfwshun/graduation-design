import request from '@/utils/request'

export const searchArticle = function (obj) {
  return request.get('acquisition/search_article', { params: obj })
}
