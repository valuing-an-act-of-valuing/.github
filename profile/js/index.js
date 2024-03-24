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
        button.setAttribute('data-index', value.value)
        button.innerHTML = `
        <strong>${value.title}</strong><br>
        <small>${value.name}</small>
        `;
        appreciate.appendChild(button)
    }
}

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