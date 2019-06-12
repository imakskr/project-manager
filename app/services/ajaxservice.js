import Service from '@ember/service';
import $ from 'jquery'

export default Service.extend({

    requestServer: function(url, type){
        return new Promise(function(resolve, reject){
            $.ajax({
                url: url,
                type: type,
                async: true,
                dataType: "json",
                success: function(data){
                    resolve(data);
                },
                error: function(err){
                    reject(err);
                }
            });
        });

    }
});
