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
        button.addEventListener('click', function () {
            yourName.textContent = value.by;
            yourValue.textContent = value.title;
            yourText.className = `${value.lang}_app`;
            fetch(`${obj.value}/${value.id}/${value.name}_${value.lang}.txt`)
                .then(response => response.text())
                .then(text => {
                    yourText.innerText = text
                })

            changeHidden()
        })
    }
}

function changeHidden() {
    let allElement = document.querySelectorAll("h1, header, main, footer")
    for (let chengeAll of allElement) {
        if (chengeAll.hidden === true) {
            chengeAll.hidden = false;
        } else {
            chengeAll.hidden = true;
        }
    }
};

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        const dialogModal = document.querySelector('dialog')
        const closeModal = document.querySelector('#close')
        closeModal.addEventListener('click', () => {
            dialogModal.close()
        })
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
})

function openModal() {
    const dialogModal = document.querySelector('dialog')
    if (typeof dialogModal.showModal === "function") {
        dialogModal.showModal()
    } else {
        alert("The <dialog> API is not supported by this browser")
    }
}