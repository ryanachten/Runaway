import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    filterByCategory(param){
      if (param !== '') {
        return this.get('store')
          .query('project', {category: param})
          .then( (results) => {
            return { query: param, results: results }
          });
      }else{
        return this.get('store').findAll('project')
          .then( (results) => { return { query: param, results: results }});
      }
    }
  }
});
