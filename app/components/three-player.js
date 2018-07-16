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
  cube: null,

  didInsertElement(){
    this._super(...arguments);

    const container = this.$('.three-player')[0];
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    const video = this.$('.video-js').children('video')[0];
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
    material.map = videoTexture;
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    this.set('cube', cube);
    this.set('container', container);
    this.set('scene', scene);
    this.set('renderer', renderer);
    this.set('camera', camera);

    camera.position.z = 2;

    this.animate();
  },

  animate(){

    this.get('renderer').render(
      this.get('scene'),
      this.get('camera')
    );
    requestAnimationFrame(() => {
      this.animate()
    });
  },

  canplay(player, component) {
    console.log('Video ready');
    player.play();
  },

  ended() {
    console.log('Video ended');
  },

  pause() {
    console.log('video is paused');
  },

  playing() {
    console.log('Video playing');
  },

});
