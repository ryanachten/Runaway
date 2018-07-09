import Component from '@ember/component';

export default Component.extend({
  isWide: false,
  src: '/video/test1.mp4',
  controls: true,
  actions: {
    canplay() {
      console.log('video ready');
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
  }
});
