import request from '@/utils/request'

export function getTotalMoney(data) {
  return request({
    url: '/account/getTotalMoney',
    method: 'get',
  })
}


export function updateWish(data) {
  return request({
    url: '/wish/updateWish',
    method: 'post',
    data
  })
}

export function addWish(data) {
  return request({
    url: '/wish/addWish',
    method: 'post',
    data
  })
}


export function listWish(data) {
  return request({
    url: '/wish/listWish',
    method: 'post',
    data
  })
}

export function addClassify(data) {
  return request({
    url: '/classify/addClassify',
    method: 'post',
    data
  })
}

export function getClassifyByIdOrParentId(data) {
  return request({
    url: '/classify/getByIdOrParentId',
    method: 'post',
    data
  })
}

export function addOneExpand(data) {
  return request({
    url: '/bussiness/addOneExpand',
    method: 'post',
    data
  })
}

export function tranferAccount(data) {
  return request({
    url: '/bussiness/tranferAccount',
    method: 'post',
    data
  })
}

export function addOneIncome(data) {
  return request({
    url: '/bussiness/addOneIncome',
    method: 'post',
    data
  })
}

export function fetchList(data) {
  return request({
    data,
    url: '/cousumeItem/listCousumeItem',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function accountList(data) {
  return request({
    data,
    url: '/account/listAccount',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function listWishAccount(data) {
  return request({
    url: '/account/listWishAccount',
    method: 'post',
    data
  })
}

export function getAccountByIdOrParentId(data) {
  return request({
    url: '/account/getAccountByIdOrParentId',
    method: 'post',
    data
  })
}

export function listAccountByGroup(data) {
  return request({
    url: '/account/listAccountByGroup',
    method: 'post',
    data
  })
}

export function listAccountByGroupSelect(data) {
  return request({
    url: '/account/listAccountByGroupSelect',
    method: 'post',
    data
  })
}


export function classifyList(data) {
  return request({
    data,
    url: '/classify/listClassify',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function relationList(data) {
  return request({
    data,
    url: '/relation/listRelation',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function merchantList(data) {
  return request({
    data,
    url: '/merchant/listMerchant',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function projectList(data) {
  return request({
    data,
    url: '/project/listProject',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//分组展示分类
export function classifyByGroup(data) {
  return request({
    data,
    url: '/classify/listClassifyByGroup',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//分类统计支出
export function listConsumeItemGroupAndOrder(data) {
  return request({
    data,
    url: '/cousumeItem/listConsumeItemGroupAndOrder',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


//分类统计支出(饼图)
export function listConsumeItemGroupAndOrderCake(data) {
  return request({
    data,
    url: '/cousumeItem/listConsumeItemGroupAndOrderCake',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//分类统计支出(折线图)
export function listConsumeItemBrokenLine(data) {
  return request({
    data,
    url: '/cousumeItem/listConsumeItemBrokenLine',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
