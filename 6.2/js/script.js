$(document).ready(function () {
  $("#music-btn").click(function () {
    var music = $("#bg-music")[0];
    if (music.paused) {
      music.play();
      $(this).text("🔇 Tắt nhạc");
    } else {
      music.pause();
      $(this).text("🔊 Phát nhạc");
    }
  });

  $(window).on("scroll", function () {
    $("section").each(function () {
      var top = $(this).offset().top - 400;
      if ($(window).scrollTop() > top) {
        $(this).css("opacity", "1");
        $(this).css("transform", "translateY(0)");
      }
    });
  });
});
