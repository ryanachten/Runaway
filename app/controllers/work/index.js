import Controller from '@ember/controller';

export default Controller.extend({
  firebaseApp: Ember.inject.service(),

  isCreatingProject: false,

  videoUploadStatus: null,

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
      console.log(title, client, date, category, videoLocal, videoVendor, description, featured);
      const store = this.get('store');

      console.log('videoLocal', videoLocal);

      // const newProject = store.createRecord('project', {
      //   'type': "project",
      //   'title': title,
      //   'client': client,
      //   'date': date,
      //   'category': category,
      //   'videoLocal': '/video/' + videoLocal,
      //   'videoVendor': videoVendor,
      //   'description': description,
      //   'featured': featured,
      // });

      // const saveStatus = newProject.save();
      // saveStatus.then( (result) => {
      //   console.log('Saved project successfully', result);
      //
      //   this.setProperties({
      //     'title': null,
      //     'client': null,
      //     'date': null,
      //     'category': null,
      //     'videoLocal': null,
      //     'videoVendor': null,
      //     'description': null,
      //     'featured': null,
      //   });
      // }).catch( e => {
      //   console.log('Error while saving project', e);
      //   console.log('e.error', e.error);
      // });
    },

    uploadVideo(e){
      this.set('videoUploadStatus', 'pending');

      const storage = this.get('firebaseApp').storage().ref();
      const video = e.target.files[0];
      const newVideoRef = storage.child(`videos/${video.name}`);
      const linkRef = newVideoRef.put(video).then( (snapshot) => {
        console.log('snapshot', snapshot);
        console.log('linkRef', linkRef);

        newVideoRef.getDownloadURL().then(function(url) {
          console.log('video download url', url);
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
