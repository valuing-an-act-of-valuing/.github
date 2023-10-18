'use strict'

async function indexJson(requestURL) {
    const request = new Request(requestURL);
    const response = await fetch(request);
    const indexAll = await response.text();
    const json = JSON.parse(indexAll);
    indexValue(json);
}

function shuffle(arrays) {
  const array = arrays.slice();
  for (let i = array.length - 1; i >= 0; i--) {
    const shuffleArr = Math.floor(Math.random() * (i + 1));
    [array[i], array[shuffleArr]] = [array[shuffleArr], array[i]];
  }
  return array;
}

function indexValue(obj) {
    const appreciate = document.querySelector('#appreciate #value');
    const valueAll = shuffle(obj.appreciate)

    for (const value of valueAll) {
        const valueA = document.createElement('a');
        valueA.setAttribute("data-appreciate", value.value);
        valueA.href = `${value.value}${value.id}`;
        valueA.innerHTML = `
        <strong>${value.title}</strong><br>
        <small>${value.name}</small>
        `;
        appreciate.appendChild(valueA);
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

document.addEventListener('DOMContentLoaded', function () {
  const dialogModal = document.querySelector('dialog')
  const closeModal = document.querySelector('dialog button')
  closeModal.addEventListener('click', () => {
    dialogModal.close()
  })
}, false)

async function fetchMD(url = '', query = '') {
  fetch(url)
    .then(response => response.text())
    .then(text => {
      document.querySelector(query).innerText = text
    })
}

window.onload = function () {
    let filter = document.querySelectorAll('#index input[type="radio"]');
    for (let i of filter) {
        i.addEventListener('change', () => {
            let value = i.value;
            let targets = document.querySelectorAll("#appreciate section a");
            for (let ii of targets) {
                ii.hidden = false;
                let item_data = ii.getAttribute('data-appreciate')
                if (value && value !== 'all' && value !== item_data) {
                    ii.hidden = true;
                }
            }
        })
    }
}