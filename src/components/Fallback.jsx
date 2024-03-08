import { Html } from '@react-three/drei'


export default function Fallback() {
  return (
    <Html>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <div style={{
          border: '16px solid #f3f3f3',
          borderRadius: '50%',
          borderTop: '16px solid #3498db',
          width: '120px',
          height: '120px',
          animation: 'spin 2s linear infinite'
        }}></div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Html>
  )
}