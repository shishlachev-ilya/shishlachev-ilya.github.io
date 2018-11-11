document.addEventListener("DOMContentLoaded", function () {

  new Swiper('.detail-slider', {
    speed: 500,
    loop: true,

    // autoplay: {
    //   delay: 4000,
    // },

  });

  new Swiper('.slider-top', {
    speed: 500,
    loop: true,

    // autoplay: {
    //   delay: 4000,
    // },

  });

  new Swiper('.swiper-container', {
    loop: true,
    loopAdditionalSlides: 5,
    loopedSlides: 3,
    centeredSlides: true,
    slidesPerView: 'auto',
    speed: 500,
    spaceBetween: 4,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },

    // autoplay: {
    //   delay: 4000,
    // },


  });


  /**
   * popup
   */

  var btn = document.querySelectorAll(".open-popup");
  var close = document.querySelectorAll(".close");
  var wrapper = document.querySelector(".popup-bg");

  btn.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      var id = event.target.getAttribute("data-target");
      wrapper.style.display = "block";
      document.querySelector("#" + id).style.display = "block";
      wrapper.setAttribute("open-div", "#" + id);
    });
  });

  close.forEach(function (item) {
    item.addEventListener("click", function () {
      var id = wrapper.getAttribute("open-div");

      document.querySelector(id).style.display = "none";
      wrapper.style.display = "none";
    });
  });


  /**
   * accordeon
   */

  //вариант с 1 открытой

  // $("[data-accordeon]").not(":first-of-type").find(".accordeon-box-content").hide();
  // $("[data-accordeon]:first-of-type").find(".accordeon-box-head").addClass("up");
  $(".accordeon-box").find(".accordeon-box-content").hide();

  $("[data-accordeon]").find(".accordeon-box-head").on("click", function () {

    if ($(this).next().is(":visible")) {
      $(this).next().slideUp();
      $(this).removeClass("up");
    } else {
      $("[data-accordeon]").find(".accordeon-box-content").slideUp();
      $("[data-head]").removeClass("up");
      $(this).next().slideDown();
      $(this).addClass("up");
    }

  });

  //тоггле вариант

  $("[data-toggle]").closest(".accordeon-box:last-of-type").find(".accordeon-box-content").show();

  $("[data-toggle]").on("click", function () {
    $(this).toggleClass("minus");
    $(this).closest(".accordeon-box").toggleClass("open");
    $(this).next().slideToggle();
  });


  /**
   * num +1
   */

  var addBasket = function (node) {
    var self = this;
    self.node = node;

    var plus = self.node.querySelector("[data-plus]");
    var minus = self.node.querySelector("[data-minus]");
    var sum = self.node.querySelector("[data-sum]");


    self.init = function () {
      self.plus();
      self.minus();
    };

    self.plus = function () {
      plus.addEventListener("click", function () {
        if (+sum.innerHTML >= 0) {
          sum.innerHTML = +sum.innerHTML + 1;
        }
      });
    };

    self.minus = function () {
      minus.addEventListener("click", function () {
        if (+sum.innerHTML >= 1) {
          sum.innerHTML = +sum.innerHTML - 1;
        }

        if (+sum.innerHTML == 0) {
          this.closest("[data-to-cart]").classList.remove("zoomIn");
          this.closest("[data-to-cart]").nextElementSibling.classList.remove("zoomOut");
        }
      });
    };
  };

  var basket = document.querySelectorAll("[data-add]");

  basket.forEach(function (item) {
    var add = new addBasket(item);
    add.init();
  });

  /**
   * показать +- при клике по корзине
   */

  var basketToggle = function (node) {
    var self = this;
    self.node = node;

    var toCart = self.node.querySelector("[data-to-cart]");
    var toBasket = self.node.querySelector("[data-to-basket]");

    toCart.classList.add("zoomOut");

    self.init = function () {

      toBasket.addEventListener("click", function () {
        self.node.querySelector(".basket-add-count").innerHTML = 1;
        this.classList.add("zoomOut");
        toCart.classList.remove("zoomOut");
        toCart.classList.add("zoomIn");
      });

    }
  };


  var productsBasket = document.querySelectorAll("[data-basket]");

  productsBasket.forEach(function (item) {
    var prodBas = new basketToggle(item);
    prodBas.init();
  });

  /**
   * select
   */

  var Select = function (node) {

    var self = this;
    self.node = node;
    self.list = [];
    self.text = "";

    self.init = function () {
      self.list = self.node.querySelector(".form-select__list");
      self.text = self.node.querySelector(".form-select__head");

      self.addListeners();
    };

    self.addListeners = function () {

      self.list.addEventListener("click", function (event) {
        self.changeText(event.target);
      });

      self.node.addEventListener('click', function (event) {
        self.open(event.target);
      });

      self.node.addEventListener('mouseleave', function (event) {
        self.close();
      });

      self.list.addEventListener('mouseleave', function (event) {
        self.close();
      });
    };

    self.open = function (node) {
      event.target.classList.add("arrow-up");
      self.node.style.borderColor = "transparent";
      if (node.nextElementSibling !== null) {
        node.nextElementSibling.classList.add("open");
      }
    };

    self.close = function () {
      self.list.classList.remove("open");
      self.text.classList.remove("arrow-up");
      self.node.style.borderColor = "#6468a1";
    };

    self.changeText = function (node) {
      self.text.innerHTML = node.innerHTML;
      self.close();
    };
  };

  var selectArr = document.querySelectorAll("[data-type='select']");
  for (i = 0; i < selectArr.length; i++) {
    var select = new Select(selectArr[i]);
    select.init();
    selectArr[i] = select;
  }


  /**
   * удаление элемента фильтра
   */

  $(".ordering-item__close_result").on("click", function () {
    var size = $(".catalog-group-filter").size() - 1;

    $(this).closest(".catalog-group-filter").empty().remove();

    if (size == 0) {
      $(".catalog-group__line").first().remove();
    }
  });

  $(".catalog-group-reset__item").on("click", function () {
    $(this).empty().remove();
    $(".catalog-group__line").first().empty().remove();
    $(".catalog-group-result").first().empty().remove();

  });

  /**
   * to top
   */

  $('.to-top').click(function () {
    $('body').animate({
      'scrollTop': 0
    }, 1500);
    $('html').animate({
      'scrollTop': 0
    }, 1000);
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > 500) {
      $('.to-top').removeClass('hidden');
    } else {
      $('.to-top').addClass('hidden');
    }
  });

  /**
   * показать весь текст на детальной
   */

  var Info = function (node) {
    var self = this;
    self.node = node;

    var content = self.node.querySelector("[data-content]");
    var btn = self.node.querySelector("[data-btn] span");

    var state = {
      open: false
    };

    self.init = function () {
      self.open();
    };

    self.open = function () {
      btn.addEventListener("click", function () {
        content.classList.toggle("is-open");
        self.changeState();
        state.open = !state.open;
      });
    };

    self.changeState = function () {
      return state.open ? btn.innerHTML = "Показать полностью" : btn.innerHTML = "Скрыть";
    }
  };

  var infoBoxes = document.querySelectorAll("[data-info]");
  infoBoxes.forEach(function (item) {
    var info = new Info(item);
    info.init();
  });

  // var state = {
  //   open: false
  // };

  // function changeState(a) {
  //   console.log(a);
  //   return state.open ? a.html("Показать полностью") : a.html("Скрыть");
  // }
  //
  // $(".properties-page-info-btn__seemore").on("click", function () {
  //   $(this).parents(".properties-page-info").find(".properties-page-info-content").toggleClass("is-open");
  //   changeState(this);
  //   state.open = !state.open;
  // });


  /**
   * высота каталога в футере
   */

  var list = document.querySelector(".js-height");
  var listItem = document.querySelectorAll(".js-height .footer-list__item");

  if (listItem.length % 2 === 0) {
    list.style.height = listItem.length * 25 / 2 + "px";
  } else {
    list.style.height = listItem.length * 26 / 2 + "px";
  }

  /**
   * удаление товара в корзине по 1
   */

  $(".ordering-item__close").on("click", function () {
    $(this).parent(".ordering-item").empty().remove();
  });

  /**
   * удаление всех товаров в корзине
   */

  $(".delete__item").on("click", function () {
    $(this).parents(".ordering-content__basket").find(".ordering-item").empty().remove();
    $(this).parent().empty().remove();
  });

  /**
   * media
   */

  var mq = window.matchMedia('(max-width: 767px)');

  $(window).on("resize", function () {
    if ($(window).innerWidth() < 767) {
      $("head").append('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">');
    } else {
      $("meta[name='viewport']").remove();
    }
  });

  $(window).on("resize", function () {
    if (mq.matches) {
      $("head").append('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">');
    } else {
      $("meta[name='viewport']").remove();
    }
  });

  /**
   * open mobile menu
   */

  $(".mobile-menu").on("click", function () {
    $(".m-menu").addClass("is-open");
    $(".m-wrapper").css("display", "block");
    $("body").addClass("fix");
  });

  $(".m-menu-close").on("click", function () {
    $(".m-menu").removeClass("is-open");
    $(".m-wrapper").css("display", "none");
    $("body").removeClass("fix");
  });

  $(".m-wrapper").on("click", function () {
    $(".m-menu").removeClass("is-open");
    $(".m-wrapper").css("display", "none");
    $("body").removeClass("fix");
  });

  /**
   * maska
   */

  $(".phone").mask("+38 (999) 999-99-99");

});