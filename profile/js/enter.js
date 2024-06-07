'use strict'

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        const iconI = document.querySelector('#icon i')
        const name = document.querySelector('#yourName')
        const email = document.querySelector('#yourEmail')
        const yourValue = document.querySelector('#yourValue')
        const yourText = document.querySelector('#valuText')
        const submitBtn = document.querySelector('form button[type="submit"]')

        if (localStorage.getItem("yourName") && localStorage.getItem("yourEmail")) {
            iconI.textContent = 'web form';
            submitBtn.textContent = 'Submit 投稿';
            const yourName = localStorage.getItem("yourName")
            name.value = yourName;
            name.readOnly = true;
            const yourEmail = localStorage.getItem("yourEmail")
            email.value = yourEmail;
            email.readOnly = true;
        } else {
            let removeAll = document.querySelectorAll("#index, #appreciate, #title, #what")
            for (let removeThis of removeAll) {
                removeThis.remove()
            }
        }

        if (localStorage.getItem("yourValue") && localStorage.getItem("yourLan") && localStorage.getItem("valuText")) {
            yourValue.value = localStorage.getItem("yourValue")
            yourText.value = localStorage.getItem("valuText")
            document.querySelector(`#${localStorage.getItem("yourLan")}`).checked = true;
        }
    } else if (event.target.readyState === 'complete') {
        // フォーム名からフォームへの参照を取得する
        const form = document.forms["enter"]
        if (localStorage.getItem("yourName") && localStorage.getItem("yourEmail")) {
            // 'submit' イベントのハンドラーを追加
            form.addEventListener("submit", (e) => {
                e.preventDefault()

                // key/value ペアをリストします
                let formData = new FormData(form)
                for (let [name, value] of formData) {
                    localStorage.setItem(name, value)
                }

                form.innerHTML = `
                <h2 id="icon">
                <small>投稿完了</small><br>
                Thank you for Submit
                </h2>
                `;

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
                    location.replace('profile/')
                }, 1500)
            })
        } else {
            // 'submit' イベントのハンドラーを追加
            form.addEventListener("submit", (e) => {
                e.preventDefault()
                // key/value ペアをリスト
                let formData = new FormData(form)
                for (let [name, value] of formData) {
                    localStorage.setItem(name, value)
                }
                location.reload()
            })
        }
    }
}, false)

async function fetchMD(url = '', query = '') {
    fetch(url)
        .then(response => response.text())
        .then(text => {
            document.querySelector(query).innerText = text
        })
}