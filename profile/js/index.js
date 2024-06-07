'use strict'

async function indexJson(requestURL) {
    const request = new Request(requestURL)
    const response = await fetch(request)
    const indexAll = await response.text()
    const json = JSON.parse(indexAll)
    indexValue(json)
}

function shuffle(arrays) {
    const array = arrays.slice()
    for (let i = array.length - 1; i >= 0; i--) {
        const shuffleArr = Math.floor(Math.random() * (i + 1));
        [array[i], array[shuffleArr]] = [array[shuffleArr], array[i]]
    }
    return array;
}

function indexValue(obj) {
    const appreciate = document.querySelector('#appreciate')
    const valueAll = shuffle(obj.appreciate)
    for (const value of valueAll) {
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.setAttribute('data-index', value.id)
        button.innerHTML = `
        <strong>${value.title}</strong><br>
        <small>${value.by}</small>
        `;
        appreciate.appendChild(button)

        const yourName = document.querySelector('#value small')
        const yourValue = document.querySelector('#value strong')
        const yourText = document.querySelector('#value section')
        const img = document.querySelector('#value img')
        button.addEventListener('click', function () {
            yourName.textContent = value.by;
            yourValue.textContent = value.title;
            yourText.className = `${value.lang}_app`;
            fetch(`${obj.value}/${value.id}/${value.name}.txt`)
                .then(response => response.text())
                .then(text => {
                    yourText.innerText = text
                })
            if (value.image) {
                img.src = `${obj.value}/${value.id}/img/${value.image}`;
                img.alt = value.title;
                img.animate(
                    {
                        opacity: [0, 1],
                        filter: ["blur(1rem)", "blur(0)"]
                    },
                    {
                        fill: "forwards",
                        duration: 2500
                    }
                )
                img.hidden = false;
            }
            changeHidden()
        })
    }
}

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        const dialogModal = document.querySelector('dialog')
        const closeModal = document.querySelector('#close')
        closeModal.addEventListener('click', () => {
            dialogModal.close()
        })
        thisValue()
    } else if (event.target.readyState === 'complete') {
        let filter = document.querySelectorAll('#index input[type="radio"]')
        for (let i of filter) {
            i.addEventListener('change', () => {
                let value = i.value;
                let targets = document.querySelectorAll("#appreciate button")
                for (let ii of targets) {
                    ii.hidden = false;
                    let item_data = ii.getAttribute('data-index')
                    if (value && value !== 'all' && value !== item_data) {
                        ii.hidden = true;
                    }
                }
            })
        }
    }
}, false)

function thisValue() {
    const yourName = document.querySelector('#value small')
    const yourValue = document.querySelector('#value strong')
    const yourText = document.querySelector('#value section')

    if (localStorage.getItem("yourValue") && localStorage.getItem("yourLan") && localStorage.getItem("valuText")) {
        yourName.textContent = localStorage.getItem("yourName")
        yourValue.textContent = localStorage.getItem("yourValue")
        yourText.innerHTML = localStorage.getItem("valuText").replace(/\n/g, '<br>')
        yourText.className = `${localStorage.getItem("yourLan")}_app`;
    } else {
        yourName.textContent = "creative, community space ∧° ┐"
        yourValue.textContent = "大切にすることを大切にするための場所"
        yourText.className = 'ja_app';
        fetch('profile/README.md')
            .then(response => response.text())
            .then(text => {
                yourText.innerText = text
            })
    }
}

function changeHidden() {
    const allElement = document.querySelectorAll("h1, header, main, footer")
    for (let chengeAll of allElement) {
        if (chengeAll.hidden === true) {
            chengeAll.hidden = false;
        } else {
            chengeAll.hidden = true;
        }
    }

    if (document.body.className === "open") {
        document.body.className = "close";
        const img = document.querySelector('#value img')
        img.hidden = true;
        thisValue()
    } else {
        document.body.className = "open"
        document.querySelector('#value section').animate(
            {
                opacity: [0, 1],
                filter: ["blur(1rem)", "blur(0)"]
            },
            {
                fill: "forwards",
                duration: 2500
            }
        )
    }
}

function openModal() {
    const dialogModal = document.querySelector('dialog')
    if (typeof dialogModal.showModal === "function") {
        dialogModal.showModal()
    } else {
        alert("The <dialog> API is not supported by this browser")
    }
}