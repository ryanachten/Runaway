import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  session: inject(),

  beforeModel() {
    return this.get('session').fetch().catch(function () {});
  },

  actions: {
    signIn: function (email, password) {
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password,
      });
    },
    signOut: function () {
      this.get('session').close();
    },
  },
});
