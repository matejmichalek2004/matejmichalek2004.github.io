const toggleBtn = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

$(document).ready(function () {
    $(".toggle-button").click(function () {
        $(this).toggleClass("open");
        navbarLinks.classList.toggle("active");
    });
});

$(document).click(function (event) {
    var $target = $(event.target);
    if (
        !$target.closest(".toggle-button").length &&
        $(".toggle-button").is(":visible")
    ) {
        $(".toggle-button").removeClass("open");
        navbarLinks.classList.remove("active");
    }
});
