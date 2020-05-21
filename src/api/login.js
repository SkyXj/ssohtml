import request from '@/utils/request'

// 查询登录日志列表
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}