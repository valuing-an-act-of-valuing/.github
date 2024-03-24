'use strict'

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        const yourValue = document.querySelector('h1 strong')
        const yourText = document.querySelector('#value')
        const yourName = document.querySelector('h1 small')

        if (localStorage.getItem("yourValue") && localStorage.getItem("yourLan") && localStorage.getItem("valuText")) {
            yourName.textContent = localStorage.getItem("yourName")
            yourValue.textContent = localStorage.getItem("yourValue")
            yourText.innerHTML = localStorage.getItem("valuText").replace(/\n/g, '<br>');
            yourText.className = `${localStorage.getItem("yourLan")}_app`;
        } else {
            yourText.className = 'ja_app';
            fetch('README.md')
                .then(response => response.text())
                .then(text => {
                    yourText.innerText = text
                })
        }
    }
}, false)