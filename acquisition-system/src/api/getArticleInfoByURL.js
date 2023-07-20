import request from '@/utils/request'

export const getArticleInfoByURL = function (url) {
  return request.get('acquisition/article_info', { params: { url } })
}
