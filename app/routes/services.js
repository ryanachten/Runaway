import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return ['Development and Strategy', 'On-set Production', 'Cut, Colour and Sound', 'Animation and VFX'];
  }
});
