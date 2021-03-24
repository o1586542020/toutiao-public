// 引入请求模块
import request from '@/utils/request.js'

export const Aticle = params => {
    return request({
        url:'/mp/v1_0/articles',
        method:'get',
        params
    })
}

export const getpindao = () => {
     return request({
         url:'/mp/v1_0/channels',
         methods:'GET',
         
     })
}

// 删除文章
export const deletearticle = articleId => {
    return request({
        url:`/mp/v1_0/articles/${articleId}`,
        method:'delete'
    })
}

//  发表文章
export const addArticle = (data,draft=false) => {
    return request({
      method: 'POST',
      url: '/mp/v1_0/articles',
      params: {
        draft // 是否存为草稿（true 为草稿）
      },
      data
    })
  }
  
  //获取指定文章
  export const oneArticle = target => {
    return request({
      method: 'get',
      url: `/mp/v1_0/articles/${target}`,
    })
  }

   //修改文章
   export const xiuArticle = (target,data,draft) => {
    return request({
      method: 'put',
      url: `/mp/v1_0/articles/${target}`,
      data,
      params: {
        draft
      }
     
    })
  }

  // 修改评论状态
  export const xiucomment =(articleid,allowcomment) => {
    return request({
      method: 'put',
      url: 'mp/v1_0/comments/status',
      params:{
        article_id:articleid
      },  
      data:{
        allow_comment:allowcomment
      }
    })
  }