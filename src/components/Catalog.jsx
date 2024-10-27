import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import Skeleton from './Skeleton';
import Analyzer from './Analyzer';

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [cardCount, setCardCount] = useState(10); 
  const [loading, setLoading] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [analyzer,setAnalyzer] = useState(false)
  const [analyzerData,setAnalyzerData] = useState([])

  const handleAnalyzer = ()=>{
    setAnalyzer(!analyzer)
  }

  async function analyzerFetch() {
    try{
      const response = await axios.post(
      `http://localhost:8080/api/parser/search?query=${searchQuery}`,
      {
        title: 'foo',
        body: 'bar',
        userId: 1
      },
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Basic ' + btoa('admin:admin') 
        }
      }
    );
    setAnalyzerData(response.data);
  }catch(error){
    console.error(error)
  }
  }

  const handleSearch = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`http://localhost:3001/api/search`, {
        params: {
          q: searchQuery,
        }
      });
      setProducts(response.data);
  } catch (error) {
    console.error('Ошибка при поиске товаров:', error);
  } finally {
    setLoading(false);
  }
};

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const elements = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.floor(Math.random() * 100) + 20;
      const top = Math.floor(Math.random() * 100);
      const left = Math.floor(Math.random() * 100);
      const delay = Math.random() * 10;

      elements.push(
        <div
          key={i}
          className="floating-element"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    setFloatingElements(elements);
  }, []);

  useEffect(() => {
    const handleMouseMove = e => {
      const { clientX, clientY } = e;

      const container = containerRef.current;
      const { width, height } = container.getBoundingClientRect();

      const x = clientX / width;
      const y = clientY / height;

      const gradient = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(175,255,153,1) 3%, rgba(141,254,119,1) 9%, rgba(91,223,64,1) 91%)`;
      container.style.background = gradient;
    };

    const container = containerRef.current;

    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className='background'>
      {floatingElements}
      <div className='catalog--input'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={()=>{
          handleSearch()
          analyzerFetch()
          }} className='search--btn'>Поиск</button>
        <select className='select'>
          <option value="default">По умолчанию</option>
          <option value="price_asc">По возрастанию цены</option>
          <option value="price_desc">По убыванию цены</option>
          <option value="name_asc">По алфавиту (А-Я)</option>
          <option value="name_desc">По алфавиту (Я-А)</option>
        </select>
        
        <button className='analyzer--button' onClick={()=>{
          handleAnalyzer()
          analyzerFetch()
        }}>{analyzer ? 
          'Перейти в парсер' :
            'Перейти в анализер'
        }</button>
      </div>
      
      {analyzer ? <Analyzer data={analyzerData}></Analyzer> : <div className='cards'>
        {loading ? (
          Array.from({ length: cardCount }).map((_, index) => (
            <div key={index} className="product-card">
              <Skeleton type="image" />
              <Skeleton type="title" />
              <Skeleton type="text" />
              <Skeleton type="text" />
            </div>
          ))
        ) : (
          products.map((product, index) => (
            <Card key={index} product={product} />
          ))
        )}
      </div>}
      
    </div>
  );
};

export default Catalog;