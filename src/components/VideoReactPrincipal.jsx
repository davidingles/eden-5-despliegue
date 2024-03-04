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

const videosPrincipales = Object.keys(libreto);

function VideoPlayer() {
  const [currentVideo, setCurrentVideo] = useState(Math.floor(Math.random() * videosPrincipales.length));
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = `/videos/montajes/${videosPrincipales[currentVideo]}.webm`;
    }
  }, [currentVideo]);

  const handleVideoEnd = () => {
    setCurrentVideo((prevVideo) => (prevVideo + 1) % videosPrincipales.length);
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
        {videosPrincipales.map((video, index) => {
          if (currentVideo === index) {
            return <h1 key={index} className={estilos.david}>{libreto[videosPrincipales[currentVideo]].DESCRIPCION}</h1>
          
          }
          return null;
        })}
      </section>
      <video
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