import {computed} from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  testText: 'meow',
  projects: null,
  currentIndex: 0,

  start(model){
    const projects = model.map( (project) => {
      return project.data;
    });
    this.set('projects', projects);
    setInterval(() => {
      this.incrementProject();
    }, 1000);
  },

  currentProject: computed('currentIndex', function () {
    const projects = this.get('projects');
    return projects[this.get('currentIndex')];
  }),

  incrementProject(){
    const currentIndex = this.get('currentIndex');
    const projectCount = this.get('projects').length;

    console.log(this.get('currentProject'));

    if (currentIndex+1 >= projectCount) {
      this.set('currentIndex', 0);
    }else{
      this.set('currentIndex', currentIndex+1);
    }
  }
});
