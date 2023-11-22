'use strict'

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        const yourName = localStorage.getItem("yourName");
        const name = document.querySelector('#yourName');
        name.value = yourName;

        const yourEmail = localStorage.getItem("yourEmail");
        const email = document.querySelector('#yourEmail');
        email.value = yourEmail;

        if (localStorage.getItem("yourName") && localStorage.getItem("yourEmail")) {
            location.replace('../online/');
        }
    } else if (event.target.readyState === 'complete') {
        // フォームの名前からそのフォームへの参照を取得する
        const form = document.forms["enter"];

        // 'submit' イベントのハンドラーを追加
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let formData = new FormData(form);
            // key/value ペアをリストします
            for (let [name, value] of formData) {
                localStorage.setItem(name, value);
            }
            location.replace('../online/');
        });
    }
});