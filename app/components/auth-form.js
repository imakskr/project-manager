import Component from '@ember/component';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Component.extend({
    sessionManager: computed(function(){
        return getOwner(this).lookup('service:sessionManager');
    }),
    authErrorMessage: "",
    isValidToken: function(){
        return this.get("token")!=null;
    },
    actions: {
        doAuth: function(){
           
            if(this.isValidToken()){
                    this.send('login');
            }else{
                this.send("postAuthErrorMessage" ,"Enter a token!");
            }
        },
        postAuthErrorMessage: function(validatedMessage){
            this.set("authErrorMessage", validatedMessage);
        } ,
        login: function(){
            this.sessionManager.login(this.get('token'));
        }     
    }
});
