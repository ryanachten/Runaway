import { module, test } from "qunit";
import { click, visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | list projects", function(hooks) {
  setupApplicationTest(hooks);

  test("Should list projects projects on landing page", async function(assert) {
    await visit("/");
    assert.equal(
      this.element.querySelectorAll(".project-item").length,
      4,
      "Should display 4 projects"
    );
  });

  test("Should play snippet when user hovers over project", async function(assert) {});

  test("Should should link to project video when project is clicked", async function(assert) {});

  test("Should filter projects based on category", async function(assert) {
    await visit("/work");
    await click(".filter__check--animation");
    assert.ok(
      this.element
        .querySelector(".project-item__category")
        .textContent.includes("animation"),
      "Listing should have a category of animation"
    );
  });

  test("Should link to pages for a specifc project", async function(assert) {
    await visit("/");
    await click(".project-item__link .bulwagan-foundation");
    assert.equal(
      currentURL(),
      "/work/bulwagan-foundation",
      "Should navigate to project route"
    );
    assert.ok(
      this.element
        .querySelector("h1")
        .textContent.includes("Philippines Festival 2017"),
      "Should render title of the project"
    );
  });

  test("Should link to Work page", async function(assert) {
    await visit("/");
    await click(".navbar__link--work");
    assert.equal(currentURL(), "/work", "Should navigate to Work page");
  });

  test("Should link to About page", async function(assert) {
    await visit("/");
    await click(".navbar__link--about");
    assert.equal(currentURL(), "/about", "Should navigate to About page");
  });
});
