import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({

  classNameBindings: ['isIndex'],

  isIndex: computed('route', function () {
    const route = this.get('route') === 'index' ? 'isIndex' : '';
    return route;
  }),

  actions: {
    signOut: function () {
      this.get('session').close();
    },
  }
});
