(function($) {
    $.ajax({
        type: 'post',
        url: 'http://loginapi.hjkim.c9.io/login',
        data: {
            'user_id':"NT10599",
            'user_password':"NT10599"
        },
        dataType: 'json',
        success: function(data) {
            console.log('success');
            console.log(data);
        },
        error: function(){
            console.log('error');
        }
    });
})(jQuery);