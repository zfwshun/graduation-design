import request from '@/utils/request'

export const getCommentInfoByURL = function (url) {
  return request.get('acquisition/comment_info', { params: { url } })
}
