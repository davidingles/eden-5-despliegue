
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Clone, Html } from '@react-three/drei'
import estilos from './ReactThreeModel3D.module.css'
import Fallback from './Fallback.jsx'

function Model({ url, miEscala, miPosicion }) {
	const { scene } = useGLTF(url)
	scene.traverse((node) => {
		if (node.isMesh) {
			node.castShadow = true
			node.receiveShadow = true
			node.material.transparent = true
			node.material.roughness = 1
		}
	})
	const group = useRef()
	useFrame((state) => {
		const t = state.clock.getElapsedTime()
		group.current.position.y = miPosicion
		// group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (0 + Math.sin(t)) / 1000, 1)
	})
	return (
		<group ref={group} dispose={null} position={[0, 2, 0]} scale={miEscala} >
			<Clone object={scene} castShadow receiveShadow />
		</group >
	)
}



export default function EstucheConAsas({ url, escala, posicion, velocidadRotacion = .6 }) {
	return (
		<>
			<Canvas camera={{ position: [0, .4, -0.6], near: .01, fov: 50 }}>
				<ambientLight intensity={4} />
				<Suspense fallback={<Fallback />}>
					<Model url={url} miEscala={escala} miPosicion={posicion} className={estilos.model}  />
				</Suspense>
				<OrbitControls autoRotate autoRotateSpeed={velocidadRotacion} />

			</Canvas>
		</>
	)
}