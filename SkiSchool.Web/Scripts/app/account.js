var accountNS = accountNS || {};

$(document).ready(function () {
    accountNS.accountViewModel = {
        userName: ko.observable(),
        password: ko.observable(),

        hideLogin: function () {
            $('#loginDialog').modal('toggle');
        },
        logout: logout = function () {
            $('#logout').click(function (event) {
                event.preventDefault();
                $.ajax({
                    url: '/Account/LogOff',
                    type: 'GET'
                    //,
                    //success: function () {
                    //    window.location.href = '/Home/Index'
                    //}
                }).done(function () {
                    window.location.href = '/Home/Index'
                });
            });
        }

    }

    ko.applyBindings(accountNS.accountViewModel);
});
