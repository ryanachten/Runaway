import {computed} from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  projects: null,
  currentIndex: 0,
  currentProject: computed('currentIndex', function () {
    const projects = this.get('projects');
    return projects[this.get('currentIndex')];
  }),

  loadedVideos: [],
  allVideosLoaded: false,

  start(model){
    const projects = model.map( (project) => {
      return project.data;
    });
    this.set('projects', projects);
    setInterval(() => {
      this.incrementProject();
    }, 1000);
  },

  incrementProject(){
    const currentIndex = this.get('currentIndex');
    const projectCount = this.get('projects').length;

    if (currentIndex+1 >= projectCount) {
      this.set('currentIndex', 0);
    }else{
      this.incrementProperty('currentIndex');
    }
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
      }
    }
  },
});
