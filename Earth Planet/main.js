import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, w / h, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const earthGroup = new THREE.Group();
scene.add(earthGroup);

earthGroup.rotation.z = -23.4 * Math.PI / 100;

const geometry = new THREE.IcosahedronGeometry(1, 12);

const loader = new THREE.TextureLoader();
const earthTexture = loader.load('textures/earthmap1k.jpg');

const material = new THREE.MeshBasicMaterial({
    // color: 0x00ff00,
    map: earthTexture
});

const lightsTexture = loader.load('/textures/earthlights1k.jpg');

const lightsMaterial = new THREE.MeshStandardMaterial({
    map: lightsTexture,
    blending: THREE.AdditiveBlending
})

const lightsMesh = new THREE.Mesh(geometry, lightsMaterial);

const cloudsTexture1 = loader.load('textures/cloud.jpg');
const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: cloudsTexture1,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial);
cloudsMesh.scale.setScalar(1.01)
const circle = new THREE.Mesh(geometry, material);
circle.castShadow = true;
circle.receiveShadow = true;
earthGroup.add(circle);
earthGroup.add(lightsMesh);
earthGroup.add(cloudsMesh);

const directionalLight = new THREE.DirectionalLight(0xffffff);
// directionalLight.intensity = 1; // Adjust intensity as needed
directionalLight.position.set(-2, -0.5, 1.5);
scene.add(directionalLight);

function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000); // Random position within a 2000x2000x2000 cube
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);

        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}
createStars();

function animate(){
    requestAnimationFrame(animate);

    controls.update();

    circle.rotation.y += 0.002;
    lightsMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.002;

    renderer.render(scene, camera);
}
animate();