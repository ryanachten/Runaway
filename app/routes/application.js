import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  session: inject(),

  beforeModel() {
    return this.get('session').fetch().catch(function () {});
  },

  actions: {
    signIn: function (provider) {
      console.log('sign in!');
      this.get('session').open('firebase', {
        provider: 'password',
        email: 'test@example.com',
        password: 'password123'
      });
    },
    signOut: function () {
      console.log('sign out!');
      this.get('session').close();
    },
  },
});
