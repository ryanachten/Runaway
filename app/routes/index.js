import Route from "@ember/routing/route";

export default Route.extend({
  testText: 'meow',
  currentProject: null,
  projects: null,
  currentIndex: 0,

  model(){
    // const model = ;
    // model.then( (modelClass) => {
    //   const projects = modelClass.map( (project) => {
    //     return project.data;
    //   });
    //   this.set('projects', projects);
    // })
    return this.store.findAll('project');
  },

  afterModel(model){
    this.controllerFor('index').start(model);
  },
});
