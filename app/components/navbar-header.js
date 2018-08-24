import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
  classNameBindings: ['isLanding'],

  menuOpen: false,

  isLanding: computed('route', function () {
    const isLanding = this.get('route') === 'index' ? 'isLanding' : '';
    return isLanding;
  }),

  actions: {
    toggleMenu: function (open) {
      const isOpen = typeof(open) !== "undefined" ? open : !this.get('menuOpen');
      this.set('menuOpen', isOpen);

      if ($('.landing__info')) {
        $('.landing__info').toggleClass('menuOpen', isOpen);
      }
    },
    signOut: function () {
      this.get('session').close();
    },
  }
});
