// Define the standard global variables
var container1,
    scene,
    scene1,
    scene2,
    camera,
    camera1,
    camera2,
    renderer,
    plane,
    mouseMesh,
    light;

// Custom global variables
var mouse = {
    x: 0,
    y: 0
};

init();
animate();

function init() {

    // Scene
    scene1 = new THREE.Scene();

    window.addEventListener('resize', function () {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    // Camera
    var screenWidth = window.innerWidth,
        screenHeight = window.innerHeight,
        viewAngle = 75,
        nearDistance = 0.1,
        farDistance = 1000;

    camera = new THREE.PerspectiveCamera(viewAngle, screenWidth / screenHeight, nearDistance, farDistance);
    scene1.add(camera);
    camera.position.set(0, 0, 5);
    camera.lookAt(scene1.position);

    // Renderer engine together with the background
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(screenWidth, screenHeight);
    container1 = document.getElementById('container1');
    container1.appendChild(renderer.domElement);

    // Define the lights for the scene1
    light = new THREE.PointLight(0xff00ff);
    light.position.set(0, 0, 15);
    scene1.add(light);
    var lightAmb = new THREE.AmbientLight(0x000000);
    scene1.add(lightAmb);

    // Create a circle around the mouse and move it
    // The sphere has opacity 0
    var mouseGeometry = new THREE.SphereGeometry(1, 100, 100);
    var mouseMaterial = new THREE.MeshLambertMaterial({});
    mouseMesh = new THREE.Mesh(mouseGeometry, mouseMaterial);

    mouseMesh.position.set(0, 0, 0);
    scene1.add(mouseMesh);

    // When the mouse moves, call the given function
    document.addEventListener('mousemove', onMouseMove, false);



    //scene2
    scene2 = new THREE.Scene();
    camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene2.add(cube);

    camera2.position.z = 5;
}

// Follows the mouse event
function onMouseMove(event) {

    // Update the mouse variable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Make the sphere follow the mouse
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    //mouseMesh.position.copy(pos);

    light.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 2));
};

// Animate the elements
function animate() {
    requestAnimationFrame(animate);
    render();
}

// Rendering function
function render() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // For rendering
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(scene2, camera2);
};




///

const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 1
};
const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('appear');
        appearOnScroll.unobserve('entry.target');
    })
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})