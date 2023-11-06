'use strict'

async function fetchHTML(url = '', query = '') {
    fetch(url)
        .then(response => response.text())
        .then(el => {
            document.querySelector(query).innerHTML = el
        })
}

async function fetchMD(url = '', query = '') {
    fetch(url)
        .then(response => response.text())
        .then(text => {
            document.querySelector(query).innerText = text
        })
}