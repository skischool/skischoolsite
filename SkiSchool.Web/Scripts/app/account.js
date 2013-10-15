var accountNS = accountNS || {};

$(document).ready(function () {
    accountNS.accountViewModel = {
        userName: ko.observable(),
        password: ko.observable(),

        hideLogin: function () {
            $('#loginDialog').modal('toggle');
            $('#username').val('');
            $('#password').val('');
            $('#login-error').hide();
        },
        logout: logout = function () {
            $('#logout').click(function (event) {
                event.preventDefault();
                $.ajax({
                    url: '/Account/LogOff',
                    type: 'GET'
                }).done(function () {
                    window.location.href = '/Home/Index'
                });
            });
        }

    }

    ko.applyBindings(accountNS.accountViewModel);
});
