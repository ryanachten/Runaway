import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default Controller.extend({
  firebaseApp: Ember.inject.service(),

  isCreatingProject: false,

  videoUploadStatus: null,
  isAbleToCreateProject: computed('title', 'client', 'date', 'category', 'description', 'videoUploadUrl', 'videoUploadStatus', function () {
    const {title, client, date, category, description, videoUploadUrl} = this.getProperties('title', 'client', 'date', 'category', 'description', 'videoUploadUrl');

    return title && client && date && category && description && videoUploadUrl && this.get('videoUploadStatus') === 'success';
  }),

  title: null,
  client: null,
  date: null,
  category: null,
  videoUploadUrl: null,
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

    createProject(title, client, date, category, videoVendor, description, featured){
      if (!this.get('isAbleToCreateProject')) {
        return;
      }

      const store = this.get('store');
      const videoUploadUrl = this.get('videoUploadUrl');

      const newProject = store.createRecord('project', {
        'type': "project",
        'title': title,
        'client': client,
        'date': date,
        'category': category,
        'videoLocal': videoUploadUrl,
        'videoVendor': videoVendor,
        'description': description,
        'featured': featured,
      });

      const saveStatus = newProject.save();
      saveStatus.then( (result) => {
        console.log('Saved project successfully', result);

        this.setProperties({
          'title': null,
          'client': null,
          'date': null,
          'category': null,
          'videoLocal': null,
          videoUploadUrl: null,
          'videoVendor': null,
          'description': null,
          'featured': false,
          'videoUploadStatus': null,
        });
      }).catch( e => {
        console.log('Error while saving project', e);
      });
    },

    uploadVideo(e){
      this.set('videoUploadStatus', 'pending');

      const storage = this.get('firebaseApp').storage().ref();
      const video = e.target.files[0];
      const newVideoRef = storage.child(`videos/${video.name}`);
      newVideoRef.put(video).then( (snapshot) => {

        newVideoRef.getDownloadURL().then((url) => {
          if (url) {
            this.set('videoUploadUrl', url);
          }
        });

        this.set('videoUploadStatus', 'success');
      }).catch( (e) => {

        this.set('videoUploadStatus', 'failed');
        console.log('Upload video error', e);
      });

    },

    toggleCreateProject(){
      const isCreating = this.get('isCreatingProject');
      this.set('isCreatingProject', !isCreating);
    },
  },
});
