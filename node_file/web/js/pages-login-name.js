var benner = document.querySelector("#login__main_benner");
var Succesful_login = () => {
    $.ajax({
        url: '/login',
        cache: false,
        dataType: 'json',
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            var json_o = JSON.parse(data);
            let json_d = json_o.query;
            if (json_o.state == 1) {
                let name = json_d;
                console.log(json_d);
                let str = `
                ${name}님 환영합니다!&nbsp&nbsp&nbsp&nbsp<a href ="#" onclick ="document.getElementById('logout-form').submit();">logout</a>
                <form id ="logout-form" method="POST" action="/logout">
                <input name="logout_dd" type="hidden" value ='test'/>
                </form>`;
              
                benner.innerHTML = str;
            } 

        }
    })
}
$(document).ready(() => {
    Succesful_login();

})