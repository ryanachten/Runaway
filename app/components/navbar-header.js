import Component from '@ember/component';

export default Component.extend({
  actions: {
    signOut: function () {
      this.get('session').close();
    },
  }
});
