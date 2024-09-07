import * as THREE from 'three'
import { LoadGLTFByPath } from './Helpers/ModelHelper.js'

//Renderer does the job of rendering the graphics
let renderer = new THREE.WebGLRenderer({

	//Defines the canvas component in the DOM that will be used
	canvas: document.querySelector('#background'),
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

//set up the renderer with the default settings for threejs.org/editor - revision r153
renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = 1;
renderer.toneMappingExposure = 0.0005
renderer.useLegacyLights = false;
// renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
//make sure three/build/three.module.js is over r152 or this feature is not available. 
renderer.outputColorSpace = THREE.SRGBColorSpace 
// renderer.physicallyCorrectLights = true;

const scene = new THREE.Scene();

// const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
// scene.add( ambientLight );

// const pointLight = new THREE.PointLight( 0xffffff, 0.6 );
// camera.add( pointLight );
// scene.add( camera );

// const spotLight = new THREE.SpotLight(0xffffff, 1, 100, 0.2, 0.5);
// spotLight.position.set(0,25,0)
// scene.add(spotLight)

let cameraList = [];

let camera;

// Load the GLTF model
LoadGLTFByPath(scene)
  .then(() => {
    retrieveListOfCameras(scene);
  })
  .catch((error) => {
    console.error('Error loading JSON scene:', error);
  });

//retrieve list of all cameras
function retrieveListOfCameras(scene){
  // Get a list of all cameras in the scene
  scene.traverse(function (object) {
    if (object.isCamera) {
      cameraList.push(object);
    }
  });

  //Set the camera to the first value in the list of cameras
  camera = cameraList[0];

  updateCameraAspect(camera);

  // Start the animation loop after the model and cameras are loaded
  animate();
}

// Set the camera aspect ratio to match the browser window dimensions
function updateCameraAspect(camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

//A method to be run each time a frame is generated
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};




    