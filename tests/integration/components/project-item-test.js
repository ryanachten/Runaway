import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | project-item', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.project = EmberObject.create({
      title: "test-title",
      client: "test-client",
      date: "test-date", //TODO: perhaps replace w/ Moment
      image: "fake.png",
      description: "test-description"
    });
  });

  test('Should display project information', async function (assert) {
    await render(hbs`{{project-item project=project}}`);
    assert.equal(this.$('.project-item h3').text(), 'test-title', 'Title: test-title');
    assert.equal(this.$('.project-item p').text(), 'test-description', 'Description: test-description');
  });

  test('Should toggle wide class on click', async function (assert) {
    await render(hbs`{{project-item project=project}}`);
    assert.notOk(this.element.querySelector('.image.wide'), 'Initially rendered small');
    await click('.image');
    assert.ok(this.element.querySelector('.image.wide'), 'Render wide after click');
    await click('.image');
    assert.notOk(this.element.querySelector('.image.wide'), 'Render small again after second click');
  });
});
