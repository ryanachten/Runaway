import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  store: service(),

  title: null,
  client: null,
  date: null,
  category: null,
  videoSnippetFileName: null,
  videoVendorUrl: null,
  description: null,
  featured: false,

  isAbleToCreateProject: computed(
    "title",
    "client",
    "date",
    "category",
    "description",
    "videoSnippetFileName",
    function() {
      const {
        title,
        client,
        date,
        category,
        description,
        videoSnippetFileName
      } = this.getProperties(
        "title",
        "client",
        "date",
        "category",
        "description",
        "videoSnippetFileName"
      );
      return (
        title &&
        client &&
        date &&
        category &&
        description &&
        videoSnippetFileName
      );
    }
  ),

  actions: {
    createProject(
      title,
      client,
      date,
      category,
      videoVendorUrl,
      videoSnippetFileName,
      description,
      featured
    ) {
      if (!this.isValid) {
        return;
      }

      const store = this.get("store");

      const newProject = store.createRecord("project", {
        type: "project",
        title: title,
        client: client,
        date: date,
        category: category,
        videoSnippetFileName: videoSnippetFileName,
        videoVendorUrl: videoVendorUrl,
        description: description,
        featured: featured
      });

      const saveStatus = newProject.save();
      saveStatus
        .then(result => {
          this.setProperties({
            title: null,
            client: null,
            date: null,
            category: null,
            videoSnippetFileName: null,
            videoVendorUrl: null,
            description: null,
            featured: false,
            videoUploadStatus: null
          });
          window.console.log("Created new project:", result);
        })
        .catch(e => {
          window.console.log("Error while saving project:", e);
        });
    },

    closeForm() {
      this.closeForm();
    }
  }
});
