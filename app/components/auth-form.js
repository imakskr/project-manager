import Component from '@ember/component';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Component.extend({
    authenticator: computed(function(){
        return getOwner(this).lookup('service:authenticator');
    }),
    authErrorMessage: "",
    isValidUsername: function(){
        return this.get("username")!=null;
    },
    isValidPassword: function(){
        return this.get("password")!=null;
    },
    validateInput: function(){
        if(!this.isValidUsername() || !this.isValidPassword()){
            return "Please check the credentials!";
        }else{
            return "VALID_INPUT";
        }
    },
    actions: {
        doAuth: function(){
            var validatedMessage=this.validateInput("validateInput");
            if("VALID_INPUT"==validatedMessage){
                    this.send('authenticateUser');
            }else{
                this.send("postAuthErrorMessage" ,validatedMessage);
            }
        },
        postAuthErrorMessage: function(validatedMessage){
            this.set("authErrorMessage", validatedMessage);
        } ,
        authenticateUser: function(){
            this.authenticator.authenticate(this.get('username'), this.get('password'));
        }     
    }
});
