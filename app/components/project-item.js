import Component from '@ember/component';

export default Component.extend({
  videoPlayer: null,
  videoElement: null,

  actions: {
    canplay(player, component) {
      this.set('videoPlayer', player);
      this.set('videoElement', component.get('element'));
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
