import { useState, useEffect, useRef } from 'react';
import estilos from './VideoReactPrincipal.module.css'


const libreto = {
  "vCAJA_FLEXO": {
    "DESCRIPCION": "Caja típica / modelo básico conocido como B1",
    "DESCRIPCION2":"Impresión Flexográfica",
    "IMPRESON": 10,
  },
  "v_1L0024": {
    "DESCRIPCION": "Bandeja automontable básica",
    // "DESCRIPCION2":"Impresión Flexográfica",
    "IMPRESON": 2,
  },
}
const libretoPrincipales = Object.keys(libreto);

function VideoPlayer() {
  const [currentVideo, setCurrentVideo] = useState(Math.floor(Math.random() * libretoPrincipales.length));
  const [showTitle, setShowTitle] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = `/videos/montajes/${libretoPrincipales[currentVideo]}.webm`;
    }
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, libreto[libretoPrincipales[currentVideo]].IMPRESON * 1000);
    return () => clearTimeout(timer);
  }, [currentVideo]);

  const handleVideoEnd = () => {
    setCurrentVideo((prevVideo) => (prevVideo + 1) % libretoPrincipales.length);
    setShowTitle(false);
  };

  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  return (
    <div className={estilos.video}>
      <section>
        {<h1 className={estilos.david}>{libreto[libretoPrincipales[currentVideo]].DESCRIPCION}</h1>}
        {showTitle && <h1 className={estilos.david2}>{libreto[libretoPrincipales[currentVideo]].DESCRIPCION2}</h1>}
      </section>
      <video
        className={estilos.video2}
        muted
        autoPlay
        ref={videoRef}
        onEnded={handleVideoEnd}
        onClick={handleVideoClick}
      />
    </div>
  );
}

export default VideoPlayer;