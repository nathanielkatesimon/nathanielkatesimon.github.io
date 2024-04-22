import * as THREE from 'three';
import { useEffect } from 'react';

const vertexHeight    =  40000,
      planeDefinition =  100,
      planeSize       =  1245000,
      background      =  "#0e162a",
      meshColor       =  "#0085FF"; 

// ===============  SETUP CAMERA ===================
let camera
function initializeCamera(){
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 400000)
  camera.position.z = 10000;
  camera.position.y = 10000;
}

// ===============  SETUP SCENE ===================
let scene
let planeGeo
let plane
let vertices
let _myZ = [] // <= will store the original z values of each vertices
function initializeScene(){
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(background, 1, 100000);
  
  planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);
  vertices = planeGeo.attributes.position

  // Setup and store default z values for vertices
  for (var i = 0; i < vertices.count; i++) {
    vertices.setZ(i, Math.random() * vertexHeight - vertexHeight)
    _myZ[i] = vertices.getZ(i)
  }

  plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
    color: meshColor,
    wireframe: true
  }));

  
  plane.rotation.x -= Math.PI * 0.35;
  plane.rotation.z -= Math.PI * .1;

  scene.add(plane);
}


// Setup THREE renderer
let renderer
function initializeRenderer(){
  const container = document.getElementById('wave-container')

  renderer = new THREE.WebGLRenderer({alpha: false});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(background, 1);
  
  container.appendChild(renderer.domElement);
}

let count = 0
let waveSpeed = 0.00001
function render() {
  requestAnimationFrame(render)
  for (var i = 0; i < vertices.count; i++) {
    vertices.setZ(i, Math.sin(i + count * waveSpeed) * (_myZ[i] - (_myZ[i]* 0.6)) )
    vertices.needsUpdate = true

    count += 0.1
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  //changes the size of the canvas and updates it
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}




const Wave = () => {
  useEffect(() => {
    initializeCamera()
    initializeScene()
    initializeRenderer()
    render()
    window.addEventListener('resize', onWindowResize, false)
  }, [])

  return <div id="wave-container" className="h-[100%] w-[100%] overflow-hidden overflow-y-hidden opacity-20"></div>
}

export default Wave;
