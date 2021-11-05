import React, { useState, useEffect } from 'react'
import { getTourismAPI } from './function/getTourismAPI'
import ScrollToTop from './svg/ScrollToTop'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

const currentURL = '/tdx-1'
export default function WanWhere() {
  const [apiData, setApiData] = useState([])
  const [selectCity, setSelectCity] = useState('Taipei')
  const [findWhat, setFindWhat] = useState('view')
  const [keyword, setKeyword] = useState('')
  const beautifulPicture = {
    cn: '南投',
    pictureName: 'NANTOU',
    pictureUrl: 'https://i.imgur.com/GwUpUVl.jpg',
  }
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
    // console.log('searching...')
    getTourismAPI(selectCity).then(result => {
      // console.log(result)
      if (keyword.replace(' ') !== '') {
        result = result.filter(e => e.Name.includes(keyword))
      }
      setApiData(result)
    })
  }
  useEffect(() => {
    if (sessionStorage.getItem('tourismData')) {
      console.log('from session: ')
      // console.log(JSON.parse(sessionStorage.getItem('tourismData')))
      setApiData(JSON.parse(sessionStorage.getItem('tourismData')))
      return
    }
    getTourismAPI(selectCity).then(result => {
      // console.log(result)
      console.log('fetch api')
      setApiData(result)
    })
  }, [])
  return (
    <div className="WanWhere">
      <ScrollToTop />
      <LogoPicture beautifulPicture={beautifulPicture} />
      <SearchSet
        keyword={keyword}
        setKeyword={setKeyword}
        handleSearch={handleSearch} handleSelectCity={handleSelectCity} handleChangeFind={handleChangeFind} findWhat={findWhat} />
      <Router>
        <Routes>
          <Route path={`${currentURL}`} exact element={<CardsContainer apiData={apiData} />} />
          <Route path={`${currentURL}/attraction`} element={<Attraction apiData={apiData} />} />
        </Routes>
      </Router>
    </div>
  )
}

export function LogoPicture({ beautifulPicture }) {
  return (
    <div className="logo-picture"
      style={{
        background: 'url(' + beautifulPicture.pictureUrl + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      <a href={currentURL} >
        <img src="./image/Logo.png" alt="灣去哪兒？" />
      </a>
      <h1>{beautifulPicture.pictureName}</h1>
      <div className="subtitle">
        <a href="./" style={{ color: 'white' }}>
          {beautifulPicture.cn}去哪兒？>>
        </a>
      </div>
    </div>
  )
}

export function SearchSet({ keyword, setKeyword, handleSearch, handleSelectCity, handleChangeFind, findWhat }) {
  return (
    <div className="search-set">
      <div>
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
        <button onClick={handleSearch} className="btn"><i className="fas fa-search"></i>搜 尋</button>
      </form>
    </div>
  )
}

export function CardsContainer({ apiData }) {
  // useEffect(() => {
  //   console.log(apiData[0])
  // }, [])
  return (
    <div className="tourism-card-container">
      {apiData.map((item, index) => {
        return (
          <div key={index}>
            <Link to={`${currentURL}/attraction?id=${item.ID}`}
              className="tourism-card" >
              <div className="img">
                <img src={item.Picture.PictureUrl1} alt={item.Name} />
              </div>
              <div className="text">
                <div className="title">{item.Name}</div>
                <div className="DescriptionDetail">
                  <div className="tourism-tags">
                    {item.Level ? <span className="tourism-tag"># {item.Level}</span> : ''}
                    {item.Class1 ? <span className="tourism-tag "># {item.Class1}</span> : <span className="tourism-tag "># 未分類</span>}
                    {item.Class2 ? <span className="tourism-tag "># {item.Class2}</span> : ''}
                    {item.Class3 ? <span className="tourism-tag "># {item.Class3}</span> : ''}
                  </div>

                  {item.DescriptionDetail.substring(0, 76)}
                  ... &emsp;
                <span style={{ color: '#E7A600', textDecoration: 'underline' }}>
                    more >>
                </span>
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export function Attraction({ apiData }) {
  const [attractionData, setAttractionData] = useState([])
  const attractionID = window.location.search.split('id=')[1]
  const getAttractionData = () => {
    console.log(apiData.length)

    if (apiData.length === 0) return
    console.log(attractionID)
    let temp = apiData.find((item) => {
      return item.ID === attractionID
    })
    setAttractionData(temp)
  }
  useEffect(() => {
    getAttractionData()
  }, [apiData])
  return (
    <div className="attraction">
      {attractionData.Picture ?
        <div className="img">
          <img src={attractionData.Picture.PictureUrl1} alt={attractionData.Name} />
        </div>
        : ''}
      <div>{attractionData.Name}</div>
      <div>{attractionData.DescriptionDetail}</div>
    </div>
  )
}