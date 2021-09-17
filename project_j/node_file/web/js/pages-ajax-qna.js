$(document).ready(() => {

    $.ajax({
        url: '/suggest/list',
        cache: false,
        dataType: 'json',
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            var json_o = JSON.parse(data);
            let json_d = json_o.query;
            test = JSON.parse(json_d);
            var str = "";
            var text ="";
            //console.log(test);
           
                
            $.each(test, async function (key, value) {
                str += `<div class="card">
                <div class="card-header bg-white border-bottom-0 p-3" id="headingOne">
                    <h5 class="mb-0 mt-0 font-16 font-light">
                        <a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                           aria-controls="collapseOne" class="text-dark">
                            ${value.title}
                        </a>
                    </h5>
                </div>

                <div id="collapseOne" class="collapse show"
                     aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body text-muted">
                        ${value.message}
                    </div>
                </div>
            </div>`;
            });

            var html_div = document.querySelector("#accordion");
            html_div.innerHTML = str;//html에다가 만든걸 추가해줌


            $('#datatable').DataTable();
        },
    })

})