import React, { useState, useEffect } from 'react'

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
      <div className="r-title-2">介紹：</div>
      <div>{attractionData.DescriptionDetail}</div>
      <div className="r-title-2">交通資訊：</div>
      <div className="buttons">
        <div className="r-btn-outline" >&lt;&lt; 上一個</div>
        <div className="r-btn-outline" >回首頁</div>
        <div className="r-btn-outline">下一個 &gt;&gt;</div>
      </div>
    </div>
  )
}