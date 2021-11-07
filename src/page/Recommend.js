import React, { useEffect } from 'react'

export default function Recommend({ restaurantData, acticityData, tourismData, hotelData }) {
  useEffect(() => {
    console.log(acticityData[0])

  }, [])
  return (
    <div className="Recommend">
      <section>
        <div className="title">
          <span className="r-title"><i className="fas fa-tag" style={{ transform: 'rotateY(180deg)' }}> </i> 近期活動報你知</span>
          <span className="r-a-tag">我想看更多活動 &gt;&gt;</span>
        </div>
        <div className="activity">
          <ActivityCard item={acticityData[0]} />
          <ActivityCard item={acticityData[1]} />
        </div>
      </section>

      <section>
        <div>
          <span className="r-title title"><i className="fas fa-camera"> </i> 熱門景點</span>
        </div>
        <div className="tourism">
          <TourismCard item={tourismData[0]} />
          <TourismCard item={tourismData[1]} />
          <TourismCard item={tourismData[2]} />
        </div>
      </section>

      <section>
        <div>
          <span className="r-title"><i className="fas fa-bed"></i> 推薦住宿</span>
        </div>
        <div className="hotel">
          <HotelCard item={hotelData[0]} />
          <HotelCard item={hotelData[2]} />
          <HotelCard item={hotelData[4]} />
        </div>
      </section>

      <section>
        <div>
          <span className="r-title"><i className="fas fa-utensils"></i> 吃吃喝喝</span>
        </div>
        <div className="hotel">
          <HotelCard item={restaurantData[0]} />
          <HotelCard item={restaurantData[1]} />
          <HotelCard item={restaurantData[2]} />
        </div>
      </section>
      <div className="hint">
        <div>
          滑到底了唷，
        </div>
        <div>
          要不要試試看用關鍵字搜尋呢？
        </div>
      </div>
    </div>
  )
}



export function ActivityCard({ item }) {
  return (
    <a href={item?.WebsiteUrl} target="_blank" className="r-card card">
      <div className="img">
        <img src={item?.Picture?.PictureUrl1} alt={item?.Name} />
      </div>
      <div className="text">
        <div className="r-title">{item?.Name}</div>
        <span>{item?.StartTime.substring(0, 10).replaceAll('-', '.')}</span> -
        <span>{item?.EndTime.substring(0, 10).replaceAll('-', '.')}</span>
        <div><i className="fas fa-map-marker-alt"></i> {item?.Location}</div>
        <div className="r-btn">活動詳情</div>
      </div>
    </a>
  )
}

export function TourismCard({ item }) {
  return (
    <div className="tourism-card active-card">
      <div className="img">
        <img src={item?.Picture.PictureUrl1} alt={item?.Name} />
      </div>
      <div className="text">
        <div className="r-title title">{item?.Name}</div>
        {item?.Address ? <div><i className="fas fa-map-marker-alt"></i>{item?.Address}</div> : ''}
        <div className="DescriptionDetail">
          <div className="tourism-tags">
            {item?.Level ? <span className="tourism-tag"># {item?.Level}</span> : ''}
            {item?.Class1 ? <span className="tourism-tag "># {item?.Class1}</span> : <span className="tourism-tag "># 未分類</span>}
            {item?.Class2 ? <span className="tourism-tag "># {item?.Class2}</span> : ''}
            {item?.Class3 ? <span className="tourism-tag "># {item?.Class3}</span> : ''}
          </div>
          {item?.DescriptionDetail.substring(0, 76)}... &emsp;
          <span className="r-a-tag">more >></span>
        </div>
      </div>
    </div>
  )
}

export function HotelCard({ item }) {
  return (
    <a href={item?.WebsiteUrl} target="_blank" className="r-card card">
      <div className="img">
        <img src={item?.Picture.PictureUrl1} atl={item?.Name} />
      </div>
      <div className="text">
        <div className="r-title title">{item?.Name}</div>
        <div><i className="fas fa-map-marker-alt"></i> {item?.Address}</div>
      </div>
    </a>
  )
}