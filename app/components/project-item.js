import Component from '@ember/component';
import {inject} from '@ember/service';
import {computed} from '@ember/object';

export default Component.extend({
  store: inject(),

  videoPlayer: null,
  videoElement: null,
  isEditing: false,
  authed: false,

  canEdit: computed('isEditing', 'authed', function () {
    const isEditing = this.get('isEditing');
    const authed = this.get('authed');
    return authed && isEditing;
  }),

  actions: {

    toggleEditProject(){
      const isEditing = this.get('isEditing');
      this.set('isEditing', !isEditing);
    },

    editProject(project){
      const store = this.get('store');
      store.findRecord('project', project.id, { backgroundReload: false }).then((record) => {
        record.set('title', project.title);
        record.set('client', project.client);
        record.set('date', project.date);
        record.set('category', project.category);
        record.set('description', project.description);
        record.save();
      });
    },

    deleteProject(id){
      const store = this.get('store');
      store.findRecord('project', id, { backgroundReload: false }).then((record) => {
        record.deleteRecord();
        record.get('isDeleted');
        record.save();
      });
    },

    canplay(player, component) {
      this.set('videoPlayer', player);
      this.set('videoElement', component.get('element'));
    },

    ended() {
      console.log('video ended');
    },

    pause() {
      console.log('video is paused');
    },

    playing() {
      console.log('video is playing');
    }
  }
});
