import React,{useState,useEffect,useRef} from "react";
export default function AboutInfo({aboutScroll,handleStartBtn}){

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleWheel = e => {
      if(aboutScroll){
      const delta = e.deltaY;
      const newScrollPosition = Math.min(Math.max(scrollPosition + delta * 0.01, 0), 2);
      setScrollPosition(newScrollPosition);
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel);


    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [scrollPosition,aboutScroll]);



  return (
    <div ref={containerRef} className="aboutinfo--container">
      <div className="aboutUs--overflow" style={{
         transform: `translateY(-${scrollPosition * 50}vh)`
        }}>
        <div className="about--us">
          <div className="aboutUs--title">О нас</div>
          <div className="aboutUs--desc">Мы — команда энтузиастов, специализирующаяся на анализе цен на товары в популярных маркетплейсах. Наш парсер собирает данные с ведущих торговых площадок, предоставляя вам доступ к самым выгодным предложениям. Мы стремимся сделать процесс покупок проще и выгоднее, помогая вам экономить время и деньги.</div>
        </div>
        <div className="ourAdventage"> 
        <div className="aboutUs--title" style={{fontSize:'48px'}}>Наши преимущества:</div>
          <div className="aboutUs--desc" style={{fontSize:'18px',height:'fit-content'}}>
            
          <p>
          <span>Точный анализ:</span> Наш парсер анализирует цены в режиме реального времени, обеспечивая вас актуальной информацией.
          </p>
          <br></br>
          <p>
            <span>Широкий ассортимент:</span> Мы охватываем товары из различных категорий, от электроники до товаров для дома.
          </p>
          <br></br>
          <p>
          <span>Простота использования:</span> Удобный интерфейс позволяет легко находить и          сравнивать цены.
          </p>
        <br></br>
        <p>
          <span>Экономия времени:</span> Не тратьте время на поиск лучших предложений — мы сделаем это за вас.
          </p>
        <br></br>
        <p>
                  <span>Безопасность:</span> Мы гарантируем конфиденциальность ваших данных и безопасность           транзакций.</p></div>
        </div>
        <div className="start--Btn">
          <button onClick={handleStartBtn}>Начать</button>
        </div>
      </div>
      <div className="scrollbar">
        <div className="scrollbar--point" style={{backgroundColor:scrollPosition === 0 ? 'rgba(0, 255, 13, 0.9)' : 'rgba(255, 255, 255, 0.7)'}}></div>
        <div className="scrollbar--point" style={{backgroundColor:scrollPosition === 1 ? 'rgba(0, 255, 13, 0.9)' : 'rgba(255, 255, 255, 0.7)'}}></div>
        <div className="scrollbar--point" style={{backgroundColor:scrollPosition === 2 ? 'rgba(0, 255, 13, 0.9)' : 'rgba(255, 255, 255, 0.7)'}}></div>
      </div>
    </div>
  )
}