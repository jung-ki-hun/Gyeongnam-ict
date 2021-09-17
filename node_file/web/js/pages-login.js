"use strict";

const id = document.querySelector("#id"),
    paword = document.querySelector("#password"),
    loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        password: password.value,
    };

    fetch("/login", {
        method: "POST",     //로그인 승인 요청
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json()) //query: null,
        .then((data) => {
            var temp = JSON.parse(data);
            console.log(temp);
            if (temp.msg == 'Succesful') {
               location.href = '/';
                Succesful_login();
            } else {
                alert(temp.msg);
            }
        })
        .catch((err) => console.error('에러 메시지 : ' + err));
}