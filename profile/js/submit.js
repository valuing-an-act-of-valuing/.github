'use strict'

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        // フォームの名前からそのフォームへの参照を取得する
        const form = document.forms["value"];

        // 'submit' イベントのハンドラーを追加
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData();
            const output = document.getElementById("app");

            for (const [key, value] of formData) {
                output.textContent += `${key}: ${value}\n`;
            }
        });
    } else if (event.target.readyState === 'complete') {
        ///
    }
});