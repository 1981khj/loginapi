(function($) {
    $.urlParam = function(name){
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }
    
    $.ajax({
        type: 'post',
        url: 'http://loginapi.hjkim.c9.io/userinfo',
        data: {
            'ticket_id': $.urlParam('ticket')
        },
        dataType: 'json',
        success: function(data) {
            console.log('success');
            console.log(data);
            if(data){
                console.log(data.userId);
                console.log(data.userNickName);
                for(var i=0; i<data.groups.length; i++){
                    console.log("Group Name: "+data.groups[i].group_name+ " Group Is Open: "+data.groups[i].group_open);
                    if(data.groups[i].group_member){
                        for(var j=0; j<data.groups[i].group_member.length; j++){
                            console.log("Group UserID: " + data.groups[i].group_member[j].user_id + " UserNickname: "+data.groups[i].group_member[j].user_nickname);                            
                        }
                    }
                }
            }
            
        },
        error: function(){
            console.log('error');
        }
    });    
})(jQuery);