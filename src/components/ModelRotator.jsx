import { useState, useEffect } from 'react';
import ReactThreeModel3D from './ReactThreeModel3D.jsx'
import estilos from './ModelRotator.module.css'

export default function ModelRotator({ libreto }) {
  const [currentLibreto, setCurrentLibreto] = useState(libreto[0]);
  const [nextLibreto, setNextLibreto] = useState(libreto[1]);
  const [index, setIndex] = useState(0);

  const handleOnClick = () => {
    setIndex((prevIndex) => (prevIndex + 2) % libreto.length);
  };
  const handleOnClickReverse = () => {
    setIndex((prevIndex) => ((prevIndex - 2 + libreto.length) % libreto.length));
  };

  useEffect(() => {
    setCurrentLibreto(libreto[index]);
    setNextLibreto(libreto[(index + 1) % libreto.length]);
  }, [index, libreto]);

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
        video={currentLibreto.video}
        scaleVideo={currentLibreto.scaleVideo}
        client:load
      />
      <ReactThreeModel3D
        url={nextLibreto.glbSource}
        id={nextLibreto.id}
        tamaño={nextLibreto.tamaño}
        escala={nextLibreto.escala}
        posicion={nextLibreto.posicion}
        three={nextLibreto.three}
        video={nextLibreto.video}
        scaleVideo={nextLibreto.scaleVideo}
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