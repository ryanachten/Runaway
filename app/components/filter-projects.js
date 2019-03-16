import Component from "@ember/component";

const filterValues = ["film", "animation", "motion graphics"];

export default Component.extend({
  classNames: ["filter-projects"],
  value: "",
  filtersValues: filterValues,

  init() {
    this._super(...arguments);
    this.resetFilter();
  },

  resetFilter() {
    this.get("filter")("").then(allResults => {
      this.set("results", allResults.results);
    });
  },

  actions: {
    handleFilterEntry(selectedFilter) {
      const existingFilter = this.get("value");
      const filterValue =
        selectedFilter === existingFilter ? "" : selectedFilter;
      this.set("value", filterValue);

      // If filter already is active, reset to none
      if (!filterValue) {
        this.$(event.target).removeClass("selected");
        return this.resetFilter();
      }

      // Otherwise, filter by selected filter
      let filterAction = this.get("filter");
      filterAction(filterValue).then(filterResults => {
        this.set("results", filterResults.results);
      });

      if (this.$(".selected")) {
        this.$(".selected").removeClass("selected");
      }
      this.$(event.target).addClass("selected");
    }
  }
});
