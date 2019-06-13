import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';


export default Controller.extend({
    
    sessionService: computed(function(){
        return getOwner(this).lookup('service:session-manager');
    }),
    ajaxService: computed(function(){
        return getOwner(this).lookup('service:ajaxservice');
    }),
    isLoggedIn: false,
    repoViewEnabled: false,
    captureMode: false,
    menu: [{"title": "View repositories", "action": "showrepo"},{"title": "Capture image", "action": "capture"}, {"title": "Logout", "action": "logout"}],
    webcamStream: null,
    video: null,
    canvas: null,
    context: null,
    init: function(){
        this._super();
        this.set("isLoggedIn", this.sessionService.isActiveSession);
        this.set("username", this.sessionService.username);
    },
    actions: {
        logout: function(){
            this.set("repoViewEnabled", false);
            this.set("captureMode",false);
            this.sessionService.invalidateSession();
            this.get('target').transitionTo("login");
        },
        showrepo: function(){
            // this.get('target').transitionTo("showrepo");

            var url = "https://api.github.com/user/repos";
            var param="?visibility=all&sort=created&direction=asc";
            var response = this.ajaxService.getResponse(url+param, this.sessionService.accessToken);
            if(response.length>0){
                this.set("repoList", response);
                this.send("toggleRepoView");
            }else{
                console.log("Error while fetching repo!");
            }
            
        },
        toggleRepoView: function(){
            this.set("imageCapture",false);
            this.set("repoViewEnabled", !this.get("repoViewEnabled"));
        },
        selectRepo:function(repo_id){
            
        },
        capture: function(){
            this.set("repoViewEnabled", false);
            this.set("imageCapture",true);
            
            navigator.getUserMedia = ( navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);

            var constraints={ video: true, audio: false };

            if (navigator.getUserMedia) {
                navigator.getUserMedia (constraints,
                    function(blob) {
                        var video = document.querySelector('video');
                        video.src = window.URL.createObjectURL(blob);
                        this.set("webcamStream", blob);
                        this.set("video",video);
                    },
                    function(err) {
                        console.log("The following error occured: " + err);
                    }
                );
            } else {
            console.log("getUserMedia not supported");
            }  
                     
        },
        stopCamStream: function(){
            if(this.get("webcamStream")!=null){
                this.get("webcamStream").stop();
            }
        },
        snap: function(){
            this.set("canvas", document.getElementById("myCanvas"));
            this.set("context",this.get("canvas").getContext('2d')); 
            this.get("context").drawImage(this.get("video"), 0,0, this.get("canvas").width, this.get("canvas").height);
        }
    }
});
