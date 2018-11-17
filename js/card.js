document.addEventListener("DOMContentLoaded", function () {

  /**
   * card
   */

  var Card = function (node) {

    var self = this;
    self.node = node;

    var star = self.node.querySelector(".favorites");
    var basket = self.node.querySelector(".product-basket__link");
    var itemWeight = self.node.querySelectorAll(".weight-list__item");
    var newPrice = self.node.querySelector("[data-set-new]");
    var oldPrice = self.node.querySelector("[data-set-old]");
    var remove = self.node.querySelector(".product-remove");


    self.init = function () {
      self.checkStar();
      self.checkBasket();
      self.checkWeight();
      self.remove();
    };

    self.checkStar = function () {
      star.addEventListener("click", function () {
        this.classList.toggle("active");
      });
    };

    self.checkBasket = function () {
      basket.addEventListener("click", function () {
        this.classList.toggle("activeqq");
      });
    };

    self.checkWeight = function () {

      itemWeight.forEach(function (item) {
        item.addEventListener("click", function () {
          for (var i = 0; i < itemWeight.length; i++) {
            itemWeight[i].classList.remove("active");
          }

          this.classList.add("active");
          newPrice.innerHTML = this.getAttribute("data-get-new") + " грн";
          oldPrice.innerHTML = this.getAttribute("data-get-old") + " грн";
        });
      });
    };

    self.remove = function () {
      if (remove) {
        remove.addEventListener("click", function () {
          self.node.remove();
        });
      }
    };
  };

  var cards = document.querySelectorAll(".product");

  for (var i = 0; i < cards.length; i++) {
    var card = new Card(cards[i]);
    card.init();
  }

  $(".detail-slider").on("click", ".favorites", function () {
    $(this).toggleClass("active");
  });

});