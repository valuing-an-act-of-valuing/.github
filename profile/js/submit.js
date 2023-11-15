'use strict'

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        const yourName = localStorage.getItem("yourName");
        const name = document.querySelector('#yourName');
        name.value = yourName;

        const yourEmail = localStorage.getItem("yourEmail");
        const email = document.querySelector('#yourEmail');
        email.value = yourEmail;

        const yourValue = localStorage.getItem("yourValue");
        const value = document.querySelector('#yourValue');
        value.value = yourValue;

        const yourLanguage = localStorage.getItem("language");
        const language = document.querySelector(`#${yourLanguage}`);
        language.checked = true;

        const valuText = localStorage.getItem("valuText");
        const txt = document.querySelector('#valuText');
        txt.value = valuText;
    } else if (event.target.readyState === 'complete') {
        // フォームの名前からそのフォームへの参照を取得する
        const form = document.forms["value"];

        // 'submit' イベントのハンドラーを追加
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let formData = new FormData(form);
            // key/value ペアをリストします
            for (let [name, value] of formData) {
                localStorage.setItem(name, value);
            }
        });
    }
});