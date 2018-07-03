import { computed, observer } from '@ember/object';
import { not, match, empty } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  fullName: '',
  emailAddress: '',
  message: '',

  isValidEmail: match('emailAddress', /^.+@.+\..+$/),

  submitDisabled: computed('fullName', 'isValidEmail', 'message', function () {

    // Only return false if the all of the fields have been filled out
    // and if the email input is a valid email address pattern
    return !this.get('isValidEmail') || this.get('fullName') === '' || this.get('message') === '';
  }),
});
