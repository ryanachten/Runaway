import Component from '@ember/component';
import {inject} from '@ember/service';
import {computed} from '@ember/object';

export default Component.extend({
  store: inject(),
  firebaseApp: Ember.inject.service(),

  videoPlayer: null,
  videoElement: null,
  isEditing: false,
  authed: false,

  canEdit: computed('isEditing', 'authed', function () {
    const isEditing = this.get('isEditing');
    const authed = this.get('authed');
    return authed && isEditing;
  }),

  mouseEnter(){
    const player = this.get('videoPlayer');
    if (!player || this.get('isEditing')) {
      return;
    }
    player.play();
  },

  mouseLeave(){
    const player = this.get('videoPlayer');
    if (!player || this.get('isEditing')) {
      return;
    }
    player.pause();
  },

  removeVideo(fileName){
    console.log('fileName', fileName);
    const storage = this.get('firebaseApp').storage().ref();
    const videoRef = storage.child(`videos/${fileName}`);
    console.log('videoRef', videoRef);
    return videoRef.delete()
  },

  actions: {

    toggleEditProject(){
      const isEditing = this.get('isEditing');
      this.set('isEditing', !isEditing);
    },

    toggleFeatured(featured){
      const id = this.get('project.id');
      const store = this.get('store');
      store.findRecord('project', id, { backgroundReload: false }).then((record) => {
        record.set('featured', featured);
        record.save();
      });
    },

    editProject(project){

      const store = this.get('store');
      store.findRecord('project', project.id, { backgroundReload: false }).then((record) => {
        record.set('title', project.title);
        record.set('client', project.client);
        record.set('date', project.date);
        record.set('category', project.category);
        record.set('videoSnippetUrl', project.videoSnippetUrl);
        record.set('videoVendorUrl', project.videoVendorUrl);
        record.set('description', project.description);
        record.save();
      });
    },

    deleteProject(id){
      const store = this.get('store');
      store.findRecord('project', id, { backgroundReload: false }).then((record) => {
        const fileName = record.get('videoSnippetFileName');
        this.removeVideo(fileName).then( () => {
          console.log('deleted video successfully');
          // record.deleteRecord();
          // record.get('isDeleted');
          // record.save();
        }).catch((error) => {
          console.log('error deleting video');
        });
      });
    },

    canplay(player, component) {
      this.set('videoPlayer', player);
      this.set('videoElement', component.get('element'));
    },
  }
});
