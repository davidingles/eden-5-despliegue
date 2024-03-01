import { useState, useEffect, useRef } from 'react';
import estilos from './VideoReactPrincipal.module.css'

// const videosPrincipales = ["v__1g0011", "caja", "v_1L0024", "v1P0221", "video4e0066", "videoJamonero", "videoEstuche1botella", "videoCajaConBotes", "videoCaballete", "videoCazoletas"];

const libro = {
  "v__1g0011": "Estuche apilable y automontable para usar en expositores unidos",
  "caja": "Caja típica / modelo básico conocido como 'B1'",
  "v_1L0024": "aiii",
  "v_1L0024": "Bandeja automontable básica",
  "v1P0221": "Estuche automontable",
  "video4e0066": "Estuche 3 botellas con agarrador incluído en el diseño",
  "videoJamonero": "Estuche Jamonero con asa de plástico",
  "videoEstuche1botella": "Estuche para una botella con fijador en la tapa",
  "videoCajaConBotes": "Caja con separador incluído. Para tarros, lastas, botes...",
  "videoCaballete": "Caballete para expositores",
  "videoCazoletas":"Dispensador"
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
    <div className={estilos.video}>
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