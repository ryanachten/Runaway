/*
  Handy three.js / Ember reference:
  https://github.com/mtmckenna/ember-sample-cube/blob/master/app/components/sample-cube.js
*/

import Component from '@ember/component';
import {computed, observer} from '@ember/object';

export default Component.extend({

  scene: null,
  camera: null,
  renderer: null,
  cube: null,
  allMaterials: [],
  createMaterials: computed( 'videos', function () {
    const videos = this.get('videos');
    const materials = videos.map( (video) => {
      const videoTexture = new THREE.VideoTexture(video.video);
      videoTexture.minFilter = THREE.LinearFilter;
      const material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
      material.map = videoTexture;
      return {
        id: video.id,
        material,
      };
    });
    return materials;
  }),
  updateVideo: observer('currentId', function () {
    const currentId = this.get('currentId');
    const currentMaterial = this.get('allMaterials').filter( (material) => {
      if (material.id === currentId) {
        return material;
      }
    })[0];
    this.set('cube.material', currentMaterial.material);
  }),


  didInsertElement(){
    this._super(...arguments);

    const container = this.$('.three-player')[0];
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    this.set('allMaterials', this.get('createMaterials'));

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

    const material = this.get('allMaterials')[0].material;

    const cube = new THREE.Mesh( geometry, material );

    scene.add( cube );

    this.set('cube', cube);
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

});
