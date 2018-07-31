import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  session: inject(),

  email: null,
  password: null,
  errorMessage: null,

  beforeModel() {
    return this.get('session').fetch().catch(function () {});
  },

  setErrorMessage(error){
    if (error.code === 'auth/invalid-email') {
      this.set('errorMessage', 'Oops, please check your email');
    }
    else{
      this.set('errorMessage', error.message);
    }
  },

  resetErrorMessage(){
    this.set('errorMessage', null);
  },
  
  actions: {
    signIn: function (email, password) {
      console.log(this.get('errorMessage'));
      this.get('session').open('firebase', {
        provider: 'password',
        email: email, //test@example.com
        password: password, //password123
      }).then( (arg) => {
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
