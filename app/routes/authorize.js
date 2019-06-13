import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Route.extend({
    authorizer: computed(function(){
        return getOwner(this).lookup('service:authenticator');
    }),
    model: function(params){
        // this.authorizer.getAccessToken(params);
        return params;
    }
});
