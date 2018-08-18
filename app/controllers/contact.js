import { computed, observer } from '@ember/object';
import { not, match, empty } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  fullName: '',
  emailAddress: '',
  message: '',
  response: '',

  messages: null,

  isValidEmail: match('emailAddress', /^.+@.+\..+$/),

  submitDisabled: computed('fullName', 'isValidEmail', 'message', function () {
    // Only return false if the all of the fields have been filled out
    // and if the email input is a valid email address pattern
    return !this.get('isValidEmail') || this.get('fullName') === '' || this.get('message') === '';
  }),

  responseMessage: '',

  init(){
    this.get('store').findAll('message').then( (records) => {
      this.set('messages', records);
    });
  },

  actions: {
    sendMessage(fullName, emailAddress, message){

      const newMessage = this.get('store').createRecord('message', {
        'name': fullName,
        'date': new Date(),
        'emailAddress': emailAddress,
        'message': message
      });
      newMessage.save();

      this.set('fullName', '');
      this.set('emailAddress', '');
      this.set('message', '');

      const response = `Thanks for your interest! We'll get back to you at ${emailAddress}`;
      alert(response);
    },
  }
});
