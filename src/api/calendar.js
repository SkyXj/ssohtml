import request from '@/utils/request'
// 增加
export function add(data) {
  return request({
    url: '/calendar',
    method: 'post',
    data:data
  })
}
// 删除
export function del(id) {
    return request({
      url: '/calendar/'+id,
      method: 'delete'
    })
  }
  // 修改
export function update(data) {
    return request({
      url: '/calendar',
      method: 'put',
      data:data
    })
  }

  // 当前月份
export function getCurr(params) {
    return request({
      url: '/calendar/list',
      method: 'get',
      params:params
    })
  }