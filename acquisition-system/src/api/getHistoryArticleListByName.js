import request from '@/utils/request'

export const getHistoryArticleListByName = function ({ name, page }) {
  return request.get(`acquisition/history_article_list/${name}/${page}`)
}
