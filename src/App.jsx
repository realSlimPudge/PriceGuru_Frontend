import './App.css';
import About from './components/About';
import Catalog from './components/Catalog';
import React ,{ useState } from 'react';

function App() {

  const [showCatalog,setShowCatalog] = useState(false)
  const handleStartBtn = () =>{
    setShowCatalog(true)
  }
  return (
    <div className="App">
      {showCatalog 
        ?
        <Catalog></Catalog>
        :
        <About handleStartBtn={handleStartBtn}></About>
      }  
    </div>
  );
}

export default App;
