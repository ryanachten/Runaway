import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default Controller.extend({

  isCreatingProject: false,

  isAbleToCreateProject: computed('title', 'client', 'date', 'category', 'description', 'videoSnippetFileName', function () {
    const {title, client, date, category, description, videoSnippetFileName} = this.getProperties('title', 'client', 'date', 'category', 'description', 'videoSnippetFileName');

    return title && client && date && category && description && videoSnippetFileName;
  }),

  title: null,
  client: null,
  date: null,
  category: null,
  videoSnippetFileName: null,
  videoVendorUrl: null,
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

    createProject(title, client, date, category, videoVendorUrl, videoSnippetFileName, description, featured){
      if (!this.get('isAbleToCreateProject')) {
        return;
      }

      const store = this.get('store');

      const newProject = store.createRecord('project', {
        'type': "project",
        'title': title,
        'client': client,
        'date': date,
        'category': category,
        'videoSnippetFileName': videoSnippetFileName,
        'videoVendorUrl': videoVendorUrl,
        'description': description,
        'featured': featured,
      });

      const saveStatus = newProject.save();
      saveStatus.then( (result) => {

        this.setProperties({
          'title': null,
          'client': null,
          'date': null,
          'category': null,
          'videoSnippetFileName': null,
          'videoVendorUrl': null,
          'description': null,
          'featured': false,
          'videoUploadStatus': null,
        });
      }).catch( e => {
        console.log('Error while saving project', e);
      });
    },

    toggleCreateProject(){
      const isCreating = this.get('isCreatingProject');
      this.set('isCreatingProject', !isCreating);
    },
  },
});
