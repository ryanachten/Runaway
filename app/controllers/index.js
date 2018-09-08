import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default Controller.extend({
  projects: null,
  projectTransitionInterval: null,
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
    console.log('this', this);
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
  },

  startProjectInterval(){
    const interval = setInterval(() => {
      this.incrementProject();
    }, 5000);
    this.set('projectTransitionInterval', interval);
    this.get('currentVideo').player.play();
    this.set('videoIsPlaying', true);
  },

  removeProjectInterval(){
    const interval = this.get('projectTransitionInterval');
    clearInterval(interval);
    this.set('projectTransitionInterval', null);
    this.set('allVideosLoaded', false);
    this.set('loadedVideos', []);
    this.set('videoIsPlaying', false);
  },

  actions: {
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
    }
  },
});
