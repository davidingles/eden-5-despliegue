import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import ReactThreeModel3D from './ReactThreeModel3D.jsx'
import estilos from './ModelRotator.module.css'

export default function ModelRotator({ libreto }) {
  const [currentLibreto, setCurrentLibreto] = useState(libreto[0]);
  const [nextLibreto, setNextLibreto] = useState(libreto[1]);
  const [thirdLibreto, setThirdLibreto] = useState(libreto[2]);
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
    setCurrentLibreto(libreto[index]);
    setNextLibreto(libreto[(index + 1) % libreto.length]);
    if (isLargeScreen) {
      setThirdLibreto(libreto[(index + 2) % libreto.length]);
    }
  }, [index, libreto, isLargeScreen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % libreto.length);
    }, 80000);
    return () => clearInterval(interval);
  }, [libreto, isMobile, isLargeScreen]);

  return (
    <div className={estilos.model}>
      <button
        className={estilos.btn}
        onClick={handleOnClickReverse}>
        <img src="./svg/flechaSube.svg" alt="" style={{ rotate: '-90deg' }} />
      </button>
      <ReactThreeModel3D
        url={currentLibreto.glbSource}
        id={currentLibreto.id}
        tamaño={currentLibreto.tamaño}
        escala={currentLibreto.escala}
        posicion={currentLibreto.posicion}
        three={currentLibreto.three}
        velocidadRotacion={currentLibreto.velocidadRotacion}
        client:load
      />
      <button
        className={estilos.btn}
        onClick={handleOnClick}>
        <img src="./svg/flechaSube.svg" alt="" style={{ rotate: '90deg' }} />
      </button>
    </div>
  );
}