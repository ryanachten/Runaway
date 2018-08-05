import Route from "@ember/routing/route";

export default Route.extend({
  testText: 'meow',
  currentProject: null,
  projects: null,
  currentIndex: 0,

  model(){
    return this.store.findAll('project');
  },

  afterModel(model){
    console.log('after moodel');
    this.controllerFor('index').start(model);
  },

  actions: {
    willTransition(){
      this.controller.removeProjectInterval();
    }
  }
});
