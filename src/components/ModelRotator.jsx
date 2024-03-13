import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import ReactThreeModel3DPrincipal from './ReactThreeModel3DPrincipal.jsx'
import estilos from './ModelRotator.module.css'

export default function ModelRotator({ libreto2 }) {
  const randomIndex = Math.floor(Math.random() * libreto2.length);
  const [index, setIndex] = useState(randomIndex);
  const [ultimoBoton, setUltimoBoton] = useState('derecha');
  const [intervalActive, setIntervalActive] = useState(true);

  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1500px)' });

  const handleOnClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % libreto2.length);
    setUltimoBoton('derecha');
    setIntervalActive(false);
    // setTimeout(() => setIntervalActive(true), 32000);
  };
  const handleOnClick3D = () => {
    setIntervalActive(false);
  }
  const handleOnClickReverse = () => {
    setIndex((prevIndex) => ((prevIndex - 1 + libreto2.length) % libreto2.length));
    setUltimoBoton('izquierda');
    setIntervalActive(false);
    // setTimeout(() => setIntervalActive(true), 32000);
  };

  useEffect(() => {
    let interval;
    if (intervalActive) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % libreto2.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [libreto2, intervalActive]);

  return (
    <div className={estilos.model}>
      <button
        className={estilos.btn}
        onClick={handleOnClickReverse}>
        <img src="./svg/arrow.svg" alt="" style={{ rotate: '-180deg' }} />
      </button>
      <div
        onClick={handleOnClick3D}
        className={estilos.model3D}
      >
        {libreto2.map((libretoItem, mapIndex) => (
          mapIndex === index && (
            <div
              key={mapIndex}
              className={ultimoBoton === 'derecha' ? estilos.fade : estilos.fade2}>
              <ReactThreeModel3DPrincipal
        
                url={libretoItem.glbSource}
                tamaño={libretoItem.tamaño}
                escala={libretoItem.escala}
                posicion={libretoItem.posicion}
                velocidadRotacion={libretoItem.velocidadRotacion}
              />
            </div>
          )
        ))}
      </div>
      <button
        className={estilos.btn}
        onClick={handleOnClick}>
        <img src="./svg/arrow.svg" alt="" style={{ rotate: '0deg' }} />
      </button>
    </div>
  );
}