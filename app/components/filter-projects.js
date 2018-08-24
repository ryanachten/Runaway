import Component from '@ember/component';

export default Component.extend({
  classNames: ['filter-projects'],
  value: '',
  filtersValues: [
    'film',
    'animation',
    'motion graphics'
  ],

  init(){
    this._super(...arguments);
    this.resetFilter();
  },

  resetFilter(){
    this.get('filter')('').then(
      (allResults) => {
        this.set('results', allResults.results)
      }
    );
  },

  actions: {
    handleFilterEntry(selectedFilter){

      const element = event.target;

      const existingFilter = this.get('value');
      const filterValue = selectedFilter === existingFilter ? '' : selectedFilter;
      this.set('value', filterValue);

      // If filter already is active, reset to none
      if (!filterValue) {
        $(event.target).removeClass('selected');
        return this.resetFilter();
      }

      // Otherwise, filter by selected filter
      let filterAction = this.get('filter');
      filterAction(filterValue).then(
        (filterResults) => {
          this.set('results', filterResults.results)
        });

      if ($('.selected')) {
        $('.selected').removeClass('selected');
      }
      $(event.target).addClass('selected');
    }
  }
});
