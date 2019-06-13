
import Service from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Service.extend({
    accessToken: null,
    isSessionPersisted: false,
    ajaxservice: computed(function(){
        return getOwner(this).lookup('service:ajaxservice');
    }),
    bearer: null,
    client_id: "",
    state: "",
    client_secret: "",
    

    getAccessToken: function(params){
      var code=params.code;
      var state_obtained= params.state;
      //do state check      
      var url="https://github.com/login/oauth/access_token";

      var postData={};
      postData["client_id"]=this.get("client_id");
      postData ["client_secret"]=this.get("client_secret");
      postData["code"] = code;
      postData["state"] = state_obtained;

      this.ajaxservice.requestServer(url, "POST", postData, false).then(function(data) {
          console.log(data);
        }, function(err) {
          console.log(err);
        });
        
    }
});
