/**
 * Оповещаем о входе в личный кабинет
 */
function renderMyAccount() {
  $.get("http://localhost:3000/customer-online-p/", {}, function (customer) {
    customer.forEach(function (item) {
      if (item.name !== "") {
        $('#registrationMassageBox').css('display', 'block');
        $('#registrationMassageDefault').css('display', 'none');
        $("#registrationMassageCustomer").empty();
        $('#registrationMassageCustomer').append(
          $('<span>', {
            text: 'Hi, ' + item.name,
          })
        );
      } else {
        $('#registrationMassageBox').css('display', 'none');
        $('#registrationMassageDefault').css('display', 'block');
      }
    });
  }, "json");
  $('#registration')[0].reset();
  $('#login')[0].reset();
}

/**
 * Показываем сообщение об успешной регистрации
 */
function registrationMassageSuccess() {
  $('#registrationMassageSuccess').css('display', 'block');
}

/**
 * Показываем сообщение об успешном входе в личный кабинет
 */
function loginMassageSuccess() {
  $('#loginMassageSuccess').css('display', 'block');
}

/**
 * Показываем сообщение об ошибке при входе в личный кабинет
 */
function failureMassageSuccess() {
  $('#failureMassageSuccess').css('display', 'block');
}

(function ($) {
  $(document).ready(function () {
    renderMyAccount();

    /**
     * Нажатие на кнопку регистрации
     */
    $("#registration").on("click", "#join-btn", function (event) {
      let customer = {
        name: $('#registrationName').val(),
        email: $('#registrationEmail').val(),
        password: $('#registrationPassword').val(),
      };
      console.log(customer);
      /**
       * Отправляем на сервер данные регистрации
       */
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/customers-p/",
        data: customer,
        success: function () {
          renderMyAccount();
          registrationMassageSuccess();
        }
      });
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/customer-online-p/",
        data: customer,
      });
      event.preventDefault();
    });
    /**
     * Нажатие на кнопку Login
     */
    $("#login").on("click", "#login-btn", function (event) {
      let customerLogin = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val(),
      };
      /**
       * Отправляем на сервер данные входа в личный кабинет
       */
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/customer-login-p/",
        data: customerLogin,
        success: function () {
          $.get("http://localhost:3000/customers-p/", {}, function (customer) {
            customer.forEach(function (item) {
              if (item.email === customerLogin.email && item.password === customerLogin.password) {
                $.ajax({
                  type: "POST",
                  url: "http://localhost:3000/customer-online-p/",
                  data: {
                    name: item.name,
                    email: item.email,
                    password: item.password,
                  },
                });
                renderMyAccount();
                loginMassageSuccess();
              } else {
                renderMyAccount();
                failureMassageSuccess();
              }
            });
          }, "json");
        }
      });
      /**
       * Удаляем данные с сервера при входе в личный кабинет
       */
      $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/customer-login-p/1",
      });
      event.preventDefault();
    });
    /**
     * Выход из личного кабинета
     */
    $("#registrationMassageBox").on("click", "#logout-btn", function (event) {
      $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/customer-online-p/1",
        success: function () {
          renderMyAccount();
          console.log('exit');
        }
      });
      event.preventDefault();
    });

    /**
     * Удаляем конкретного покупателей из общего списка
     */
    $("#registration").on("click", "#registrationDel", function (event) {

      $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/customers-p/" + "4",
        success: function () {
          console.log('del');
        }

      });
      event.preventDefault();
    });
  });
})(jQuery);
