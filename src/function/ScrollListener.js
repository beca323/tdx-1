export const scrollListener = () => {
  let imgHeight = document.querySelector('.logo-picture').offsetHeight
  let scrollposition
  const getHeight = () => {
    scrollposition = window.scrollY
    if (scrollposition > imgHeight) {
      document.querySelector('.search-set-pin').classList.toggle('pinToTop')
      window.removeEventListener('scroll', getHeight)
      window.addEventListener('scroll', getHeightAgain)
    }
  }
  const getHeightAgain = () => {
    scrollposition = window.scrollY
    if (scrollposition < imgHeight) {
      document.querySelector('.search-set-pin').classList.toggle('pinToTop')
      window.removeEventListener('scroll', getHeightAgain)
      window.addEventListener('scroll', getHeight)
    }
  }
  window.addEventListener('scroll', getHeight)
}