import request from "~/utils/request";

export const login = ({
  user_name,
  password
}) => {
  return request({
    url: 'admin/login',
    method: 'post',
    data: {
      user_name,
      password
    }
  })
}

export const getUserList = ({
  offset,
  limit
}) => {
  return request({
    url: 'v1/users/list',
    method: 'get',
    params: {
      offset,
      limit
    }
  })
}

export const getUserCount = () => {
  return request({
    url: 'v1/users/count',
    method: 'get'
  })
}

export const getCityGuess = (
  type
) => {
  return request({
    url: 'v1/cities',
    method: 'get',
    params: {
      type
    }
  })
}

export const getRestaurants = ({
  latitude,
  longitude,
  offset,
  limit
}) => {
  return request({
    url: 'shopping/restaurants',
    method: 'get',
    params: {
      latitude,
      longitude,
      offset,
      limit
    }
  })
}

export const getResCount = () => {
  return request({
    url: 'shopping/restaurants/count',
    method: 'get'
  })
}

export const getResCategory = () => {
  return request({
    url: 'shopping/v2/restaurant/category',
    method: 'get'
  })
}

export const updateShop = (data = {}) => {
  return request({
    url: 'shopping/updateshop',
    method: 'post',
    data
  })
}

export const getFoodCount = () => {
  return request({
    url: 'shopping/v2/foods/count',
    method: 'get'
  })
}

export const getFoodsList = ({
  offset,
  limit
}) => {
  return request({
    url: 'shopping/v2/foods',
    method: 'get',
    params: {
      offset,
      limit
    }
  })
}

export const updateFood = (data = {}) => {
  return request({
    url: 'shopping/v2/updatefood',
    method: 'post',
    data
  })
}

export const getOrderList = ({
  offset,
  limit
}) => {
  return request({
    url: 'bos/orders',
    method: 'get',
    params: {
      offset,
      limit
    }
  })
}

export const getOrderCount = () => {
  return request({
    url: 'bos/orders/count',
    method: 'get'
  })
}

export const getAdminList = ({
  offset,
  limit
}) => {
  return request({
    url: "admin/all",
    method: 'get',
    params: {
      offset,
      limit
    }
  })
}

export const getAdiminCount = () => {
  return request({
    url: 'admin/count',
    method: 'get'
  })
}

export const getFoodsCategory = (params) => {
  return request({
    url: `shopping/getcategory/${params}`,
    method: 'get'
  })
}

export const addFoodsCategory = ({
  name,
  description,
  restaurant_id
}) => {
  return request({
    url: 'shopping/addcategory',
    method: 'post',
    data: {
      name,
      description,
      restaurant_id
    }
  })
}

export const addFoodsInfo = data => {
  return request({
    url: 'shopping/addfood',
    method: 'post',
    data
  })
}

export const searchAddress = (params={city_id,keyword,type})=>{
  return request({
    url:'/v1/pois',
    method:'get',
    params
  })
}

export const addShop = (data={})=>{
  return request({
    url:'shopping/addshop',
    method:'post',
    data
  })
}

export const getAllUserCount = ()=>{
  return request({
    url:'v1/users/count',
    method:'get'
  })
}

export const getNewUserCountDate = (date)=>{
  return request({
    url:`statis/user/${date}/count`,
    method:'get'
  })
}

export const getAllOrderCount = ()=>{
  return request({
    url:'bos/orders/count',
    method:'get'
  })
}

export const getNewOrderCountDate = (date) =>{
  return request({
    url:`statis/order/${date}/count`,
    method:'get'
  })
}

export const getAllAdminCount = ()=>{
  return request({
    url:'admin/count',
    method:'get'
  })
}

export const getNewAdminCountDate = (date) =>{
  return request({
    url:`statis/admin/${date}/count`,
    method:'get'
  })
}

export const getUserCity = ()=>{
  return request({
    url:'v1/user/city/count',
    method:'get'
  })
}

export const getUserInfo = ()=>{
  return request({
    url:'admin/info',
    method:'get'
  })
}

export const signout = ()=>{
  return request({
    url:'admin/signout',
    method:'get'
  })
}