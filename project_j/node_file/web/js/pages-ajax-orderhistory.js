$(document).ready(() => {
    $("#jkhajax-4").ready(() => {
        $.ajax({
            url: '/p/order/list',
            cache: false,
            dataType: 'json',
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                var json_o = JSON.parse(data);
                let json_d = json_o.query;
                test = JSON.parse(json_d);
                var str = "";
                var i=0;

                $.each(test, function (key, value) {
                    str += `<tr>
                    <td>
                        <a href="#" id="${value.Number}" class="font-600 text-muted">#${value.Number}</a></td>
                    <td>${value.price} 원</td>
                    <td>${value.Mdate}</td>
                    <td>${value.UserName}</td>
                    <td>
                        <a href="javascript:" onclick="openWindow(${i});" id="${i}" class="m-r-15 text-muted" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="mdi ion-android-note"></i></a></td>
                </tr>
            </tr>`;i++;
                });

                var html_div = document.querySelector("#list_item");
                html_div.innerHTML = str;
                $('#datatable').DataTable();

            },
        })
    })
})