/*
  Handy three.js / Ember reference:
  https://github.com/mtmckenna/ember-sample-cube/blob/master/app/components/sample-cube.js
*/

import Component from '@ember/component';

export default Component.extend({

  container: null,
  scene: null,
  camera: null,
  renderer: null,

  didInsertElement(){
    this._super(...arguments);

    const container = document.querySelector('.three-player');
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    this.set('container', container);
    this.set('scene', scene);
    this.set('renderer', renderer);

    camera.position.z = 5;

     const animate = function () {
       requestAnimationFrame( animate );

       cube.rotation.x += 0.05;
       cube.rotation.y += 0.05;

       renderer.render(scene, camera);
     };

     animate();

    this.doshit();
  },

  doshit(){
    console.log(this.get('scene'));
  }
});
