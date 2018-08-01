import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    filterByCategory(category){
      if (category !== '') {
        return this.get('store')
          .query('project', {orderBy: 'category', equalTo: category})
          .then( (results) => {
            return { query: category, results: results }
          });
      }else{
        return this.get('store').findAll('project')
          .then( (results) => { return { query: category, results: results }});
      }
    },

    deleteProject(id){
      const store = this.get('store');
      store.findRecord('project', id, { backgroundReload: false }).then((record) => {
        record.deleteRecord();
        record.get('isDeleted');
        record.save();
      });
    }
  }
});
