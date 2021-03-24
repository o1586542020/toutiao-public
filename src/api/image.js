import request from '@/utils/request'

export const uploadimage =data => {
  return request({
        url:'/mp/v1_0/user/images',
        method:'POST',
        data
    })
}