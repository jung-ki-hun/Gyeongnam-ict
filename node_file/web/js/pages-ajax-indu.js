$(document).ready(() => {
    $("#jkhajax-1").ready(() => {
        $.ajax({
            url: 'pages-productlist.html',
            cache: false,
            dataType: 'html',
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                $("#result").html(data);

            }
        })
    }),
    $("#jkhajax-1").click(() => {
        $.ajax({
            url: 'pages-productlist.html',
            cache: false,
            dataType: 'html',
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                $("#result").html(data);

            }
        })
    }),
        $("#jkhajax-2").click(() => {
            $.ajax({
                url: 'pages-productout.html',
                cache: false,
                dataType: 'html',
                type: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#result").html(data);

                }
            })
        })
     
})
