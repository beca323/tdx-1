import React, { useEffect, useState } from 'react'
import { getTourismAPI } from './function/getTourismAPI'

export default function App() {
  const [apiData, setApiData] = useState([])
  const [selectCity, setSelectCity] = useState('Taipei')
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    if (sessionStorage.getItem('tourismData')) {
      // console.log('from session: ')
      // console.log(JSON.parse(sessionStorage.getItem('tourismData')))
      setApiData(JSON.parse(sessionStorage.getItem('tourismData')))
      return
    }
    getTourismAPI(selectCity).then(result => {
      // console.log(result)
      setApiData(result)
    })
  }, [selectCity])

  const handleSelectCity = (e) => {
    // console.log(e.target.value)
    setSelectCity(e.target.value)
  }
  const handleSearchCity = (e) => {
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

  return (
    <div className="App">
      <form className="searchSetting" onSubmit={handleSearchCity} >
        <span>地區：</span>
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
        <span>共  {apiData.length}  筆資料</span>
        <input type="text" className="r-input-text" placeholder="輸入關鍵字" value={keyword} onChange={e => setKeyword(e.target.value)} />
        <input type="submit" value="搜尋" />
      </form>
      <div className="cardsContainer">
        {apiData.map((item, index) => {
          return (
            <div key={index} className="tourism-card" >
              <div>{item.Name}</div>
              <div className="category">
                {item.Class1 ? item.Class1 : '未分類'}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
