import Component from '@ember/component';

export default Component.extend({
  actions: {
    showService(service){
      alert(service);
    }
  }
});
