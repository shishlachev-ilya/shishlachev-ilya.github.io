$(document).ready(function () {

  $(".m-filter-btn").on("click", function () {
    $(".m-filter").addClass("open");
    $("body").addClass("fix");
  });

  /**
   * скрипт для демонстрации работы мобильного фильтра на
   * странице каталога, логику работы на проде Паша
   * закладывает другую
   */

  var filter = {
    offset: 0,
    i: 0,
    tittles: ["Фильтры", "Размер породы", "Цена (грн)"],

    moveRight: function (box) {
      if (this.offset >= 0 && this.offset < 66.66) {
        this.offset += 33.33;
        $(box).css("transform", "translateX(-" + this.offset + "%" + ")");
        this.i += 1;
        this.changeText(text, this.i);
      }
    },

    moveLeft: function (box) {
      if (this.offset > 0) {
        this.offset -= 33.33;
        $(box).css("transform", "translateX(-" + this.offset + "%" + ")");
        this.i -= 1;
        this.changeText(text, this.i);
      }
    },

    changeText: function (text, i) {
      $(text).html(this.tittles[i]);
    }
  };

  var box = $(".move-box"),
      text = $(".m-filter-form-head__title");

  $(".filter-btn").on("click", function (e) {
    e.preventDefault();
    filter.moveRight(box);
  });

  $(".m-filter-form-btn").on("click", function () {
    filter.moveLeft(box);

  });


});