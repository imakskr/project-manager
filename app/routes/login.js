import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Route.extend({
    sessionService: computed(function(){
        return getOwner(this).lookup('service:session-manager');
    }),
    redirect: function(){
        if(this.sessionService.isActiveSession){
            this.transitionTo("homepage");
        }
    }
});
