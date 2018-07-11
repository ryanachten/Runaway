import Component from '@ember/component';
import three from 'three';

export default Component.extend({
  init(){
    this._super(...arguments);
    console.log('init man');
    console.log(three);
  }
});
