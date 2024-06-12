import * as THREE from 'three';

// Create the renderer
const renderer = new THREE.WebGLRenderer();
const width = window.innerWidth;
const height = window.innerHeight;
renderer.setSize(width, height);

// Append the renderer to the DOM
document.body.appendChild(renderer.domElement);

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const fov = 75;
const aspectRatio = width / height;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

// Create the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Create the material
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000 //Red color
});

// Create the cube by combining the geometry and material
const cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

// Move the camera away from the cube
camera.position.z = 5;

// Create the animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.z += 0.01;
    cube.rotation.y += 0.01;
    
    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
