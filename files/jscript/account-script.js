$("form").submit(function(e){
    e.preventDefault();
    $.ajax({
        type: 'Post',
        url: "files/finish_session.php",
        success: function(data){
            window.location.href = "signin.html";
        }
    })
})

function start_session(){
    $.ajax({
        type: 'Post',
        url: "files/start_session.php",
        data: $(this).serialize(),
        success: function(data){
            var jsond = JSON.parse(data);
            if(jsond.result=="0")
                window.location.href = "signin.html";
            else
                document.getElementsByTagName("h1")[0].innerText="Hello, "+jsond.result;
        }
    })
}