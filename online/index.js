'use strict'

async function indexJson(requestURL) {
    const request = new Request(requestURL)
    const response = await fetch(request)
    const indexAll = await response.text()
    const json = JSON.parse(indexAll)
    indexValue(json)
}

async function fetchMD(url = '', query = '') {
    fetch(url)
        .then(response => response.text())
        .then(text => {
            document.querySelector(query).innerText = text
        })
}

function indexValue(obj) {
    const valueAll = obj.appreciate;
    for (const value of valueAll) {
        const article = document.createElement('article')
        article.hidden = true;
        article.dataset.lang = value.lang;
        article.className = value.id;
        article.id = value.name;
        document.body.appendChild(article)

        const h3 = document.createElement('h3')
        article.appendChild(h3)

        const strong = document.createElement('strong')
        strong.textContent = value.title;
        h3.appendChild(strong)

        const small = document.createElement('small')
        small.textContent = value.by;
        h3.appendChild(small)

        const section = document.createElement('section')
        fetch(`${value.id}/${value.name}_${value.lang}.txt`)
            .then(response => response.text())
            .then(text => {
                section.innerText = text;
            })
        article.appendChild(section)
    }
}