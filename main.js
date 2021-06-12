import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// while loop for scene animation
function animate(pi) {
  scene.background = spaceTexture;
  torus_knot.rotation.x += 0.01;
  torus_knot.rotation.y += 0.0075;
  torus_knot.rotation.z += 0.005;
  pi  += 0.00001;
  planet.rotation.y += 0.03;
  planet.position.x += Math.sin( pi * 0.001) * 0.7;
  planet.position.z += Math.cos( pi * 0.001) * 0.7;

  sun.rotation.y -= 0.005;
  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// create knot object
function init_torus_knot() {
  const knot_geometry = new THREE.TorusKnotGeometry(10,3,16,100);
  const knot_material = new THREE.MeshStandardMaterial({color: 0x85144});
  const torus_knot = new THREE.Mesh(knot_geometry, knot_material);
  torus_knot.position.set(30, -20, 0);
  return torus_knot
}

// create planet object
function init_planet() {
  const planet_geometry = new THREE.SphereGeometry(4, 32, 32);
  const planet_texture = new THREE.TextureLoader().load('./images/2k_mars.jpg');
  const normal_texture = new THREE.TextureLoader().load('./images/texture.jpg');
  const planet_material = new THREE.MeshStandardMaterial({map: planet_texture, normalMap: normal_texture});
  const planet = new THREE.Mesh(planet_geometry, planet_material);
  planet.position.set(10, 30, 0);
  return planet
}

// create sun object
function init_sun() {
  const sun_geo = new THREE.SphereGeometry(10, 32, 32);
  const sun_texture = new THREE.TextureLoader().load('./images/2k_sun.jpg');
  const sun_material = new THREE.MeshStandardMaterial({map: sun_texture});
  const sun = new THREE.Mesh(sun_geo, sun_material);
  sun.position.set(30, 30, 0);
  return sun
}



// init scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100);

renderer.render(scene, camera);


const torus_knot = init_torus_knot();
const planet = init_planet();
const sun = init_sun();

scene.add(torus_knot, planet, sun);

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

//make backround stretch with screen as well as objects
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight);
});

let pi = Math.PI;
animate(pi);
