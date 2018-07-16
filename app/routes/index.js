import Route from "@ember/routing/route";

export default Route.extend({
  currentProject: null,
  projects: null,
  currentIndex: 0,

  model(){
    const model = this.get('store').findAll('project');
    model.then( (modelClass) => {
      const projects = modelClass.map( (project) => {
        return project.data;
      });
      this.set('projects', projects);
    })
    return model;
  },

  afterModel(){
    setInterval(() => {
      this.incrementProject();
    }, 1000);
  },

  incrementProject(){
    const projects = this.get('projects');
    const currentIndex = this.get('currentIndex');
    if (currentIndex+1 < projects.length) {
      this.set('currentIndex', currentIndex+1);
    }
    else{
      this.set('currentIndex', 0);
    }

  },
});
