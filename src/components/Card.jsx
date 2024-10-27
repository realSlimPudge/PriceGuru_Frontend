import React from "react";

export default function Card({ product }) {
 
  return (
    <div className="product-card">
      <a href={product.href}>
        <div className="card--img__container">
          <img src={product.image} alt={product.name} draggable={false}/>
        </div>
        <div>
          <div className="prices"><div className="current">{product.price}</div>
          {product.oldPrice && <div className="worst"><del>{product.oldPrice}</del></div>}</div>
          <div className="card--desk">{product.brand}  {product.name}</div>
        </div>
        <div className="add--btn">
          <button>Добавить</button>
        </div>
      </a>
    </div>
  );
}