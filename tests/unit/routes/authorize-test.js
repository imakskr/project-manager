import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | authorize', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:authorize');
    assert.ok(route);
  });
});
