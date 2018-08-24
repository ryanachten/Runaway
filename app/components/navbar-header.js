import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
  classNameBindings: ['isLanding'],

  menuOpen: false,

  isLanding: computed('route', function () {
    const route = this.get('route') === 'index' ? 'isLanding' : '';
    return route;
  }),

  actions: {
    toggleMenu: function (open) {
      const isOpen = typeof(open) !== "undefined" ? open : !this.get('menuOpen');
      this.set('menuOpen', isOpen);
    },
    signOut: function () {
      this.get('session').close();
    },
  }
});
