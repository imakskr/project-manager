import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Controller.extend({


    sessionService: computed(function(){
        return getOwner(this).lookup('service:session-manager');
    }),
    
    actions:{
        doAuth: function(){
            if(this.get("token")==null){
                this.send("postErrorBanner", "Enter your personal access token!");
            }else{
                var loginStatus=this.sessionService.login(this.get("token"));
                if(loginStatus){
                    this.set("username", this.sessionService.username);
                    console.log("user name", this.get("username"));
                    this.set("token",null);
                    this.get('target').transitionTo("homepage");
                }else{
                    this.send("postErrorBanner","Failed to login!");
                }
            }
        },
        postErrorBanner: function(message){
            this.set("authErrorMessage", message);
        }
    }

});
