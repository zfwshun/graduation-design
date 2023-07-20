import request from '@/utils/request'

export const getArticleAnalysis = function (url) {
  return request.get('analysis/article_analysis', { params: { url } })
}
