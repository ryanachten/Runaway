import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return this.get('store').findAll('project');
  },

  actions:{
    deleteProject(id){
      console.log('delete', id);
    }
  }
});
