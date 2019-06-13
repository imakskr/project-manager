import Service from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Service.extend({

    accessToken: null,
    username: null,
    isActiveSession: false,
    ajaxService: computed(function(){
        return getOwner(this).lookup('service:ajaxservice');
    }),
    user_info: null,

    login: function(token){
        // this.set("accessToken", token);
        return this.getUserInfo(token);   
    },
    getUserInfo: function(token){
        var url="https://api.github.com/user";
        var self=this;
        var response=this.ajaxService.getResponse(url, token);
        // this.ajaxService.getFromServer(url,false, this.get("accessToken")).then(function(data) {
        //     // console.log(data);
        //     self.updateUserInfo(data);
        //   }, function(err) {
        //     console.log(err);
        //   });
        // var response=this.ajaxService.getFromServer(url, false, this.get("accessToken"));
        if(response.login!=null){
            this.enableSession(response, token);
            return true;
        }else{
            return false;
        }
    },
    enableSession: function(response,token){
        this.user_info=response;
        this.username=response.login;
        this.isActiveSession=true;
        this.accessToken=token;
    },
    invalidateSession: function(){
        this.user_info=null;
        this.userrname=null;
        this.isActiveSession=false;
    }

});
