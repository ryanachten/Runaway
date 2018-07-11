import Component from '@ember/component';
import { VideoTexture } from 'three';

export default Component.extend({
  videoPlayer: null,
  videoElement: null,

  actions: {
    canplay(player, component) {
      this.set('videoPlayer', player);
      this.set('videoElement', component.get('element'));
      this.doSomething();
    },

    ended() {
      console.log('video ended');
    },

    pause() {
      console.log('video is paused');
    },

    playing() {
      console.log('video is playing');
    }
  },

  doSomething(){
    console.log(VideoTexture);
    // this.get('videoPlayer').play();
  },
});
