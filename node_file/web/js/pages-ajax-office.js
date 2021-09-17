$(document).ready(() => {
    $("#jkhajax-1").ready(() => {
        $.ajax({
            url: 'pages-statistics.html',
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
            url: 'pages-statistics.html',
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
                url: 'pages-productlist.html',
                cache: false,
                dataType: 'html',
                type: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#result").html(data);

                }
            })
        }),
        $("#jkhajax-3").click(() => {
            $.ajax({
                url: 'pages-productbuy.html',
                cache: false,
                dataType: 'html',
                type: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#result").html(data);

                }
            })
        }),
        $("#jkhajax-5").click(() => {
            $.ajax({
                url: 'pages-orderhistory.html',
                dataType: 'html',
                type: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#result").html(data);

                }
            })
        })
})
