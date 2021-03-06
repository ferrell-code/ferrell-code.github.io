// create knot object
function init_torus_knot() {
  const knot_geometry = new THREE.TorusKnotGeometry(10,3,16,100);
  const knot_material = new THREE.MeshStandardMaterial({color: 0x85144});
  torus_knot = new THREE.Mesh(knot_geometry, knot_material);
  torus_knot.position.set(20, -45, 0);
}

// create planet object
function init_planet() {
  const planet_geometry = new THREE.SphereGeometry(4, 32, 32);
  const planet_texture = new THREE.TextureLoader().load('images/2k_mars.jpg');
  const normal_texture = new THREE.TextureLoader().load('images/texture.jpg');
  const planet_material = new THREE.MeshStandardMaterial({map: planet_texture, normalMap: normal_texture});
  planet = new THREE.Mesh(planet_geometry, planet_material);
  planet.position.set(20, 40, 0);
}

// create sun object
function init_sun() {
  const sun_geo = new THREE.SphereGeometry(10, 32, 32);
  const sun_texture = new THREE.TextureLoader().load('images/2k_sun.jpg');
  const sun_material = new THREE.MeshStandardMaterial({map: sun_texture});
  sun = new THREE.Mesh(sun_geo, sun_material);
  sun.position.set(30, 40, 0);
}

// create my photo on a coin animation
function init_me() {
  const me_geo = new THREE.CircleGeometry(11, 32, 32);
  const me_text = new THREE.TextureLoader().load('images/chuck4.png');
  const me_material = new THREE.MeshBasicMaterial({map: me_text});
  me = new THREE.Mesh(me_geo, me_material);
  me.material.side = THREE.DoubleSide;
  me.position.set(2, 0, 0);
}

// creates light sources
function init_lights() {
  pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(-10, -10, -10);

  ambientLight = new THREE.AmbientLight(0xffffff);
}

// creates camera
function init_camera() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.setZ(100);
}

// creates renderer
function init_renderer() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  })

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// creates background
function init_background() {
  spaceTexture = new THREE.TextureLoader().load('images/space_background.jpg');
  spaceTexture.minFilter = THREE.LinearFilter;
  scene.background = spaceTexture;
}

// creates scene
function init() {
  scene = new THREE.Scene();
  init_camera();
  init_renderer();
  init_torus_knot();
  init_sun();
  init_lights();
  init_background();
  init_planet();
  init_me();

  scene.add(torus_knot, planet, sun, ambientLight, pointLight, me);
}

// main function
let camera, renderer, torus_knot, planet, sun, me, pointLight, ambientLight, spaceTexture, scene;
init();

//make backround stretch with screen as well as objects
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight);
});

//radius and theta for polar cordinates
var r = 35;
var theta = 0;
// How fast theta increments (orbit velocity)
var dTheta = 2 * Math.PI / 800;

// while loop for scene animation
var animate = function() {
  scene.background = spaceTexture;
  torus_knot.rotation.x += 0.01;
  torus_knot.rotation.y += 0.0075;
  torus_knot.rotation.z += 0.005;
  planet.rotation.y += 0.03;
  // creates orbit animation
  theta += dTheta;
  planet.position.x = r * Math.cos(theta) + 20;
  planet.position.z = r * Math.sin(theta) + 5;
  sun.rotation.y -= 0.005;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
// control loop
animate();
