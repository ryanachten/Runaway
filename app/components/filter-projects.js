import Component from '@ember/component';

export default Component.extend({
  classNames: ['filter-projects'],
  value: '',

  init(){
    this._super(...arguments);
    this.get('filter')('').then(
      (allResults) => {
        this.set('results', allResults.results)
      }
    );
  },

  actions: {
    handleFilterEntry(checkedRadio){
      let filterInputValue = checkedRadio;//this.get('value');
      let filterAction = this.get('filter');
      filterAction(filterInputValue).then(
        (filterResults) => {
          this.set('results', filterResults.results)
        });
    }
  }
});
