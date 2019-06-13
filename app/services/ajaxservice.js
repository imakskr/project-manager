import Service from '@ember/service';
import $ from 'jquery'

export default Service.extend({

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
    getFromServer: function(url, isAsync, token){
        return new Promise(function(resolve, reject){
            var headers = {};
            headers["Authorization"]="token "+token;
            $.ajax({
                url: url,
                type: "GET",
                async: isAsync,
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
