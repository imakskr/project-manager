import Component from '@ember/component';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Component.extend({
    sessionManager: computed(function(){
        return getOwner(this).lookup('service:sessionManager');
    })
});
