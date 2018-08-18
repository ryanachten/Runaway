import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return this.get('store').findAll('message');
  },

  actions: {
    // Reset message response after leaving page
    didTransition(){
      this.get('controller').set('messageResponse', null);
    }
  }
});
