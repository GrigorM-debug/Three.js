import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 5;

const canvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas
});
renderer.setSize(w, h);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.enableZoom = false;



const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

//Appending the renderer to the DOM 
document.appendChild(renderer.domElement);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update;
}
animate();

function handleWindowsResice(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleWindowsResice());