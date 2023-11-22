'use strict'

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        if (!localStorage.getItem("yourName") || !localStorage.getItem("yourEmail")) {
            location.replace('../index.html');
        }

        if (localStorage.getItem("yourValue")) {
            const yourValue = localStorage.getItem("yourValue");
            const value = document.querySelector('#yourValue');
            value.value = yourValue;
        }

        if (localStorage.getItem("yourLan")) {
            const yourLanguage = localStorage.getItem("yourLan");
            const language = document.querySelector(`#${yourLanguage}`);
            language.checked = true;
        }

        if (localStorage.getItem("valuText")) {
            const valuText = localStorage.getItem("valuText");
            const txt = document.querySelector('#valuText');
            txt.value = valuText;
        }
    } else if (event.target.readyState === 'complete') {
        // フォームの名前からそのフォームへの参照を取得する
        const form = document.forms["value"];

        // 'submit' イベントのハンドラーを追加
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // key/value ペアをリストします
            let formData = new FormData(form);
            for (let [name, value] of formData) {
                localStorage.setItem(name, value);
            }

            form.innerHTML = `
            <h2 id="icon">
            <small>投稿完了</small><br>
            Thank you for Submit
            </h2>
            `

            let thisValue = {
                timestamp: new Date().toLocaleString(),
                yourName: localStorage.getItem("yourName"),
                yourEmail: localStorage.getItem("yourEmail"),
                yourLanguage: localStorage.getItem("yourLan"),
                yourValue: localStorage.getItem("yourValue"),
                valuText: localStorage.getItem("valuText")
            }

            const valueJSON = JSON.stringify(thisValue)
            async function submitThis() {
                let url = 'submit.php'
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: valueJSON
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
            submitThis()

            setTimeout(() => {
                localStorage.removeItem("yourLan");
                localStorage.removeItem("yourValue");
                localStorage.removeItem("valuText");
                location.reload()
            }, 1500)
        });
    }
});
