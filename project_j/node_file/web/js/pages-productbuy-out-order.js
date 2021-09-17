$.ajax({
    url: '/p/list',
    cache: false,
    dataType: 'json',
    type: "GET",
    success: function (data, textStatus, jqXHR) {
        var json_o = JSON.parse(data);
        let json_d = json_o.query;
        test = JSON.parse(json_d);

        ////////////////////////////////////////////////////////////////
        document.getElementById("cancel").addEventListener("click", function() {
            location.href = './office_function.html';
          });
          
        $("#listitem").change( function() {
        
                var langSelect = document.getElementById("listitem"); 
                var selectValue = langSelect.options[langSelect.selectedIndex].id;
                var tt = test[langSelect.selectedIndex].qr_code
                $("label[for='qr_code1']").text(tt);
            
            });
            
        
        document.getElementById("order").addEventListener("click", function() {
            const req = {
                name: $("#listitem option:selected").val(),
                count: document.querySelector("#manufacturername").value,
                qr_code: test[document.getElementById("listitem").selectedIndex].qr_code
            }
            fetch("/p/buy/out", {
                method: "POST",     //발주 승인 요청
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req),
            })
                .then((res) => res.json()) //query: null,
                .then((data) => {
                    var temp = JSON.parse(data);
                    if (temp.msg == 'Succesful') {
                        alert(temp.msg);
                        location.href = './industry_function.html';
                    } else {
                        alert(temp.msg);
                    }
                })
                .catch((err) => console.error('에러 메시지 : ' + err));
          });
        //////////////////////////////////////////////////////////////////
        
    },
})