
import Service from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Service.extend({
    authToken: null,
    ajaxservice: computed(function(){
        return getOwner(this).lookup('service:ajaxservice');
    }),

    authenticate: function(username, password){
       
        var url="https://api.github.com";
        this.ajaxservice.requestServer(url, "GET").then(function(data) {
            console.log(data);
          }, function(err) {
            console.log(err);
          });
        
    }
});
