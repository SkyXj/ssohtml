import request from '@/utils/request'

// 查询登录日志列表
export function test() {
  return request({
    url: '/test',
    method: 'get'
  })
}