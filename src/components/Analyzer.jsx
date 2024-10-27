import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';


const Analyzer = ({data}) => {

  

  return(
    <div className='analyzer--container'>
      <div className='titles'>
        <div>Название</div>
        <div>Бренд</div>
        <div>Рейтинг</div>
        <div>Продавец</div>
        <div>Отзывы</div>
        <div>Название</div>
      </div>
      {data.products.map((el,i) => (
        <div key={i} className='analyzer--card'>
          <div>{el.name}</div>
          <div>{el.mainInfo.brand}</div>
          <div>{el.additionalInformation
.supplierRating}</div>
          <div>{el.additionalInformation
.seller}</div>
          <div>{el.mainInfo.feedbacks}</div>
<div><a href={el.url} target="_blank">{el.marketplace}</a></div>
        </div>
      ))}
    </div>
  )
}
  

export default Analyzer;