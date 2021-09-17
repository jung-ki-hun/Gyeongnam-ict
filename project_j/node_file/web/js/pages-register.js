"use strict";

const email = document.querySelector("#email"),
    username = document.querySelector("#username"),
    password = document.querySelector("#password"),
    registerBtn = document.querySelector("button");

registerBtn.addEventListener("click", register);

function register() {

    
    const req = {
        email: email.value == null ? alert("이메일 값 입력 해주세요") : email.value,
        username: username.value == null ? alert("이름 값 입력 해주세요") : username.value,
        password: password.value == null ? alert("비밀번호 값 입력 해주세요") : password.value,
    };

    fetch("/regi", {
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
                alert(temp.msg); // 회원 가입 성공시 멘트
                location.href = '/web/pages-login.html'; //메인페이지로 이동~  //추후 로그인페이지로 이동
            } else {
                alert(temp.msg); // 회원 가입 실패하면
            }
        })
        .catch((err) => console.error('에러 메시지 : ' + err))
}
