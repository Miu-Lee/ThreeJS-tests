import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xf0f0f0 )
const canvas = document.querySelector('canvas.webgl')

//object
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial( {color: 'blue'} )
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//Viewport Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', ()=>{
    //update sizes
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight
    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    //update renderer
    renderer.setSize(sizes.width, sizes.height)
})

//camera
const camera = new THREE.PerspectiveCamera(
    65,
    sizes.width/sizes.height
)
camera.position.z = 3
scene.add(camera)
//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


//renderer
const renderer = new THREE.WebGL1Renderer(
    {canvas: document.querySelector('canvas.webgl')}
)
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)

//adopt the animition to the framerate
let time = Date.now()//current timestamp

//get faster with elapsedTime
// const clock = new THREE.Clock() 
// const elapsedTime = clock.getlapsedTime()

//gsap
//gsap.to(mesh.position, {duration: 1, delay: 2, x:1.5})


//animate
const animate = () => {
    //time
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    //update object
    //mesh.rotation.y += 0.0009 * deltaTime
    controls.update()

    //render
    renderer.render(scene, camera)

    //call the same function again on next frame
    window.requestAnimationFrame(animate)
}

animate()
