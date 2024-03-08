import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import ReactThreeModel3DPrincipal from './ReactThreeModel3DPrincipal.jsx'
import estilos from './ModelRotator.module.css'

export default function ModelRotator({ libreto }) {
  const [index, setIndex] = useState(0);

  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1500px)' });

  const handleOnClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % libreto.length);
  };
  const handleOnClickReverse = () => {
    setIndex((prevIndex) => ((prevIndex - 1 + libreto.length) % libreto.length));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % libreto.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [libreto]);

  return (
    <div className={estilos.model}>
      <button
        className={estilos.btn}
        onClick={handleOnClickReverse}>
        <img src="./svg/arrow.svg" alt="" style={{ rotate: '-180deg', width:'66px', height:'66px' }} />
      </button>
      {libreto.map((libretoItem, mapIndex) => (
        mapIndex === index && (
          <div className={estilos.fade}>
            <ReactThreeModel3DPrincipal
              key={mapIndex}
              url={libretoItem.glbSource}
              tamaño={libretoItem.tamaño}
              escala={libretoItem.escala}
              posicion={libretoItem.posicion}
              velocidadRotacion={libretoItem.velocidadRotacion}
            />
          </div>
        )
      ))}
      <button
        className={estilos.btn}
        onClick={handleOnClick}>
        <img src="./svg/arrow.svg" alt="" style={{ rotate: '0deg', width:'66px', height:'66px' }} />
      </button>
    </div>
  );
}