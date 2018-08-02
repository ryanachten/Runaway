import Component from '@ember/component';
import {inject} from '@ember/service';
import ProjectItem from './project-item';


export default ProjectItem.extend({
  store: inject(),

  actions: {
    editProject(project){
      const store = this.get('store');
      store.findRecord('project', project.id, { backgroundReload: false }).then((record) => {
        record.set('title', project.title);
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
  }
});
