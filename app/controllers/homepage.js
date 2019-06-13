import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';


export default Controller.extend({
    isLoggedIn: false,
    sessionService: computed(function(){
        return getOwner(this).lookup('service:session-manager');
    }),
    ajaxService: computed(function(){
        return getOwner(this).lookup('service:ajaxservice');
    }),
    menu: [{"title": "Show repo", "action": "showrepo"},{"title": "Capture image", "action": "capture"}],

    init: function(){
        this._super();
        this.set("isLoggedIn", this.sessionService.isActiveSession);
        this.set("username", this.sessionService.username);
    },
    actions: {
        logout: function(){
            this.sessionService.invalidateSession();
            this.get('target').transitionTo("login");
        },
        showrepo: function(){
            var url = "https://api.github.com/user/repos";
            var param="?visibility=all&sort=created&direction=asc";
            var response = this.ajaxService.getResponse(url+param, this.sessionService.accessToken);
            if(response.length>0){
                this.set("repoList", response);
            }else{
                console.log("Error while fetching repo!");
            }
            
        },
        capture: function(){
            navigator.getUserMedia = ( navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);

                if (navigator.getUserMedia) {
                    navigator.getUserMedia (         
                       // constraints
                       {
                          video: true,
                          audio: false
                       },         
                       // successCallback
                       function(localMediaStream) {
                           video = document.querySelector('video');
                          video.src = window.URL.createObjectURL(localMediaStream);
                          webcamStream = localMediaStream;
                       },
                       // errorCallback
                       function(err) {
                          console.log("The following error occured: " + err);
                       }
                    );
                 } else {
                    console.log("getUserMedia not supported");
                 }
        }
    }
});
