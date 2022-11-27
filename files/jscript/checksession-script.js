function start_session(){
    $.ajax({
        type: 'Post',
        url: "files/start_session.php",
        data: $(this).serialize(),
        success: function(data){
            var jsond = JSON.parse(data);
            if(jsond.result!="0")
                window.location.href = "account.html";
        }
    })
}