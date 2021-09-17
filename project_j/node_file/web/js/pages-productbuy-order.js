"use strict";
document.getElementById("cancel").addEventListener("click", function() {
    location.href = './office_function.html';
  });
  
$("#listitem").change( function() {

        var langSelect = document.getElementById("listitem"); 
        var selectValue = langSelect.options[langSelect.selectedIndex].id; 

        $("label[for='productprice2']").text(selectValue);
    
    });
    

document.getElementById("order").addEventListener("click", function() {
    
    const req = {
        name: $("#listitem option:selected").val(),
        count: document.querySelector("#manufacturername").value,
    }
    

    

    fetch("/p/buy", {
        method: "POST",     //발주 승인 요청
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json()) //query: null,
        .then((data) => {
            var temp = JSON.parse(data);
            //console.log(temp);
            if (temp.msg == 'Succesful') {
                alert(temp.msg);
                location.href = './office_function.html';
            } else {
                alert(temp.msg);
            }
        })
        .catch((err) => console.error('에러 메시지 : ' + err));
  });

