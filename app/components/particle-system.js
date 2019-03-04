import { computed } from "@ember/object";
import Component from "@ember/component";

export default Component.extend({
  quantity: 15,
  particleCount: computed("quantity", function() {
    const times = parseInt(this.get("quantity"));
    return new Array(times);
  })
});
