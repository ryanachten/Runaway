import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default Controller.extend({
  email: null,
  password: null,
  errorMessage: null,

  route: computed('currentRouteName', function () {
    return this.get('currentRouteName');
  }),
});
