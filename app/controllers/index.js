import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default Controller.extend({
  frameId: null,
  currentFrame: 0,

  projects: null,
  // projectTransitionInterval: null,
  currentIndex: 0,
  currentProject: computed('currentIndex', function () {
    const projects = this.get('projects');
    return projects[this.get('currentIndex')];
  }),

  loadedVideos: [],
  allVideosLoaded: false,
  videoIsPlaying: false,
  currentVideo: computed('loadedVideos', 'currentProject', function () {
    const projectId = this.get('currentProject').id;
    const video = this.get('loadedVideos').filter( (video) => {
      if (video.id === projectId) {
        return video;
      }
    })[0];
    return video;
  }),

  start(model){
    // Filter projects from model and add to array
    const projects = model.filter( (project) => {
      const data = project.data;
      if (data.featured) {
        data.id = project.id;
        return data;
      }
    });
    this.set('projects', projects);
  },

  incrementProject(){
    const currentIndex = this.get('currentIndex');
    const projectCount = this.get('projects').length;

    this.get('currentVideo').player.pause();

    if (currentIndex+1 >= projectCount) {
      this.set('currentIndex', 0);
    }else{
      this.incrementProperty('currentIndex');
    }

    this.get('currentVideo').player.play();

    this.set('currentFrame', 0);
  },

  startProjectInterval(){
    this.get('currentVideo').player.play();
    this.set('videoIsPlaying', true);
    this.animate();
  },

  animate(){
    const maxAnimationLength = 500;
    const frameId = window.requestAnimationFrame(() => {
      this.animate();
    });
    const currentFrame = this.get('currentFrame');
    // console.log('currentFrame', currentFrame);
    if (currentFrame >= maxAnimationLength) {
      return this.incrementProject();
    }
    this.set('currentFrame', currentFrame+1);
    this.set('frameId', frameId);
  },

  removeProjectInterval(){
    const frameId = this.get('frameId');
    window.cancelAnimationFrame(frameId);

    this.set('projectTransitionInterval', null);
    this.set('allVideosLoaded', false);
    this.set('loadedVideos', []);
    this.set('videoIsPlaying', false);
  },

  actions: {
    // Further video.js autoplay info here: https://blog.videojs.com/autoplay-best-practices-with-video-js/
    videoReady(player, component){
      const video = {
        id: component.parentView.id,
        player: player,
        video: player.el_.children[0]
      }
      this.get('loadedVideos').pushObject(video);
      if (this.get('loadedVideos').length === this.get('projects').length) {
        this.set('allVideosLoaded', true);
        this.startProjectInterval();
      }
    },

    nextProject(){
      this.incrementProject();
    },

    previousProject(){
      // this.decrementProject();
    }
  },
});
