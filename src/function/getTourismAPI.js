import * as axios from 'axios'
import jsSHA from 'jssha'

// const TOURISM_API_URL = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON'
const TOURISM_API_URL = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/'
const ACTICITY_API_URL = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/'
const HOTEL_API_URL = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel/'
const RESTAURANT_API_URL = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/'

export function getTourismAPI(city) {
  return getAPIfunction(TOURISM_API_URL, city, 'tourismData')
}
export function getActivityAPI(city) {
  return getAPIfunction(ACTICITY_API_URL, city, 'activityData')
}
export function getHotelAPI(city) {
  return getAPIfunction(HOTEL_API_URL, city, 'hotelData')
}
export function getRestaurantAPI(city) {
  return getAPIfunction(RESTAURANT_API_URL, city, 'restaurantData')
}

function getAPIfunction(url, city, sessionName) {
  return axios(url + city, { headers: getAuthorizationHeader() })
    .then((response) => {
      sessionStorage.setItem(sessionName, JSON.stringify(response.data))
      console.log(response.data[0])
      return response.data
    })
    .catch((error) => {
      return 'error: ' + error
    })
}

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
  let AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"'
  return { 'Authorization': Authorization, 'X-Date': GMTString }
}

// 洧杰申請
// let AppID = '4ad9f73726a0409a9376afd2b59e59a7';
// let AppKey = 'iR-j7mJI1CY924a-xfd6vhXZciM';
