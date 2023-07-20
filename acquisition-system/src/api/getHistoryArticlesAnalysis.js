import request from '@/utils/request'

export const getHistoryArticlesAnalysis = function (name) {
  return request.get('analysis/history_articles_analysis', { params: { name } })
}
