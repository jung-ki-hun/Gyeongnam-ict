$(document).ready(() => {
    $("#jkhajax-1").ready(() => {
        $.ajax({
            url: '/p/list',
            cache: false,
            dataType: 'json',
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                var json_o = JSON.parse(data);
                let json_d = json_o.query;
                test = JSON.parse(json_d);
                var str = "";
                $.each(test, async function (key, value) {
                    str += `<tr role="row">
                <td>
                    <h6 class="mt-0 m-b-5">`+ value.QRcode_check + `</h6>
                    <p class="m-0 font-14">`+ value.name + `</p>
                </td>							
                <td>`+ value.price + `</td>
                <td>`+ value.qr_code + `</td>
                <td>
                    <div class="progress" style="height: 5px;">
                        <div class="progress-bar bg-danger" role="progressbar" style="width:`+ value.stock + `%;"
                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </td>               
            </tr>`;
                });                   
                var html_div = document.querySelector("#list_item");
                html_div.innerHTML = str;//html에다가 만든걸 추가해줌
                $('#datatable').DataTable();
            },
        })
    })
})