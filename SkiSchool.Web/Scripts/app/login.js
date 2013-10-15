$(function () {
    var getValidationSummaryErrors = function ($form) {
        var errorSummary = $form.find('.validation-summary-errors, .validation-summary-valid');
        return errorSummary;
    };

    $('#login-error').hide();

    var formSubmitHandler = function (e) {
        var $form = $(this);

        // We check if jQuery.validator exists on the form
        if (!$form.valid || $form.valid()) {
            $.post($form.attr('action'), $form.serializeArray())
                .done(function (json) {
                    json = json || {};

                    // In case of success, we redirect to the provided URL or the same page.
                    if (json.success) {
                        window.location = json.redirect || location.href;
                    } else if (json.errors) {
                        $('#login-error').show();
                        // displayErrors($form, json.errors);
                    }
                })
                .error(function () {

                    // displayErrors($form, ['An unknown error happened.']);
                });
        }

        // Prevent the normal behavior since we opened the dialog
        e.preventDefault();
    };

    $("#loginForm").submit(formSubmitHandler);
});