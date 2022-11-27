$("form").submit(function(e){
    e.preventDefault();
    $.ajax({
        type: 'Post',
        url: "files/signin_user.php",
        data: $(this).serialize(),
        success: function(data){
            var jsond = JSON.parse(data);
            if(jsond.result=="1"){
                document.getElementsByName("error-login")[0].style.display="block";
                document.getElementsByName("error-pass")[0].style.display="none";
            }
            else{
                if(jsond.result=="2"){
                    document.getElementsByName("error-login")[0].style.display="none";
                    document.getElementsByName("error-pass")[0].style.display="block";
                }
                else{
                    document.getElementsByName("error-login")[0].style.display="none";
                    document.getElementsByName("error-pass")[0].style.display="none";
                    window.location.href = "account.html";
                }
            }
        }
    })
})