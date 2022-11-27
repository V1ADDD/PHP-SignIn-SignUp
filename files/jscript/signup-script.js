$("form").submit(function(e){
    e.preventDefault();  
    $("input").blur();
    if(document.getElementsByName("error-name")[0].style.display=="none" && document.getElementsByName("error-login")[0].style.display=="none" &&
    document.getElementsByName("error-email")[0].style.display=="none" && document.getElementsByName("error-pass")[0].style.display=="none" &&
    document.getElementsByName("error-pass2")[0].style.display=="none"){
        $.ajax({
            type: 'Post',
            url: "files/add_user.php",
            data: $(this).serialize(),
            success: function(data){
                var jsond = JSON.parse(data);
                if(jsond.result=="1"){
                    document.getElementsByName("error-equal-login")[0].style.display="block";
                    document.getElementsByName("success-register")[0].style.display="none";
                    document.getElementsByName("error-equal-mail")[0].style.display="none";
                }
                else{
                    if(jsond.result=="2"){
                        document.getElementsByName("error-equal-login")[0].style.display="none";
                        document.getElementsByName("success-register")[0].style.display="none";
                        document.getElementsByName("error-equal-mail")[0].style.display="block";
                    }
                    else{
                        document.getElementsByName("error-equal-login")[0].style.display="none";
                        document.getElementsByName("error-equal-mail")[0].style.display="none";
                        document.getElementsByName("success-register")[0].style.display="block";
                    }
                }
            }
        })
    }
})

$("input").blur(function(){
    document.getElementsByName("success-register")[0].style.display="none";
    if(!/^([A-Za-zА-Яа-я]){2,}$/.test(document.getElementsByName("name")[0].value) && document.getElementsByName("name")[0].value!="")
        document.getElementsByName("error-name")[0].style.display="block";
    else
        document.getElementsByName("error-name")[0].style.display="none";

    if(!/^[^ ]{6,}$/.test(document.getElementsByName("login")[0].value) && document.getElementsByName("login")[0].value!="")
        document.getElementsByName("error-login")[0].style.display="block";
    else
        document.getElementsByName("error-login")[0].style.display="none";

    if(!/^((?!\.)[\w_.]*[^.@])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(document.getElementsByName("email")[0].value) && document.getElementsByName("email")[0].value!="")
        document.getElementsByName("error-email")[0].style.display="block";
    else
        document.getElementsByName("error-email")[0].style.display="none";
    
    if(!/^(?=.*\d)(?=.*[A-Za-z])([A-Za-z0-9]){6,}$/.test(document.getElementsByName("password")[0].value) && document.getElementsByName("password")[0].value!="")
        document.getElementsByName("error-pass")[0].style.display="block";
    else
        document.getElementsByName("error-pass")[0].style.display="none";

    if(document.getElementsByName("password")[0].value!=document.getElementsByName("confirm-password")[0].value && document.getElementsByName("confirm-password")[0].value!="")
        document.getElementsByName("error-pass2")[0].style.display="block";
    else
        document.getElementsByName("error-pass2")[0].style.display="none";
});