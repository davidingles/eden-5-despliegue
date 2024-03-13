import estilos from './ServiciosCarruselReact2.module.css'
import { useState, useEffect } from 'react'


export function ServiciosCarruselReact2({ cielo2, nave, lunes, nav, video, naveThumb, naveThumb1, naveThumb2, naveThumb3, textos, textos2, claves }) {
  const imagenes = [cielo2, nave, lunes, nav];
  const imagenes2 = [naveThumb, naveThumb1, naveThumb2, naveThumb3];

  const [indiceSeleccionado, setIndiceSeleccionado] = useState(0);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(imagenes[0]);
  const [loaded, setLoaded] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        nuevaImagenSeleccionada(indiceSeleccionado, imagenes, true);
      }, 5000);
      return () => clearInterval(interval);
    }
  });
  const nuevaImagenSeleccionada = (index, imagenes, next = true) => {
    setLoaded(false); // reset loaded state when changing image
    const condicion = next ? indiceSeleccionado < imagenes.length - 1 : indiceSeleccionado > 0;
    const nuevoIndice = next ? (condicion ? indiceSeleccionado + 1 : 0) : (condicion ? indiceSeleccionado - 1 : imagenes.length - 1);
    setIndiceSeleccionado(nuevoIndice);
    setImagenSeleccionada(imagenes[nuevoIndice]);
  };
  const handleOnClick = () => {
    nuevaImagenSeleccionada(indiceSeleccionado, imagenes, true);
  };
  const handleOnClickReverse = () => {
    nuevaImagenSeleccionada(indiceSeleccionado, imagenes, false);
  };

  return (
    <>
      <main className={`${estilos.main}`}>
        <div className={`${estilos.boxy}`}>
          <div
            className={`${estilos.marco}`}>
            <video
              poster={imagenSeleccionada}
              autoPlay
              loop
              muted
              onLoad={() => setLoaded(true)}
              src={imagenSeleccionada}
              style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '1rem' }}
              alt={imagenSeleccionada}
            />
              <div className={estilos.botones}>
                <button
                  className={estilos.btn}
                  onClick={handleOnClickReverse}>
                  <img src="./svg/arrow.svg" alt="" style={{ rotate: '-180deg', width: '66px', height: '66px' }} />
                </button>
                <button
                  className={estilos.btn2}
                  onClick={handleOnClick}>
                  <img src="./svg/arrow.svg" alt="" style={{ rotate: '0deg', width: '66px', height: '66px' }} />
                </button>
              </div>
          </div>

          <div className='flex flex-col justify-center'>
            <div className={`${estilos.thumbnailContainer} flex flex-row gap-4`}>
              {imagenes2.map((imagen, index) => (
                <div className='flex relative' key={index}>
                  <img
                    className={`object-cover m-2 md:m-0 w-[111px] h-[111px] rounded-lg ${estilos.thumbnail} cursor-pointer ${index !== indiceSeleccionado ? estilos.thumbnail2 : ""}`}
                    src={imagen}
                    alt="fabrica"
                    onClick={() => { setImagenSeleccionada(imagenes[index]); setIndiceSeleccionado(index); setAutoPlay(false) }} />
                </div>
              ))}
            </div>
          </div>
        </div >
        {/* // TEXTOS =============================== */}
        <div className={`${estilos.cajaTexto}`}>
          <p className={`${estilos.texto}`}>{textos && textos[indiceSeleccionado]}{textos2 && textos2[claves[indiceSeleccionado]].dep}<br /><p className='whitespace-nowrap'>{textos2 && textos2[claves[indiceSeleccionado]].email}</p><p className='whitespace-nowrap'>{textos2 && textos2[claves[indiceSeleccionado]].nombre}</p><p className='whitespace-nowrap'>{textos2 && textos2[claves[indiceSeleccionado]].telefono}</p></p>
        </div>
      </main>
    </>
  );
}
