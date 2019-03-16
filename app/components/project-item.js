import Component from "@ember/component";
import { inject } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  store: inject(),
  videoPlayer: null,
  videoElement: null,
  videoError: false,
  isEditing: false,
  authed: false,

  canEdit: computed("isEditing", "authed", function() {
    const isEditing = this.get("isEditing");
    const authed = this.get("authed");
    return authed && isEditing;
  }),

  mouseEnter() {
    const player = this.get("videoPlayer");
    if (!player || this.get("isEditing")) {
      return;
    }
    player.play();
  },

  mouseLeave() {
    const player = this.get("videoPlayer");
    if (!player || this.get("isEditing")) {
      return;
    }
    player.pause();
  },

  showProjectItem() {
    $(this.get("element"))
      .children(".project-item")
      .fadeIn(2000);
  },

  actions: {
    toggleEditProject() {
      const isEditing = this.get("isEditing");
      this.set("isEditing", !isEditing);
    },

    toggleFeatured(featured) {
      const id = this.get("project.id");
      const store = this.get("store");
      store
        .findRecord("project", id, { backgroundReload: false })
        .then(record => {
          record.set("featured", featured);
          record.save();
        });
    },

    editProject(project) {
      const store = this.get("store");
      store
        .findRecord("project", project.id, { backgroundReload: false })
        .then(record => {
          record.set("title", project.title);
          record.set("client", project.client);
          record.set("date", project.date);
          record.set("category", project.category);
          record.set("videoSnippetUrl", project.videoSnippetUrl);
          record.set("videoVendorUrl", project.videoVendorUrl);
          record.set("description", project.description);
          record.save();
        });
    },

    deleteProject(id) {
      const store = this.get("store");
      store
        .findRecord("project", id, { backgroundReload: false })
        .then(record => {
          record.deleteRecord();
          record.save();
        });
    },

    canplay(player, component) {
      this.set("videoPlayer", player);
      this.set("videoElement", component.get("element"));
      this.showProjectItem();
    },

    error() {
      this.set("videoError", true);
      this.showProjectItem();
    }
  }
});
