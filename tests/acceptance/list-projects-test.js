import { module, test } from 'qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | list projects', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Should list projects projects on landing page', async function (assert) {
    await visit('/');
    assert.equal(this.element.querySelectorAll('.project-item').length, 4, 'Should display 4 projects');
  });

  test('Should play snippet when user hovers over project', async function (assert) {
  });

  test('Should should link to project video when project is clicked', async function (assert) {
  });

  test('Should filter projects based on category', async function (assert) {
    await visit('/work');
    await click('.filter__check--animation');
    assert.ok(this.element.querySelector('.project-item__category').textContent.includes('animation'), 'Listing should have a category of animation');
  });

  test('Should link to Work page', async function (assert) {
    await visit('/');
    await click('.menu__work');
    assert.equal( currentURL(), '/work', 'Should navigate to Work page' );
  });

  test('Should link to About page', async function (assert) {
    await visit('/');
    await click('.menu__about');
    assert.equal( currentURL(), '/about', 'Should navigate to About page' );
  });

  test('Should link to Contact page', async function (assert) {
    await visit('/');
    await click('.menu__contact');
    assert.equal( currentURL(), '/contact', 'Should navigate to Contact page' );
  });

});
