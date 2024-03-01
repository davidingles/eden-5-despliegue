import { useState, useEffect, useRef } from 'react';
import estilos from './VideoReactPrincipal.module.css'

// const videosPrincipales = ["v__1g0011", "caja", "v_1L0024", "v1P0221", "video4e0066", "videoJamonero", "videoEstuche1botella", "videoCajaConBotes", "videoCaballete", "videoCazoletas"];

const libro = {
  "v__1g0011": "Estuche apilable y automontable para usar en expositores unidos",
  "caja": "Caja típica / modelo básico conocido como 'B1'",
  "v_1L0024": "aiii",
  "v_1L0024": "PAULA",
  "v1P0221": "lopez",
  "video4e0066": "cajas",
  "videoJamonero": "jamonero",
  "videoEstuche1botella": "estuche de una botella",
  "videoCajaConBotes": "caja b1 con separador para botes",
  "videoCaballete": "Caballete para expositores",
  "videoCazoletas":"cazoletas tengo que hacer de nuevo el video"
}

const videosPrincipales = Object.keys(libro);

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
    <div>
      <section>
        {videosPrincipales.map((video, index) => {
          if (currentVideo === index) {
            return <h1 key={index} className={estilos.david}>{libro[video]}</h1>
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