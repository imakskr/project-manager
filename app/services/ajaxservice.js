import Service from '@ember/service';
import $ from 'jquery'

export default Service.extend({

    getResponse: function(url, token){
        var result=null;
        var headers = {};
        headers["Authorization"]="token "+token;
        $.ajax({
            url: url, 
            type: "GET",
            async: false,
            dataType: "json",
            headers: headers
        }).done(function(response){
            result=response;
        });
        return result;
    },
    requestServer: function(url, type, data, isAsync ){
        return new Promise(function(resolve, reject){
            $.ajax({
                url: url,
                type: type,
                async: isAsync,
                data: data,
                dataType: "json",
                success: function(response){
                    resolve(response);
                },
                error: function(err){
                    reject(err);
                }
            });
        });

    },
    getFromServer: function(url, token){
        return new Promise(function(resolve, reject){
            var headers = {};
            headers["Authorization"]="token "+token;
            $.ajax({
                url: url,
                type: "GET",
                async: true,
                dataType: "json",
                headers: headers,
                success: function(response){
                    resolve(response);
                },
                error: function(err){
                    reject(err);
                }
            });
        });
    }
});
