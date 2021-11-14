import React, { useState, useEffect } from 'react'
import { getTourismAPI, getActivityAPI, getHotelAPI, getRestaurantAPI } from './function/getTourismAPI'
import ScrollToTop from './svg/ScrollToTop'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Attraction } from './page/Attraction'
import Recommend from './page/Recommend'
import { beautifulPictures } from './function/HomePictures'
import { scrollListener, topFunction } from './function/ScrollListener'
import { WanWhereLogo } from './svg/rrsvg'
import TaiwanMap from './page/TaiwanMap'

const currentURL = '/tdx-1'
export default function WanWhere() {
  const [apiData, setApiData] = useState([])
  const [acticityData, setActicityData] = useState([])
  const [hotelData, setHotelData] = useState([])
  const [restaurantData, setRestaurantData] = useState([])
  const [selectCity, setSelectCity] = useState('Taipei')
  const [findWhat, setFindWhat] = useState('view')
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const [beautifulPicture, setBeautifulPicture] = useState([])
  // const beautifulPicture = beautifulPictures[1]
  const handleSelectCity = (e) => {
    // console.log(e.target.value)
    setSelectCity(e.target.value)
  }
  const handleChangeFind = (e) => {
    // console.log(e.target.value)
    setFindWhat(e.target.value)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    switch (findWhat) {
      case 'view':
        navigate(currentURL + '/search-view')
        getTourismAPI(selectCity).then(result => {
          if (keyword.replace(' ') !== '') {
            result = result.filter(e => e.Name.includes(keyword))
          }
          setApiData(result)
        })
        break

      case 'hotel':
        navigate(currentURL + '/search-hotel')
        getHotelAPI(selectCity).then(result => {
          if (keyword.replace(' ') !== '') {
            result = result.filter(e => e.Name.includes(keyword))
          }
          console.log(result)
          setHotelData(result)
        })
        break
      case 'food':
        navigate(currentURL + '/search-food')
        getRestaurantAPI(selectCity).then(result => {
          if (keyword.replace(' ') !== '') {
            result = result.filter(e => e.Name.includes(keyword))
          }
          console.log(result)
          setRestaurantData(result)
        })
        break
      case 'activity':
        navigate(currentURL + '/search-restaurant')
        getActivityAPI(selectCity).then(result => {
          if (keyword.replace(' ') !== '') {
            result = result.filter(e => e.Name.includes(keyword))
          }
          console.log(result)
          setActicityData(result)
        })
        break


      default:
        break
    }


  }

  const apiFunctions = {
    tourism: function () {
      if (sessionStorage.getItem('tourismData')) {
        setApiData(JSON.parse(sessionStorage.getItem('tourismData')))
        return
      }
      getTourismAPI(selectCity).then(result => {
        setApiData(result)
      })
    },
    activity: function () {
      if (sessionStorage.getItem('activityData')) {
        setActicityData(JSON.parse(sessionStorage.getItem('activityData')))
        return
      }
      getActivityAPI('Taipei').then(result => {
        setActicityData(result)
      })
    },
    hotel: function () {
      if (sessionStorage.getItem('hotelData')) {
        console.log('hotelData, from session: ')
        setHotelData(JSON.parse(sessionStorage.getItem('hotelData')))
        return
      }
      getHotelAPI('Taipei').then(result => {
        // console.log(result)
        console.log('hotelData, fetch api')
        setHotelData(result)
      })
    },
    restaurant: function () {
      if (sessionStorage.getItem('restaurantData')) {
        console.log('restaurantData, from session: ')
        setRestaurantData(JSON.parse(sessionStorage.getItem('restaurantData')))
        return
      }
      getRestaurantAPI('NantouCounty').then(result => {
        console.log('restaurantData, fetch api')
        setRestaurantData(result)
      })
    }
  }


  const rndBeautifulPic = () => {
    console.log(Math.floor(Math.random() * 6))
    setBeautifulPicture(beautifulPictures[Math.floor(Math.random() * 6)])
  }
  useEffect(() => {
    topFunction()
    apiFunctions.tourism()
    apiFunctions.activity()
    apiFunctions.hotel()
    apiFunctions.restaurant()

    rndBeautifulPic()
  }, [])

  return (
    <div className="WanWhere">
      <ScrollToTop />
      <LogoPicture beautifulPicture={beautifulPicture} />
      <SearchSet
        keyword={keyword}
        setKeyword={setKeyword}
        handleSearch={handleSearch}
        handleSelectCity={handleSelectCity}
        handleChangeFind={handleChangeFind}
        findWhat={findWhat} />
      <SearchSetPin
        keyword={keyword}
        setKeyword={setKeyword}
        handleSelectCity={handleSelectCity}
        handleChangeFind={handleChangeFind}
        findWhat={findWhat}
        handleSearch={handleSearch} />
      <Routes>
        <Route path={`${currentURL}`} exact element={
          <Recommend
            acticityData={acticityData}
            hotelData={hotelData}
            tourismData={apiData}
            restaurantData={restaurantData} />} />
        <Route path={`${currentURL}/search-view`} element={<CardsContainer apiData={apiData} />} />
        <Route path={`${currentURL}/search-hotel`} element={<HotelCardsContainer hotelData={hotelData} />} />
        <Route path={`${currentURL}/search-food`} element={<HotelCardsContainer hotelData={restaurantData} />} />
        <Route path={`${currentURL}/search-restaurant`} element={<HotelCardsContainer hotelData={acticityData} />} />
        <Route path={`${currentURL}/attraction`} element={<Attraction apiData={apiData} />} />
        <Route path={`${currentURL}/taiwanmap`} element={<TaiwanMap apiData={apiData} />} />
      </Routes>
    </div>
  )
}

export function LogoPicture({ beautifulPicture }) {

  return (
    <div className="logo-picture" >
      <img src={`${beautifulPicture.pictureUrl}`} alt="view-picture" />
      <div>
        <a href={currentURL} >
          <img src={currentURL + "/image/Logo.png"} alt="灣去哪兒？" />
        </a>
        <h1>{beautifulPicture.pictureName}</h1>
        <div className="subtitle">
          <Link to={`${currentURL}` + '/taiwanmap?city=' + beautifulPicture.value}
            style={{
              color: 'white',
              textShadow: '0 0 grey',
              fontWeight: 'bold'
            }}>
            {beautifulPicture.cn}去哪兒？>>
          </Link>
        </div>
      </div>
      <div> </div>
    </div>
  )
}

export function SearchSet({ keyword, setKeyword, handleSearch, handleSelectCity, handleChangeFind, findWhat }) {
  return (
    <div className="search-set">
      <div className="desktop">
        <input type="radio" name="find" id="view" value="view" onChange={handleChangeFind} checked={findWhat === 'view'} />
        <label htmlFor="view"><span></span>找景點</label>
          &emsp;&emsp;
          <input type="radio" name="find" id="hotel" value="hotel" onChange={handleChangeFind} checked={findWhat === 'hotel'} />
        <label htmlFor="hotel"><span></span>找飯店</label>
          &emsp;&emsp;
          <input type="radio" name="find" id="food" value="food" onChange={handleChangeFind} checked={findWhat === 'food'} />
        <label htmlFor="food"><span></span>找美食</label>
          &emsp;&emsp;
          <input type="radio" name="find" id="activity" value="activity" onChange={handleChangeFind} checked={findWhat === 'activity'} />
        <label htmlFor="activity"><span></span>找活動</label>
      </div>
      <div className="mobile">
        <label htmlFor="view" className={findWhat === 'view' ? "reflect" : ""}><i className="fas fa-camera"></i> 找景點</label>
        <label htmlFor="hotel" className={findWhat === 'hotel' ? "reflect" : ""}><i className="fas fa-bed"></i> 找飯店</label>
        <label htmlFor="food" className={findWhat === 'food' ? "reflect" : ""}><i className="fas fa-utensils"></i> 找美食</label>
        <label htmlFor="activity" className={findWhat === 'activity' ? "reflect" : ""}><i className="fas fa-tag" style={{ transform: 'rotateY(180deg)' }}></i> 找活動</label>
      </div>
      <form>
        <select className="selectCity" name="City" onChange={handleSelectCity} >
          <option value="Taipei"> 臺北市  </option>
          <option value="NewTaipei"> 新北市  </option>
          <option value="Taoyuan"> 桃園市  </option>
          <option value="Taichung"> 臺中市  </option>
          <option value="Tainan"> 臺南市  </option>
          <option value="Kaohsiung"> 高雄市  </option>
          <option value="Keelung"> 基隆市  </option>
          <option value="Hsinchu"> 新竹市  </option>
          <option value="HsinchuCounty"> 新竹縣  </option>
          <option value="MiaoliCounty"> 苗栗縣  </option>
          <option value="ChanghuaCounty"> 彰化縣  </option>
          <option value="NantouCounty"> 南投縣  </option>
          <option value="YunlinCounty"> 雲林縣  </option>
          <option value="ChiayiCounty"> 嘉義縣  </option>
          <option value="Chiayi"> 嘉義市  </option>
          <option value="PingtungCounty"> 屏東縣  </option>
          <option value="YilanCounty"> 宜蘭縣  </option>
          <option value="HualienCounty"> 花蓮縣  </option>
          <option value="TaitungCounty"> 臺東縣  </option>
          <option value="KinmenCounty"> 金門縣  </option>
          <option value="PenghuCounty"> 澎湖縣  </option>
          <option value="LienchiangCounty"> 連江縣  </option>
        </select>
        <input value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onSubmit={handleSearch}
          type="text" placeholder="或用關鍵字搜尋想去哪玩？" />
        <button onClick={handleSearch} className="btn"><i className="fas fa-search"></i>&emsp;搜 尋</button>
      </form>
    </div>
  )
}

export function SearchSetPin({ keyword, setKeyword, handleSearch, handleSelectCity, handleChangeFind, findWhat }) {
  const [advanceSearch, setAdvanceSearch] = useState(false)
  const handleAdvanceBtn = () => {
    setAdvanceSearch(!advanceSearch)
    document.querySelector('#mask').classList.toggle('show')
  }
  useEffect(() => {
    scrollListener()
  }, [])
  return (
    <div className="search-set-pin">
      <Link to={`${currentURL}`}>
        <WanWhereLogo />
      </Link>
      <div className={advanceSearch === true ? "mobile show" : "mobile"}>
        <label htmlFor="view" className={findWhat === 'view' ? "reflect" : ""}><i className="fas fa-camera"></i> 找景點</label>
        <label htmlFor="hotel" className={findWhat === 'hotel' ? "reflect" : ""}><i className="fas fa-bed"></i> 找飯店</label>
        <label htmlFor="food" className={findWhat === 'food' ? "reflect" : ""}><i className="fas fa-utensils"></i> 找美食</label>
        <label htmlFor="activity" className={findWhat === 'activity' ? "reflect" : ""}><i className="fas fa-tag" style={{ transform: 'rotateY(180deg)' }}></i> 找活動</label>
      </div>
      <form onSubmit={handleSearch} className={advanceSearch ? "advanceSearch-style" : ""}>
        <select className={advanceSearch === true ? "selectCity show" : "selectCity"} name="City" onChange={handleSelectCity} >
          <option value="Taipei"> 臺北市  </option>
          <option value="NewTaipei"> 新北市  </option>
          <option value="Taoyuan"> 桃園市  </option>
          <option value="Taichung"> 臺中市  </option>
          <option value="Tainan"> 臺南市  </option>
          <option value="Kaohsiung"> 高雄市  </option>
          <option value="Keelung"> 基隆市  </option>
          <option value="Hsinchu"> 新竹市  </option>
          <option value="HsinchuCounty"> 新竹縣  </option>
          <option value="MiaoliCounty"> 苗栗縣  </option>
          <option value="ChanghuaCounty"> 彰化縣  </option>
          <option value="NantouCounty"> 南投縣  </option>
          <option value="YunlinCounty"> 雲林縣  </option>
          <option value="ChiayiCounty"> 嘉義縣  </option>
          <option value="Chiayi"> 嘉義市  </option>
          <option value="PingtungCounty"> 屏東縣  </option>
          <option value="YilanCounty"> 宜蘭縣  </option>
          <option value="HualienCounty"> 花蓮縣  </option>
          <option value="TaitungCounty"> 臺東縣  </option>
          <option value="KinmenCounty"> 金門縣  </option>
          <option value="PenghuCounty"> 澎湖縣  </option>
          <option value="LienchiangCounty"> 連江縣  </option>
        </select>
        <input value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onSubmit={handleSearch}
          type="text" placeholder="打打關鍵字吧！" />
        <div>
          <button type="button" className="r-btn btn advance" onClick={handleAdvanceBtn} >{advanceSearch === true ? '取消' : '進階搜尋'}</button>
          <button onClick={handleSearch} className="r-btn btn"><i className="fas fa-search"></i>&emsp;搜 尋</button>
        </div>
      </form>
    </div >
  )
}

export function CardsContainer({ apiData }) {
  const [pageCount, setPageCount] = useState([])
  const [nowPage, setNowPage] = useState(1)
  const [onePage, setOnePage] = useState(apiData.slice(0, 15))
  const [pagePage, setPagePage] = useState([])
  const [pagePageCount, setPagePageCount] = useState(0)
  useEffect(() => {
    const count = Math.floor(apiData.length / 15) + 1
    const countArray = [...Array(count).keys()]
    let tempPageCount = [...countArray.slice(1, countArray.length), countArray.length]
    setPageCount(tempPageCount)
    setOnePage(apiData.slice(0, 15))
    setNowPage(1)
    setPagePage(tempPageCount.slice(0, 10))
  }, [apiData])
  const handleClickPage = (e) => {
    const tempNumber = Number(e.target.getAttribute('value'))
    setNowPage(tempNumber)
    setOnePage(apiData.slice((tempNumber - 1) * 15, (tempNumber - 1) * 15 + 15))
    document.documentElement.scrollTop = 400
  }
  const handlePrePagesList = () => {
    setNowPage((pagePageCount - 1) * 10 + 1)
    setPagePage(pageCount.slice((pagePageCount - 1) * 10, (pagePageCount) * 10))

    // 換內容
    setOnePage(apiData.slice(((pagePageCount - 1) * 10) * 15, ((pagePageCount - 1) * 10) * 15 + 15))
    document.documentElement.scrollTop = 400

    setPagePageCount(ppc => ppc - 1)
  }
  const handleNextPagesList = () => {
    setNowPage((pagePageCount + 1) * 10 + 1)
    setPagePage(pageCount.slice((pagePageCount + 1) * 10, (pagePageCount + 2) * 10))

    // 換內容
    setOnePage(apiData.slice(((pagePageCount + 1) * 10) * 15, ((pagePageCount + 1) * 10) * 15 + 15))
    document.documentElement.scrollTop = 400

    setPagePageCount(ppc => ppc + 1)
  }
  return (
    <div className="tourism-card-container">
      {onePage.map((item, index) => {
        return (
          <div key={index}>
            <Link to={`${currentURL}/attraction?id=${item.ID}`}
              className="tourism-card" >
              <div className="img">
                <img src={item.Picture.PictureUrl1} alt={item.Name} />
              </div>
              <div className="text">
                <div className="r-title title">{item.Name}</div>
                <div className="DescriptionDetail">
                  <div className="tourism-tags">
                    {item.Level ? <span className="tourism-tag"># {item.Level}</span> : ''}
                    {item.Class1 ? <span className="tourism-tag "># {item.Class1}</span> : <span className="tourism-tag "># 未分類</span>}
                    {item.Class2 ? <span className="tourism-tag "># {item.Class2}</span> : ''}
                    {item.Class3 ? <span className="tourism-tag "># {item.Class3}</span> : ''}
                  </div>

                  {item.DescriptionDetail.substring(0, 76)}
                  ... &emsp;
                <span className="r-a-tag">
                    more >>
                </span>
                </div>
              </div>
            </Link>
          </div>
        )
      })}
      <div className="pageination">
        <div className={nowPage <= 10 ? "hide" : ""}
          onClick={handlePrePagesList}><i className="fas fa-angle-double-left"></i></div>
        {pagePage.map((item) => {
          return (
            <div key={item} className={nowPage == item ? "reflect" : ""}
              onClick={handleClickPage}
              value={item}>{item}</div>
          )
        })}
        <div onClick={handleNextPagesList}
          className={pagePage.length < 10 ? "hide" : ""}><i className="fas fa-angle-double-right"></i></div>
      </div>
    </div>
  )
}

export function HotelCardsContainer({ hotelData }) {
  const top15 = hotelData.slice(0, 15)
  return (
    <div className="tourism-card-container hotel">
      {top15.map((item, index) => {
        return (
          <a key={index} href={item?.WebsiteUrl} target="_blank" rel="noreferrer" className="r-card card">
            <div className="img">
              <img src={item?.Picture.PictureUrl1 ? item?.Picture.PictureUrl1 : 'https://cdn.pixabay.com/photo/2020/01/04/18/40/trees-4741364_960_720.png'} atl={item?.Name} />
            </div>
            <div className="text">
              <div className="r-title title">{item?.Name}</div>
              <div><i className="fas fa-map-marker-alt"></i> {item?.Address}</div>
            </div>
          </a>
        )
      })}
    </div>
  )
}