import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {resolve} from 'rsvp';

const ITEMS = [{category: 'animation'}, {category: 'film'}, {category: 'motion graphics'}];
const FILTERED_ITEMS = [{category: 'animation'}];

module('Integration | Component | filter-projects', function(hooks) {
  setupRenderingTest(hooks);

  test('Should show all projects by default', async function (assert) {
    // Want actions to return promises
    // Since potentially fetching data asynchronously
    this.set('filterByCategory', () => resolve({ results: ITEMS }));

    // Render component using test data
    await render(hbs`
      {{#filter-projects filter=(action filterByCategory) as |results|}}
        <ul>
          {{#each results as |item|}}
            <li class="category">
              {{item.category}}
            </li>
          {{/each}}
        </ul>
      {{/filter-projects}}
    `);
    return settled().then( () => {
      assert.equal(this.element.querySelectorAll('.category').length, 3);
      assert.equal(this.element.querySelector('.category').textContent.trim(), 'animation');
    });
  });

  test('Should update with matching listings', async function (assert) {

    this.set('filterByCategory', (val) => {
      if (val === '') {
        return resolve({
          query: val,
          results: ITEMS });
      }else{
        return resolve({
          query: val,
          results: FILTERED_ITEMS });
      }
    });

    await render(hbs`
      {{#filter-projects filter=(action filterByCategory) as |filteredResults|}}
        <ul>
          {{#each filteredResults as |item|}}
            <li class="category">
              {{item.category}}
            </li>
          {{/each}}
        </ul>
      {{/filter-projects}}
    `);

    // Click on the animation radio input
    await click('.filter__check--animation');

    return settled().then( () => {
      assert.equal(this.element.querySelectorAll('.category').length, 1, '1 result returned');
      assert.equal(this.element.querySelector('.category').textContent.trim(), 'animation');
    });
  });
});
