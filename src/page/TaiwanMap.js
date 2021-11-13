import React, { useEffect, useState } from 'react'
import { TaiwanMapSvg } from '../svg/rrsvg'
import { TaiwanZipcode } from '../function/ZipcodeTable'
import { valueToEn, valueToCn } from '../function/countryNameTransfer'
import { getTourismAPI } from '../function/getTourismAPI'
import { Link } from 'react-router-dom'

const currentURL = '/tdx-1'
export default function TaiwanMap({ apiData }) {
  const toColor = (city) => {
    const cityPath = document.getElementById(city)
    cityPath.style.fillOpacity = 1
    cityPath.style.strokeWidth = '3px'
    const rect = cityPath.getBoundingClientRect()
    const rectCenter = [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2]

    // console.log(cityPath.parentElement.parentElement)
    const pareRect = cityPath.parentElement.getBoundingClientRect()
    const pareRectCenter = [(pareRect.left + pareRect.right) / 2, (pareRect.top + pareRect.bottom) / 2]

    const x = pareRectCenter[0] - rectCenter[0]
    const y = pareRectCenter[1] - rectCenter[1]

    cityPath.parentElement.style.transform = `translateX(${x}px) translateY(${y}px)`
    cityPath.parentElement.parentElement.style.transformOrigin = `center`
    cityPath.parentElement.parentElement.style.transform = 'scale(1.7)'
  }
  const [mapSearchData, setMapSearchData] = useState([])
  const [city, setCity] = useState('臺北市')
  useEffect(() => {
    const url = window.location.href
    // console.log(url.split('city=')[1])
    let cityNameforAPI = valueToEn(url.split('city=')[1])
    console.log(cityNameforAPI)
    let cnName = valueToCn(url.split('city=')[1])
    setCity(cnName)

    // setMapSearchData(JSON.parse(sessionStorage.getItem('tourismData')))
    // toColor(url.split('city=')[1])

    getTourismAPI(cityNameforAPI).then(result => {
      console.log(result[0])
      setMapSearchData(result)
    }).then(() => {
      toColor(url.split('city=')[1])
    })

  }, [])
  const [zipCode, setZipCode] = useState('114')
  const handleClickDistrict = (e) => {
    setZipCode(e.target.getAttribute('zip'))
  }
  return (
    <div className="TaiwanMap">
      <TaiwanMapSvg />
      <div className="district-view-list">
        <DistrictList city={city} handleClickDistrict={handleClickDistrict} zipCode={zipCode} setZipCode={setZipCode} />
        <ViewList apiData={mapSearchData} zipCode={zipCode} />
      </div>
    </div>
  )
}

export function DistrictList({ city, handleClickDistrict, zipCode, setZipCode }) {
  const [districtList, setDistrictList] = useState([])
  useEffect(() => {
    let temp = TaiwanZipcode.filter(item => { return item.name === city })[0].districts
    setDistrictList(temp)
    setZipCode(temp[0].zip)
  }, [city])
  return (
    <div className="DistrictList">
      {districtList.map((item) => {
        return (
          <div key={item.zip}
            zip={item.zip}
            name={item.name}
            className={"district r-btn " + (item.zip === zipCode ? "active" : "")}
            onClick={handleClickDistrict}
          >
            {item.name}
            {item.zip === zipCode ? <i className="fas fa-angle-double-right" style={{ color: 'white', marginLeft: '5px' }}></i> : ""}
          </div>
        )
      })}
    </div>
  )
}

export function ViewList({ apiData, zipCode }) {
  // const listData = apiData.slice(0, 12)
  const [listData, setListData] = useState([])
  useEffect(() => {
    if (!apiData) return
    setListData(apiData.filter(item => { return item.ZipCode === zipCode }).slice(0, 12))
    console.log(apiData.filter(item => { return item.ZipCode === zipCode })[0])
  }, [zipCode, apiData])
  return (
    <div className="ViewList r-card">
      {listData?.map((item, index) => {
        return (
          <div key={index}>
            <Link to={`${currentURL}/attraction?id=${item.ID}`}><i className="fas fa-circle" style={{ transform: 'scale(0.6)', marginRight: '5px' }}></i>
              {item.Name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}