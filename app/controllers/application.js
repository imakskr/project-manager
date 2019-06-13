import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';


export default Controller.extend({
    loginService: computed(function(){
        return getOwner(this).lookup('service:authenticator');
    }),
    actions: {
        signin: function(){
            var client_id=this.loginService.client_id;
            var state=this.loginService.state;
            var redirect_uri="http://localhost:4300";
            var url= "https://github.com/login/oauth/authorize?client_id="+client_id+"&redirect_uri="+redirect_uri+"&scope=repo&state="+state;
            window.location=url;
        }
    }
});
