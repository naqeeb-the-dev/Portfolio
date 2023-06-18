import './style.css';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);



// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addflutter() {
  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.TextureLoader().load('favicon.ico');
  const flutter = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: material}));

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  flutter.position.set(x, y, z);
  scene.add(flutter);
}

Array(100).fill().forEach(addflutter);
function addfirebase() {
  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.TextureLoader().load('firebase.svg');
  const firebase = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: material}));

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  firebase.position.set(x, y, z);
  scene.add(firebase);
}

Array(100).fill().forEach(addfirebase);
// Background

const backTexture = new THREE.TextureLoader().load('back.jpg');
scene.background = backTexture;

// Avatar

const imgTexture = new THREE.TextureLoader().load('naqeeb.png');

const naqeeb = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: imgTexture }));

scene.add(naqeeb);

// Moon

const keyboardTexture = new THREE.TextureLoader().load('keyboard.png');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const keyboard = new THREE.Mesh(
  new THREE.SphereGeometry(1, 22, 22),
  new THREE.MeshStandardMaterial({
    map: keyboardTexture,
    // normalMap: normalTexture,
  })
);

scene.add(keyboard);

keyboard.position.z = 30;
keyboard.position.setX(-10);

naqeeb.position.z = -5;
naqeeb.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  keyboard.rotation.x += 0.05;
  keyboard.rotation.y += 0.075;
  keyboard.rotation.z += 0.05;

  naqeeb.rotation.y += 0.01;
  naqeeb.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  

  keyboard.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
