const email = document.querySelector("#email"),
    name1 = document.querySelector("#name"),
    message = document.querySelector("#message"),
    title = document.querySelector("#title"),
    sendBtn = document.querySelector("#submit");

sendBtn.addEventListener("click", sendm);
function alert1(name) {
    alert(name+"입력해주세요");
    return;
}
function sendm() {
    const req = {
        email: email.value ,//== null ? alert1("email"):email.value,
        name: name1.value ,//== null ? alert1("name"):name1.value,
        message: message.value ,//== null ? alert1("message"):message.value,
        title: title.value //== null ? alert1("title"):title.value

    };

    fetch("/suggest", {
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
                location.href = '#';
                alert(temp.msg);
            } else {
                alert(temp.msg);
            }
        })
        .catch((err) => console.error('에러 메시지 : ' + err));
}


/****
 * 
 *  추후 개발 진행 진척도를 판단하고 추가혹은 제거 /form테그 사용시 따로 필요가 없음
 * 
 */