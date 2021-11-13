import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'

const currentURL = '/tdx-1'

export function Attraction({ apiData }) {
  const [attractionData, setAttractionData] = useState([])
  // const [attractionIndex, setAttractionIndex] = useState(0)
  const attractionID = window.location.search.split('id=')[1]
  let tempIndex = 0

  const getAttractionData = () => {
    if (apiData.length === 0) return
    let [temp, tempIndex] = findFromApiData()
    // console.log([temp, tempIndex])
    setAttractionData(temp)
    console.log(temp)

    // setAttractionIndex(tempIndex)
  }
  const findFromApiData = () => {
    return [apiData.find((item, index) => {
      tempIndex = index
      return item.ID === attractionID
    }), tempIndex]
  }
  let imgHeight
  useEffect(() => {
    // imgHeight = document.querySelector('.logo-picture').offsetHeight
    // console.log(imgHeight)
    document.documentElement.scrollTop = 600
    getAttractionData()
    document.querySelector('.search-set-pin form').style.display = 'none'
    document.querySelector('.search-set-pin .mobile').style.display = 'none'
    return () => {
      document.querySelector('.search-set-pin form').style.display = 'grid'
      document.querySelector('.search-set-pin .mobile').style.display = 'grid'
    }
  }, [apiData])
  return (
    <div className="attraction">
      {attractionData.Picture ?
        <div className="img">
          <img src={attractionData.Picture.PictureUrl1} alt={attractionData.Name} />
        </div>
        : ''}
      <div className="r-title">{attractionData.Name}</div>
      <div className="tourism-tags">
        {attractionData.Level ? <span className="tourism-tag"># {attractionData.Level}</span> : ''}
        {attractionData.Class1 ? <span className="tourism-tag "># {attractionData.Class1}</span> : ''}
        {attractionData.Class2 ? <span className="tourism-tag "># {attractionData.Class2}</span> : ''}
        {attractionData.Class3 ? <span className="tourism-tag "># {attractionData.Class3}</span> : ''}
      </div>
      <div className="r-title-2">開放時間：</div>
      <div>{attractionData.OpenTime}</div>
      <div className="r-title-2">介紹：</div>
      <div>{attractionData.DescriptionDetail}</div>
      <div className="r-title-2">交通資訊：</div>
      {attractionData.Position ?
        <MapContainer id="mapid" center={[25.02, 121.56]} zoom={13} scrollWheelZoom={true}>
          <MyMap position={attractionData.Position} attractionData={attractionData} />
        </MapContainer>
        : ''
      }
      {attractionData.Phone ? <div className="r-title-2">聯絡電話：
        <a href={'tel:' + attractionData.Phone}>{attractionData.Phone}</a>
      </div> : ''}
      <PageBtn />
    </div>
  )
}

export function MyMap({ position, attractionData }) {
  const [mapPosition, setMapPosistion] = useState([25.02, 121.56])
  const map = useMap()
  useEffect(() => {
    if (position) {
      setMapPosistion([position?.PositionLat, position?.PositionLon])
      map.setView([position?.PositionLat, position?.PositionLon])
    }
  }, [position])
  return (
    <div>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={mapPosition}>
        <Popup>{attractionData?.Name}</Popup>
      </Marker>
    </div>
  )
}

export function PageBtn() {
  return (
    <div className="buttons">
      <div className="r-btn-outline" >&lt;&lt; 上一個</div>
      <Link to={`${currentURL}`} className="r-btn-outline" >回首頁</Link>
      <div className="r-btn-outline">下一個 &gt;&gt;</div>
    </div>
  )
}