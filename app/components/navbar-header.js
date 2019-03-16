import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  classNameBindings: ["isLanding", "isShowProject"],

  menuOpen: false,

  isLanding: computed("route", function() {
    const isLanding = this.get("route") === "index" ? "isLanding" : "";
    return isLanding;
  }),

  isShowProject: computed("route", function() {
    const isShowProject =
      this.get("route") === "work.show" ? "isShowProject" : "";
    return isShowProject;
  }),

  actions: {
    toggleMenu: function(open) {
      const isOpen = typeof open !== "undefined" ? open : !this.get("menuOpen");
      this.set("menuOpen", isOpen);

      if (this.$(".landing__title")) {
        const landingTitle = this.$(".landing__title")[0];
        this.$(landingTitle).toggleClass("menuOpen", isOpen);
      }
    },
    signOut: function() {
      this.get("session").close();
    }
  }
});
