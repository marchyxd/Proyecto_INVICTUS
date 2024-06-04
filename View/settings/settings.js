$(".div-msg").fadeIn();
setTimeout(function () {
    $(".div-msg").fadeOut();
}, 1500);

$("#back").click(function () {
    $("#confirmacion").css("display", "none")
    $("#back").css("display", "none")
})

$("#cancelar").click(function () {
    $("#confirmacion").css("display", "none")
    $("#back").css("display", "none")
})

$("#botonDelete").click(function () {
    $("#confirmacion").show();
    $("#back").show()
})

var isValid = false;

$("#form-settings").validate({
    rules: {
        email: {
            minlength: 8,
            pattern: /[^\s@]+@[^\s@]+\.[^\s@]/
        },
        username: {
            minlength: 4,
            maxlength: 30
        },
        surname: {
            minlength: 4,
            maxlength: 30
        },
        nickname: {
            minlength: 4,
            maxlength: 30
        },
        description: {
            minlength: 30,
            maxlength: 400
        },
        old_password: {
            minlength: 8
        },
        new_password: {
            minlength: 8
        },
        new_password_confirmation: {
            minlength: 8,
            equalTo: "#new_password"
        }
    },
    messages: {
        email: {
            minlength: "Email must be at least 8 characters long.",
            pattern: "Please enter a valid email address."
        },
        username: {
            minlength: "Username must be at least 4 characters long.",
            maxlength: "Username cannot be more than 30 characters long."
        },
        surname: {
            minlength: "Surname must be at least 4 characters long.",
            maxlength: "Surname cannot be more than 30 characters long."
        },
        nickname: {
            minlength: "Nickname must be at least 4 characters long.",
            maxlength: "Nickname cannot be more than 30 characters long."
        },
        description: {
            minlength: "Description must be at least 30 characters long.",
            maxlength: "Description cannot be more than 400 characters long."
        },
        old_password: {
            minlength: "Old password must be at least 8 characters long."
        },
        new_password: {
            minlength: "New password must be at least 8 characters long."
        },
        new_password_confirmation: {
            minlength: "Confirmation password must be at least 8 characters long.",
            equalTo: "Passwords do not match."
        },
    }
})

$("#ajax").click(function () {
    isValid= $("#form-settings").valid();
    console.log("#ajax button clicked");
 
    if (isValid) {
        var email = $('input[name="email"]').val();
        var username = $('input[name="username"]').val();
        var surname = $('input[name="surname"]').val();
        var nickname = $('input[name="nickname"]').val();
        var description = $('textarea[name="description"]').val();
        var old_password = $('input[name="old_password"]').val();
        var new_password = $('input[name="new_password"]').val();
        var new_password_confirmation = $('input[name="new_password_confirmation"]').val();

        console.log("Form is valid, submitting AJAX request");

        $.ajax({
            type: "POST",
            url: "../../Controller/UserController.php",
            data: { 
                "ajax": "ajax" ,
                "email":email,
                "username":username,
                "surname":surname,
                "nickname":nickname,
                "description":description,
                "old_password":old_password,
                "new_password":new_password,
                "new_password_confirmation":new_password_confirmation
            },
            dataType: "json",
            success: function (resposta) {
                console.log(resposta);

                $("#error").html("")
                $("#msg").html("")
     
                switch (resposta["respuesta"]) {

                    case "0":
                        $("#msg_ajax").html("All changes have been saved")
                        $("#error_ajax").html("")
                        break;

                    case "-1":
                        $("#error_ajax").html("No changes made")
                        $("#msg_ajax").html("")
                        break;

                    case "-2":
                        $("#error_ajax").html("Invalid current password")
                        $("#msg_ajax").html("")
                        break;

                    case "-3":
                        $("#error_ajax").html("Missing field, please complete all fields")
                        $("#msg_ajax").html("")
                        break;

                    default:
                        $("#error_ajax").html("Something wierd happend")
                        $("#msg_ajax").html("")
                        break;
                }

                $(".div-msg").fadeIn();
                setTimeout(function () {
                    $(".div-msg").fadeOut();
                }, 1500);

            }
        })
    }
});
