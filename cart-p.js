function renderGoodsList() {
  $("#products").empty();
  $.get("http://localhost:3000/goods-p/", {}, function (goods) {
    let $products = $('#products');
    goods.forEach(function (item) {
      $products.append(
        $("<div />", {
          class: "card-product-box",
        })
          .append(
            $("<a />", {
              href: "single page.html",
            })
              .append(
                $("<img />", {
                  src: item.img,
                  class: "card-product-img"
                })
              ).append(
              $("<h2 />", {
                text: item.name,
              })
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
                    "data-name": item.name,
                    "data-img": item.img
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
      );
    });
    $("#products").append($products);
  }, "json");
}

function renderCart() {
  $("#cart").empty();
  $("#cart-total__cart-img").empty();
  $("#table-cart").empty();
  $('.total-content-pink, #subTotal').empty();
  $.get("http://localhost:3000/cart-p/", {}, function (goods) {
    let $cart = $('#cart');
    let $tablecart = $("#table-cart");
    let total = 0;
    $tablecart.append(
      $('<tr />',{
        class: 'table-cart-title',
      })
        .append(
          $('<th />',{
            class: 'table-cart-first',
            text: 'PROUCT DETAILS'
          })
        )
        .append(
          $('<th />',{
            class: 'table-cart-second',
            text: 'UNITE PRICE'
          })
        )
        .append(
          $('<th />',{
            class: 'table-cart-second',
            text: 'QUANTITY'
          })
        )
        .append(
          $('<th />',{
            class: 'table-cart-second',
            text: 'SHIPPING'
          })
        )
        .append(
          $('<th />',{
            class: 'table-cart-second',
            text: 'SUBTOBAL'
          })
        )
        .append(
          $('<th />',{
            class: 'table-cart-second',
            text: 'ACTION'
          })
        )
    );
    goods.forEach(function (item) {
      $cart.append(
          $("<div />", {
            class: 'goods-box'
          })
            .append(
              $("<a />", {
                href: "single%20page.html"
              })
                .append(
                  $("<img />", {
                    src: item.img,
                    class: 'goods__cart-img'
                  })
                )
            )
            .append(
              $("<div />", {
                class: 'goods-box-param goods-box-param__cart-img'
              })
                .append(
                  $("<a />", {
                    href: "single%20page.html",
                    class: "goods-title goods-title__cart-img",
                    text: item.name,
                  })
                )
                .append(
                  $("<img />", {
                    class: 'goods-stars goods-stars__cart-img',
                    src: "img/stars.png",
                  })
                )
                .append(
                  $("<span />", {
                    class: "goods-price goods-price__cart-img",
                    text: item.quantity + ' x $' + +item.price,
                  })
                )
            )
            .append(
              $("<div />", {
                class: 'table-cart-action table-cart-action__cart-img'
              })
                .append(
                  $("<a />", {
                    href: "#",
                    class: 'remove',
                    "data-id": item.id,
                    "data-price": item.price,
                    "data-name": item.name,
                    "data-quantity": item.quantity
                  })
                    .append(
                      $("<div />", {
                        class: 'table-cart-action-circle'
                      })
                        .append(
                          $("<div />", {
                            class: 'cross1 cross__center'
                          })
                        )
                        .append(
                          $("<div />", {
                            class: 'cross2 cross__center'
                          })
                        )
                    )
                )
            )
        );
      $tablecart.append(
        $('<tr />', {
          class: 'table-cart-good',
        })
          .append(
            $('<td />', {
              class: 'table-cart-good-box',
            })
              .append(
                $('<a />', {
                  href: "single%20page.html"
                })
                  .append(
                    $('<img />', {
                      src: item.img,
                      class: 'goods__cart-img',
                    })
                  )
                  .append(
                    $('<div />')
                      .append(
                        $('<h2 />', {
                          text: item.name,
                        })
                      )
                      .append(
                        $('<div />', {
                          class: 'table-cart-good-box-param',
                        })
                          .append(
                            $('<h3 />', {
                              text: 'Color',
                            })
                          )
                          .append(
                            $('<h5 />', {
                              text: 'Red',
                            })
                          )
                          .append(
                            $('<h3 />', {
                              text: 'Size',
                            })
                          )
                          .append(
                            $('<h5 />', {
                              text: 'XL',
                            })
                          )
                      )
                  )
              )
          )
          .append(
            $('<td />', {
              text: '$' + item.price,
            })
          )
          .append(
            $('<td />')
              .append(
                $('<input>', {
                type: 'text',
                placeholder: item.quantity,
                  pattern: "[0-9]",
              })
              )
          )
          .append(
            $('<td />', {
              text: 'FREE',
            })
          )
          .append(
            $('<td />', {
              text: '$' + +item.quantity * +item.price,
            })
          )
          .append(
            $('<td />')
              .append(
                $("<div />", {
                  class: 'table-cart-action table-cart-action__cart-img'
                })
                  .append(
                    $("<a />", {
                      href: "#",
                      class: 'remove',
                      "data-id": item.id,
                      "data-price": item.price,
                      "data-name": item.name,
                      "data-quantity": item.quantity
                    })
                      .append(
                        $("<div />", {
                          class: 'table-cart-action-circle'
                        })
                          .append(
                            $("<div />", {
                              class: 'cross1 cross__center'
                            })
                          )
                          .append(
                            $("<div />", {
                              class: 'cross2 cross__center'
                            })
                          )
                      )
                  )
              )
          )
      );
      total += +item.quantity * +item.price;
    });
    $("#cart").append($cart);
    $('#cart-total__cart-img').append(
      $("<div />", {
        class: 'cart-total-text',
        text: 'TOTAL'
      })
    )
      .append(
        $("<div />", {
          class: 'cart-total-price',
          text: '$' + total
        })
      );
    $('.total-content-pink, #subTotal').append(
      $('<span />', {
        text: '$' + total,
      })
    )

  }, "json");
}

(function ($) {
  $(document).ready(function () {
    renderGoodsList();
    renderCart();
    /**
     * Удаляем товар из корзины
     */
    $("#cart, #table-cart").on("click", ".remove", function (event) {
      $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/cart-p/" + $(this).attr("data-id"),
        success: function () {
          renderCart();

        }
      });
      console.log($(this).attr("data-id"));
    });
    /**
     *Добавляем товар в корзину
     */
    $("#products").on("click", ".add-to-cart-cont", function (event) {
      let good = {
        id: $(this).attr("data-id"),
        price: $(this).attr("data-price"),
        name: $(this).attr("data-name"),
        img: $(this).attr("data-img"),
        quantity: 1
      };
      if ($('#cart [data-id="' + good.id + '"]').length) {
        var $good = $("#cart [data-id=" + good.id + "]");
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