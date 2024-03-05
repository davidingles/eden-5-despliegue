import { useState, useEffect, useRef } from 'react';
import estilos from './VideoReactPrincipal.module.css'

const libreto = {
  "vCAJA_FLEXO": {
    "DESCRIPCION": "Caja típica / modelo básico conocido como B1",
    "DESCRIPCION2": "Impresión Flexográfica",
    "IMPRESION": 10
    ,
  },
  "v_1L0024": {
    "DESCRIPCION": "Bandeja automontable básica",
    // "DESCRIPCION2":"Impresión Flexográfica",
    "IMPRESION": 2,
  },
}

const videosPrincipales = Object.keys(libreto);

function VideoPlayer() {
  const [currentVideo, setCurrentVideo] = useState(Math.floor(Math.random() * videosPrincipales.length));
  const [showDescription2, setShowDescription2] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = `/videos/montajes/${videosPrincipales[currentVideo]}.webm`;
    }
  }, [currentVideo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDescription2(true);
    }, libreto[videosPrincipales[currentVideo]].IMPRESION * 1000);

    return () => clearTimeout(timer);
  }, [currentVideo]);

  const handleVideoEnd = () => {
    setShowDescription2(false);
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
            return (
              <div key={index}>
                <h1 key={index} className={estilos.david}>{libreto[videosPrincipales[currentVideo]].DESCRIPCION}</h1>
                {showDescription2 && <h2 className={estilos.david2}>{libreto[videosPrincipales[currentVideo]].DESCRIPCION2}</h2>}
              </div>
            )

          }
          return null;
        })}
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