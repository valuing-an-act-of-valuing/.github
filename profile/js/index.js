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
  return array
}

function indexValue(obj) {
  const appreciate = document.querySelector('#appreciate #value')
  const dialogModal = document.querySelector('dialog')
  const valueAll = shuffle(obj.appreciate)

  for (const value of valueAll) {
    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.setAttribute('data-appreciate', value.value)
    button.id = value.id
    button.innerHTML = `
    <strong>${value.title}</strong><br>
    <small>${value.name}</small>
    `;
    appreciate.appendChild(button)

    button.addEventListener('click', () => {
      const h3 = document.createElement('h3')
      h3.className = 'ja vertical'
      h3.innerHTML = `${value.title}<br><small>${value.name}</small>`
      dialogModal.insertAdjacentElement("afterbegin", h3)

      const app = document.createElement('article')
      dialogModal.insertAdjacentElement("beforeend", app)

      const text = value.text
      for (const i of text) {
        const section = document.createElement('section')
        app.appendChild(section)
        section.className = `${i.lang}_app`
        section.id = `${i.txt}`
        fetchMD(`${value.value}/${i.txt}.txt`, `#${i.txt}`)
      }

      if (value.image) {
        const bgImg = document.createElement('article')
        dialogModal.insertAdjacentElement("beforeend", bgImg)
        bgImg.id = 'bgImg'
        const image = value.image
        for (const i of image) {
          bgImg.style.backgroundImage = `url(${value.value}/img/${i})`
        }
      }

      openModal()
    })
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

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    const dialogModal = document.querySelector('dialog')
    const closeModal = document.querySelector('dialog button')
    closeModal.addEventListener('click', () => {
      const all = document.querySelectorAll('dialog h3, dialog article')
      for (let i of all) {
        i.remove()
      }
      dialogModal.close()
    })
  } else if (event.target.readyState === 'complete') {
    const h1 = document.querySelector('h1')
    h1.addEventListener('click', () => {
      document.body.classList.toggle("hidden")
    })

    const title = document.querySelector('header h2 button')
    title.addEventListener('click', () => {
      location.reload()
    })

    let filter = document.querySelectorAll('#index input[type="radio"]')
    for (let i of filter) {
      i.addEventListener('change', () => {
        let value = i.value
        let targets = document.querySelectorAll("#appreciate div a, #appreciate div button")
        for (let ii of targets) {
          ii.hidden = false
          let item_data = ii.getAttribute('data-appreciate')
          if (value && value !== 'all' && value !== item_data) {
            ii.hidden = true
          }
        }
      })
    }
  }
});
