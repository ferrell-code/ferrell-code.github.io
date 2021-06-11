import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function animate(time) {
  time *= 0.001;
  scene.background = spaceTexture;

  torus_knot.rotation.x += 0.01;
  torus_knot.rotation.y += 0.0075;
  torus_knot.rotation.z += 0.005;

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const knot_geometry = new THREE.TorusKnotGeometry(10,3,16,100);
const knot_material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus_knot = new THREE.Mesh(knot_geometry, knot_material);
scene.add(torus_knot);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load('./images/space_background.jpg');
spaceTexture.minFilter = THREE.LinearFilter;
scene.background = spaceTexture;

window.addEventListener('resize', function() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();