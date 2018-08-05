function renderGoodsList() {
  //$("#products").empty();
  $.get("http://localhost:3000/goods-p/", {}, function (goods) {
    let $div = $("<div />").addClass("card-product-box");
    goods.forEach(function (item) {
      $div.append(
        $("<a />", {
          href: "single page.html",
        })
          .append(
            $("<img />", {
              src: "img/Layer 2.png",
              class: "card-product-img"
            })
          ).append(
          $("<h2 />", {
            //text:item.name + " " + item.price + "rub.",
          }).text('MANGO PEOPLE T-SHIRT')
        ).append(
          $("<h4 />", {
            text: "$" + item.price,
          })
        )
      ).append(
        $("<div />", {
          class: "add-flex",
        })
          .append(
            $("<span />", {
              href: "",
              class: "add-to-cart",
            })
              .append(
                $("<div />", {
                  class: "add-to-cart-cont",
                  "data-id": item.id,
                  "data-price": item.price,
                  "data-name": item.name
                })
                  .append(
                    $("<img />", {
                      src: "img/Forma 1 copy1.png"
                    })
                  )//.text('Add to Cart')
                  .append(
                    $("<span />", {
                      text: 'Add to Cart'
                    })
                  )
              )
          )
      )
    });
    $("#products").append($div);
  }, "json");
}

function renderCart() {
  //$("#cart").empty();
  $.get("http://localhost:3000/cart-p/", {}, function (goods) {
    let $ul = $("<ul />");
    let total = 0;
    goods.forEach(function (item) {
      $ul.append(
        $("<li />", {
          text: item.name + "(" + item.quantity + ")",
        })
          .append(
            $("<button />", {
              text: "Remove",
              "data-id": item.id,
              "data-price": item.price,
              "data-name": item.name,
              "data-quantity": item.quantity
            })
          )
      );
      total += +item.quantity * +item.price;
    });
    $("#cart").append($ul);
    $("#cart").append($("<div />", {text: "Total" + total + "rub."}))
  }, "json");
}

(function ($) {
  $(document).ready(function () {
    renderGoodsList();
    renderCart();
    $("#cart").on("click", ".add-to-cart-cont", function (event) {
      $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/cart-p/" + $(this).attr("data-id"),
        success: function () {
          renderCart();
        }
      })
    });

    $("#products").on("click", ".add-to-cart-cont", function (event) {
      let good = {
        id: $(this).attr("data-id"),
        price: $(this).attr("data-price"),
        name: $(this).attr("data-name"),
        quantity: 1
      };
      if ($('#cart .add-to-cart-cont[data-id="' + good.id + '"]').length) {
        var $good = $("#cart .add-to-cart-cont[data-id=" + good.id + "]");
        console.log($good);
        $.ajax({
          type: "PATCH",
          url: "http://localhost:3000/cart-p/" + good.id,
          data: {quantity: +$good.attr("data-quantity") + 1},
          success: function () {
            renderCart();
          }
        });
      } else {
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/cart-p/",
          data: good,
          success: function () {
            renderCart();
          }
        });
      }
      event.preventDefault();
    })
  });
})(jQuery);