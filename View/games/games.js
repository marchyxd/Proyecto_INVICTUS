
$(".div-msg").fadeIn();
setTimeout(function () {
    $(".div-msg").fadeOut();
}, 1500);

$("#update-selector").change(function () {
    var gameId = $(this).find("option:selected").val();
    var gameData = $('#gameData').text().trim();
    
    try {
        var games = JSON.parse(gameData);

        $.each(games, function (index, game) {
            if (gameId == 0) {
                $("#game-name").val("");
                $("#game-gender").val("");
                $("#game-developer").val("");
                $("#game-release-date").val("");
                $("#game-description").val("");
            } else if (gameId == game.id) { 
                $("#game-name").val(game.name);
                $("#game-gender").val(game.gender);
                $("#game-developer").val(game.developer);
                $("#game-release-date").val(game.release_date);
                $("#game-description").val(game.description);
            }
        });
    } catch (e) {
        console.error("Error al parsear JSON:", e);
    }
});

$("#add").click(function () {
    $("#addNewGame").show();
    $("#back").show();
})

$("#update").click(function () {
    $("#updateGame").show();
    $("#back").show();
})

$("#delete").click(function () {
    $("#deleteGame").show();
    $("#back").show();
})

$("#back").click(function () {
    $("#deleteGame").css("display", "none")
    $("#updateGame").css("display", "none")
    $("#addNewGame").css("display", "none")
    $("#back").css("display", "none")
})

$(".cancelar").click(function () {
    $("#deleteGame").css("display", "none")
    $("#updateGame").css("display", "none")
    $("#addNewGame").css("display", "none")
    $("#back").css("display", "none")
})

if (mostraLista) {
    $('.slider').slick({
        slidesToShow: 13,
        slidesToScroll: 1,
        dots: false,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        responsive: [
            {
                breakpoint: 2500,
                settings: {
                    slidesToShow: 11,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 1500,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 2100,
                settings: {
                    slidesToShow: 9,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 1500,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 1500,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 1500,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 1500,
                    dots: false,
                    arrows: false
                }
            }, ,
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 1500,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 1500,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 1500,
                    dots: false,
                    arrows: false
                }
            }
        ]
    })
} else {
    $("#void_list").css("display", "block")
}

$("#create").click(function () {
    $('#form-addNewGame').validate({
        rules: {
            name: {
                required: true
            },
            gender: {
                required: true
            },
            developer: {
                required: true
            },
            release_date: {
                required: true,
                dateISO: true
            },
            description: {
                required: true
            }
        },
        messages: {
            name: "Please enter a title",
            gender: "Please enter a gender",
            developer: "Please enter a developer",
            release_date: {
                required: "Please enter a release date",
                dateISO: "Please enter a valid date in the format yyyy-mm-dd"
            },
            description: "Please enter a description"
        }
    })
});

$("#save").click(function () {
    $('#form-updateGame').validate({
        rules: {
            game_id: {
                required: true,
                min: 1
            },
            name: {
                required: true
            },
            gender: {
                required: true
            },
            developer: {
                required: true
            },
            release_date: {
                required: true,
                dateISO: true
            },
            description: {
                required: true
            }
        },
        messages: {
            game_id: {
                required: "Please select a game",
                min: "Please select a game"
            },
            name: "Please enter a title",
            gender: "Please enter a gender",
            developer: "Please enter a developer",
            release_date: {
                required: "Please enter a release date",
                dateISO: "Please enter a valid date in the format yyyy-mm-dd"
            },
            description: "Please enter a description"
        }
    })
});

$("#ajax-button").click(function(e) {
    e.preventDefault();

    var gameId = $("#update-selector").val();
    var gameName = $("#game-name").val();
    var gameGender = $("#game-gender").val();
    var gameDeveloper = $("#game-developer").val();
    var gameReleaseDate = $("#game-release-date").val();
    var gameDescription = $("#game-description").val();

    console.log("Datos enviados:", {
        game_id: gameId,
        name: gameName,
        gender: gameGender,
        developer: gameDeveloper,
        release_date: gameReleaseDate,
        description: gameDescription
    });

    $.ajax({
        type: "POST",
        url: "../../Controller/GameController.php",
        data: {
            ajax: "ajax",
            game_id: gameId,
            name: gameName,
            gender: gameGender,
            developer: gameDeveloper,
            release_date: gameReleaseDate,
            description: gameDescription
        },
        dataType: "json",
        success: function (resposta) {
            console.log(resposta);

            $("#error_ajax").html("")
            $("#msg_ajax").html("")

            if (resposta.success) {
                $("#msg_ajax").html(resposta.message)
            } else {
                $("#error_ajax").html(resposta.message)
            }

            $(".div-msg").fadeIn();
            setTimeout(function () {
                $(".div-msg").fadeOut();
            }, 1500);
        },
        error: function (xhr, status, error) {
            console.log("Error:", error);
            $("#error_ajax").html("Error al actualizar el juego: " + error);
            $(".div-msg").fadeIn();
            setTimeout(function () {
                $(".div-msg").fadeOut();
            }, 1500);
        }
    });
});


$("#confirm").click(function () {
    $('#form-deleteGame').validate({
        rules: {
            game_id: {
                required: true,
                min: 1
            },
            adminPassword: {
                required: true,
                minlength: 8
            }
        },
        messages: {
            game_id: {
                required: "Please select a game",
                min: "Please select a game"
            },
            adminPassword: {
                required: "Please enter the admin password",
                minlength: "Password must be at least 8 characters long"
            }
        }
    })
});