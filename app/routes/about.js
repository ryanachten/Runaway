import Route from '@ember/routing/route';

export default Route.extend({

  model(){
    const authenticated = this.get('session.isAuthenticated');
    if (authenticated) {
      return this.get('store').findAll('message');
    }
    return null;
  },

  actions: {
    // Reset message response after leaving page
    didTransition(){
      this.get('controller').set('messageResponse', null);
    }
  }
});
