document.addEventListener("DOMContentLoaded", function () {

  // slider
  let swiper = new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 10,
    loop: true,
    speed: 1000,
    effect: "slide",
    breakpoints: {
      576: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    },
    autoplay: {
      delay: 3000,
    }
  });

  // m-menu
  let menuBtn = document.querySelectorAll(".menu-btn");
  let menu = document.querySelector(".m-menu");

  function toggle(obj) {
    obj.classList.toggle("active");
  }

  menuBtn.forEach(function (item) {
    item.addEventListener("click", function () {
      toggle(menu);
    });
  });

  // render cards

  let cards = [
    {
      title: "Huawei Mate S",
      src: "img/goods/1.png",
      price: "$280.00",
      old: ""
    },
    {
      title: "SONY XPERIA Z5",
      src: "img/goods/2.png",
      price: "$550.00",
      old: ""
    },
    {
      title: "Xiaomi Mi 4i",
      src: "img/goods/3.png",
      price: "$350.00",
      old: ""
    },
    {
      title: "HUAWEI G8 4G",
      src: "img/goods/4.png",
      price: "$350.00",
      old: "$649.00"
    },
    {
      title: "iPhone Rose Gold",
      src: "img/goods/5.png",
      price: "$280.00",
      old: "$649.00"
    },
    {
      title: "HUAWEI G8 4G",
      src: "img/goods/6.png",
      price: "$350.00",
      old: ""
    },
    {
      title: "Galaxy Core Prime ",
      src: "img/goods/7.png",
      price: "$399.00",
      old: ""
    },
    {
      title: "Apple iPhone 6S",
      src: "img/goods/8.png",
      price: "$550.00",
      old: ""
    },
    {
      title: "Huawei Mate S",
      src: "img/goods/1.png",
      price: "$280.00",
      old: ""
    },
    {
      title: "SONY XPERIA Z5",
      src: "img/goods/2.png",
      price: "$550.00",
      old: ""
    },
    {
      title: "Xiaomi Mi 4i",
      src: "img/goods/3.png",
      price: "$350.00",
      old: ""
    },
    {
      title: "HUAWEI G8 4G",
      src: "img/goods/4.png",
      price: "$350.00",
      old: "$649.00"
    },
    {
      title: "iPhone Rose Gold",
      src: "img/goods/5.png",
      price: "$280.00",
      old: "$649.00"
    },
    {
      title: "HUAWEI G8 4G",
      src: "img/goods/6.png",
      price: "$350.00",
      old: ""
    },
    {
      title: "Galaxy Core Prime ",
      src: "img/goods/7.png",
      price: "$399.00",
      old: ""
    },
    {
      title: "Apple iPhone 6S",
      src: "img/goods/8.png",
      price: "$550.00",
      old: ""
    },
    {
      title: "iPhone Rose Gold",
      src: "img/goods/5.png",
      price: "$280.00",
      old: "$649.00"
    },
    {
      title: "HUAWEI G8 4G",
      src: "img/goods/6.png",
      price: "$350.00",
      old: ""
    },
    {
      title: "Galaxy Core Prime ",
      src: "img/goods/7.png",
      price: "$399.00",
      old: ""
    },
    {
      title: "Apple iPhone 6S",
      src: "img/goods/8.png",
      price: "$550.00",
      old: ""
    }
  ];

  let inp = document.querySelector(".search-field input");
  let val = "";
  let filtred = [];
  let wrap = document.querySelector(".catalog__wrap");
  let count;

  render(cards);

  function render(cards) {
    let template = '';

    for (let i = 0; i < cards.length; i++) {
      template += `
     <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
      <div class="card">
        <div class="hover-block">
          <button class="hover-block__btn" data-delete="delete">remove from list</button>
        </div>

        <a href="#" class="card__images">
          <img src="${cards[i].src}" alt="${cards[i].title}">
        </a>

        <div class="card__title">
          <a href="#">${cards[i].title}</a>
        </div>

        <div class="card__price">
          <span>${cards[i].price}</span>
          <span class="old">${cards[i].old}</span>
        </div>

        <div class="card__btns">
          <button class="card__btn" data-delete="delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>

          <button class="card__btn add-basket">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
   `;
    }

    wrap.innerHTML = template;
  }

  inp.addEventListener("keyup", function () {
    val = inp.value.toLowerCase();

    filtred = cards.filter(function (item) {
      return item.title.toLowerCase().indexOf(val) !== -1 || item.price.toLowerCase().indexOf(val) !== -1;
    });

    render(filtred);
    deleteCards.init();
  });

  //remove cards

  let deleteCards = {

    deleteAllCards: function() {
      let btn = document.querySelector(".clear__btn");

      btn.addEventListener("click", function () {
        wrap.closest(".row").remove();
        inp.value = "";
        cards = {};
        if(cards.length === undefined) {
          this.closest(".clear").classList.add("disabled");
        }
      });
    },

    deleteOneCards: function() {
      let addTrash = document.querySelectorAll("[data-delete]");

      addTrash.forEach(function (item) {
        item.addEventListener("click", function () {
          this.closest("[class^=\"col\"]").remove();
        })
      })
    },

    init: function() {
      deleteCards.deleteAllCards();
      deleteCards.deleteOneCards();
    }
  };

  deleteCards.init();


  // pagination

  let pItem = document.querySelectorAll(".p-list li");
  let pBox = document.querySelectorAll(".box");


  pItem.forEach(function (item) {
    item.addEventListener("click", function () {
      for(let i = 0; i < pBox.length; i++) {
        pBox[i].classList.remove("active");
        if(pBox[i].dataset.target === this.dataset.for) {
          pBox[i].classList.add("active");
        }
      }
    })
  })


});