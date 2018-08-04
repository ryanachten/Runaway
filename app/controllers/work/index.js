import Controller from '@ember/controller';

export default Controller.extend({
  title: null,
  client: null,
  date: null,
  category: null,
  videoLocal: null,
  videoVendor: null,
  description: null,
  featured: false,

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

    createProject(title, client, date, category, videoLocal, videoVendor, description, featured){
      const store = this.get('store');
      const newProject = store.createRecord('project', {
        'type': "project",
        'title': title,
        'client': client,
        'date': date,
        'category': category,
        'videoLocal': '/video/' + videoLocal,
        'videoVendor': videoVendor,
        'description': description,
        'featured': featured,
      });
      newProject.save();
      this.setProperties({
        'title': null,
        'client': null,
        'date': null,
        'category': null,
        'videoLocal': null,
        'videoVendor': null,
        'description': null,
        'featured': null,
      });
    },
  }
});
