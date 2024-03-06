import { useState, useEffect } from 'react';
import ReactThreeModel3D from './ReactThreeModel3D.jsx'
import estilos from './ModelRotator.module.css'

export default function ModelRotator({ libreto }) {
  const [currentLibreto, setCurrentLibreto] = useState(libreto[0]);
  const [index, setIndex] = useState(0);
  
  const handleOnClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % libreto.length);
    console.log('index');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % libreto.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [libreto]);

  useEffect(() => {
    setCurrentLibreto(libreto[index]);
  }, [index, libreto]);



  return (
    <div className={estilos.model}>
      <button
        style={{ translate: '0px 222px', position: 'absolute', zIndex: '99'}}
        onClick={handleOnClick}>
        <img src="./svg/flechaSube.svg" alt="" style={{ rotate: '90deg'}}/>
      </button>
      <ReactThreeModel3D
        url={currentLibreto.glbSource}
        id={currentLibreto.id}
        tamaño={currentLibreto.tamaño}
        escala={currentLibreto.escala}
        posicion={currentLibreto.posicion}
        three={currentLibreto.three}
        video={currentLibreto.video}
        scaleVideo={currentLibreto.scaleVideo}
        client:load
      />
    </div>
  );
}
