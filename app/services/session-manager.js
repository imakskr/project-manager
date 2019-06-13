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

    login: function(token){
        this.set("accessToken", token);
        this.getUserName();
    },
    getUserName: function(){
        var url="https://api.github.com/user";
        this.ajaxService.getFromServer(url,false, this.get("accessToken")).then(function(data) {
            console.log(data);
          }, function(err) {
            console.log(err);
          });
    }

});
