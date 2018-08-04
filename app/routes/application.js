import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  session: inject(),

  beforeModel() {
    return this.get('session').fetch().catch(function () {});
  },

  setErrorMessage(error){
    if (error.code === 'auth/invalid-email') {
      this.controller.set('errorMessage', 'Oops, please check your email');
    }
    else{
      this.controller.set('errorMessage', error.message);
    }
  },

  resetErrorMessage(){
    this.controller.set('errorMessage', null);
  },

  actions: {
    signIn: function (email, password) {
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password,
      }).then( () => {
        this.resetErrorMessage();
      }).catch( (e) => {
        this.setErrorMessage(e);
      });
    },
    signOut: function () {
      this.get('session').close();
    },
  },
});
