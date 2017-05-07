(function($) {

    var API_URL = "https://jsonplaceholder.typicode.com/users",
        template = $("#userTemplate").html();

    function showUsers(data) {

        var regex = /\{\{ *(\w+) *\}\}/g;
        var list = $("<ul></ul>");

        $.each(data, function(i, user) {

            var item = $("<li></li>"),
                templateCopy = template,
                found;

            while(found = regex.exec(templateCopy)) {

                var localRegex = new RegExp("\\{\\{ *" + found[1] + " *\\}\\}", "g");

                templateCopy = templateCopy.replace(localRegex, user[found[1]]);

            }

            item.append(templateCopy).appendTo(list);

        });

        list.appendTo(".container");
    }

    $("#getUsers").on("click", function() {

        $.getJSON(API_URL)
            .done(function(data) {
                showUsers(data);
            })
            .fail(function() {
                $(".container").append("<ul><li>Wystąpił błąd</li></ul>");
            });

    });

})(jQuery);