import * as THREE from 'three'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Clone, Html, ContactShadows } from '@react-three/drei'

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
		group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-3 + Math.sin(t)) / 40, .8)
	})
	return (
		<group ref={group} dispose={null} position={[0, 2, 0]} scale={miEscala} >
			<Clone object={scene} castShadow receiveShadow />
		</group >
	)
}

function Fallback() {
	return (
		<Html>
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
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

export default function EstucheConAsas({ url, escala, posicion }) {
	return (
		<>
			<Canvas camera={{ position: [0, .4, -0.6], near: .01, fov: 50 }}>
				<ambientLight intensity={4} />
				<Suspense fallback={<Fallback />}>
					<Model url={url} miEscala={escala} miPosicion={posicion} />
				</Suspense>
				<OrbitControls autoRotate autoRotateSpeed={.6} />
				<ContactShadows resolution={512} scale={30} position={[0, -0.5, 0.0]} blur={.1} opacity={.5} far={10} color='#8a6246' />
			</Canvas>
		</>
	)
}