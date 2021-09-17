"use strict";

const email = document.querySelector("#email"),
    loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        email: email.value
    };

    fetch("/repw", {
        method: "POST",
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
                alert(`${temp.msg} Password change complete`); 
                location.href = '/web/pages-login.html'; //메인페이지로 이동~  //추후 로그인페이지로 이동
            } else {
                alert(temp.msg); // 회원 가입 실패하면
            }
        })
        .catch((err) => console.error('에러 메시지 : ' + err))
}