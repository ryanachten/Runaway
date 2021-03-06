import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("about");
  this.route("work", function() {
    this.route("show", { path: "/:project_id" });
  });
  this.route("login");
});

export default Router;
