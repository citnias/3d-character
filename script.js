// Inisialisasi scene, camera, dan renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById('container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Membuat lantai
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xcccccc,
    roughness: 0.8,
    metalness: 0.2
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Membuat karakter 3D
const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 16);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff9999 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 0.6;
body.castShadow = true;
scene.add(body);

// Membuat kepala
const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 1.5;
head.castShadow = true;
body.add(head);

// Membuat mata
const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.1, 0.1, 0.25);
head.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.1, 0.1, 0.25);
head.add(rightEye);

// Membuat lengan
const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.7, 16);
const armMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99 });

const leftArm = new THREE.Mesh(armGeometry, armMaterial);
leftArm.position.set(-0.4, 0.9, 0);
leftArm.rotation.z = Math.PI / 2;
leftArm.castShadow = true;
body.add(leftArm);

const rightArm = new THREE.Mesh(armGeometry, armMaterial);
rightArm.position.set(0.4, 0.9, 0);
rightArm.rotation.z = -Math.PI / 2;
rightArm.castShadow = true;
body.add(rightArm);

// Membuat kaki
const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16);
const legMaterial = new THREE.MeshStandardMaterial({ color: 0x996633 });

const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
leftLeg.position.set(-0.15, -0.4, 0);
leftLeg.castShadow = true;
body.add(leftLeg);

const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
rightLeg.position.set(0.15, -0.4, 0);
rightLeg.castShadow = true;
body.add(rightLeg);

// Kontrol interaktif
document.getElementById('headRotation').addEventListener('input', (e) => {
    head.rotation.y = THREE.MathUtils.degToRad(e.target.value);
});

document.getElementById('armLeft').addEventListener('input', (e) => {
    leftArm.rotation.z = Math.PI / 2 + THREE.MathUtils.degToRad(e.target.value);
});

document.getElementById('armRight').addEventListener('input', (e) => {
    rightArm.rotation.z = -Math.PI / 2 + THREE.MathUtils.degToRad(e.target.value);
});

document.getElementById('legLeft').addEventListener('input', (e) => {
    leftLeg.rotation.x = THREE.MathUtils.degToRad(e.target.value);
});

document.getElementById('legRight').addEventListener('input', (e) => {
    rightLeg.rotation.x = THREE.MathUtils.degToRad(e.target.value);
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
