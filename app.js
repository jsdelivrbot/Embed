var scene, camera, renderer;
var camera, cameras;
var controls;
var sun;
var clock = new THREE.Clock();

window.onload = () => {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 90, 1, 0.1, 200000 );
	camera.position.set(0,0,1);

	cameras = createCustomCamera(scene,true);

	var materialArray = [];
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-xpos.png' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-xneg.png' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-ypos.png' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-yneg.png' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-zpos.png' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-zneg.png' ) }));
	for (var i = 0; i < 6; i++)
		 materialArray[i].side = THREE.BackSide;
	var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyboxGeom = new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1 );
	var skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
	scene.add( skybox );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize ( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	sun = new THREE.Mesh(
		new THREE.SphereGeometry(100,100,20),
		new THREE.MeshBasicMaterial({
			color:0xffffff,
		})
	);

	scene.add(sun);
	
	render();

}

function render() {
  delta = clock.getElapsedTime();
	angle = delta*0.5;
	sun.position.set(650*Math.cos(angle), 650*Math.cos(angle), 650*Math.sin(angle));
	requestAnimationFrame( render );
	renderCustomCamera();
	// renderer.render(scene, camera);
}	