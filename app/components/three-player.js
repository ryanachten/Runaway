/*
  Handy three.js / Ember reference:
  https://github.com/mtmckenna/ember-sample-cube/blob/master/app/components/sample-cube.js
*/

import Component from '@ember/component';
import {computed, observer} from '@ember/object';

export default Component.extend({

  container: null,
  composer: null,
  effect: null,
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

    this.set('allMaterials', this.get('createMaterials'));

    const container = this.$('.three-player')[0];
    this.set('container', container);
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

    const material = this.get('allMaterials')[0].material;

    const cube = new THREE.Mesh( geometry, material );

    const composer = new THREE.EffectComposer(renderer);
    composer.addPass( new THREE.RenderPass( scene, camera ) );

    const effect = new THREE.ShaderPass( THREE.RGBShiftShader );
		effect.uniforms[ 'amount' ].value = 0.01;
		effect.renderToScreen = true;
		composer.addPass( effect );
    this.set('effect', effect);

    scene.add( cube );

    this.set('cube', cube);
    this.set('composer', composer);

    camera.position.z = 1;

    this.animate();
  },

  animate(){
    this.get('composer').render();
    requestAnimationFrame(() => {
      this.animate()
    });
  },

  // TODO: create touch input version
  mouseMove(e){
    const canvas = this.get('container').children[0];

    // TODO: these should be stored and reset on screen resize
    var offset = $(canvas).offset();
    const width = $(canvas).innerWidth();
    const height = $(canvas).innerHeight();

    const relativeMouseX = e.pageX - offset.left;
    const normalisedCentredX = ((relativeMouseX - width/2 ) /width) *2;

    const relativeMouseY = e.pageY - offset.top;
    const normalisedCentredY = ((relativeMouseY - height/2 ) /height) *2;

    const effect = this.get('effect');
    effect.uniforms[ 'amount' ].value = normalisedCentredX;
  }
});
