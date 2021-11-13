import { beautifulPictures } from './HomePictures'

export function transToEn(nameCn) {
  return beautifulPictures.filter(item => { return item.cn === nameCn })[0].nameForAPI
}
export function valueToEn(nameCn) {
  return beautifulPictures.filter(item => { return item.value === nameCn })[0].nameForAPI
}
export function valueToCn(nameCn) {
  return beautifulPictures.filter(item => { return item.value === nameCn })[0].cn
}