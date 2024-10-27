import React,{useState,useLayoutEffect,useRef,useEffect} from 'react'
import AboutInfo from './AboutInfo'

export default function About({handleStartBtn}){

  const [opacity,setOpacity] = useState(0)
  const [timer,setTimer] = useState(false)
  const [floatingElements,setfFloatingElements] = useState([])
  const [logoPos,setLogoPos] = useState(50)
  const [spanMargin,setSpanMargin] = useState(90)
  const [aboutVisible,setAboutVisible] = useState(false)
  const [aboutOpacity,setAboutOpacity] = useState(0)
  const [aboutTop,setAboutTop] = useState(-55)
  const [aboutScroll,setAboutScroll] = useState(false)
  const [mainAboutScroll,setMainAboutScroll] = useState(true)
  

  const containerRef = useRef(null)

	useEffect(() => {
		const handleMouseMove = e => {
			const { clientX, clientY } = e

			const container = containerRef.current
			const { width, height } = container.getBoundingClientRect()

			const x = clientX / width
			const y = clientY / height

			const gradient = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(175,255,153,1) 3%, rgba(141,254,119,1) 9%, rgba(91,223,64,1) 91%)`
			container.style.background = gradient
		}
     const handleWheel = e =>{
      if(mainAboutScroll){
        const delta = e.deltaY
        const newLogoPos = Math.max(0,logoPos - delta * 0.1)
        const newSpanMargin = Math.max(0,spanMargin - delta * 0.3)
        const newAboutOpacity = Math.max(0,aboutOpacity + delta * 0.01)
      if(newLogoPos >= 20 && newLogoPos <= 50){
        setLogoPos(newLogoPos)
      }
      if(newSpanMargin >= 0 && newSpanMargin <= 90){
        setSpanMargin(newSpanMargin)
      }
      setAboutOpacity(newAboutOpacity)
      if(newSpanMargin === 60){
        setAboutOpacity(0)
        setAboutTop(-55)
      }else{
        setAboutOpacity(1)
        setAboutTop(-50)
      }
    
    }
    if(spanMargin === 0 && logoPos === 20){
      setAboutScroll(true)
      setMainAboutScroll(false)
    }else{
      setAboutScroll(false)
      setMainAboutScroll(true)
    }
  }
		const container = containerRef.current

    spanMargin < 90 ? setAboutVisible(true) : setAboutVisible(false)

		container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('wheel',handleWheel)

		return () => {
			container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('wheel',handleWheel)
		}
	}, [logoPos,spanMargin,mainAboutScroll])

  useLayoutEffect(()=>{
    
    setTimeout(()=>{
      setOpacity(1)
      setTimer(true)
    },800)
     // плавающие точки
  const elements = []
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
  setfFloatingElements(elements)
  },[])

 

  return(
    <div className='background' ref={containerRef}>
      {floatingElements}
      <div className="logo" style={{left:`${logoPos}%`}}>
        <h1 className='logo--text' style={{opacity:opacity}}>Price <br /><span style={{marginLeft: timer ? `${spanMargin}px` : '0px'}} >Guru</span></h1>
      </div>
        {aboutVisible
      ?   <div style={{opacity:`${aboutOpacity}`, transform:`translate(${aboutTop}%,-50%)`}} className='about__transition'>
            <AboutInfo aboutScroll={aboutScroll} handleStartBtn={handleStartBtn}></AboutInfo>
          </div>
      : 
      <></>}
    </div>
  )
}