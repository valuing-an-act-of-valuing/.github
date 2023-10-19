async function publication(requestURL) {
  const request = new Request(requestURL);

  const response = await fetch(request);
  const indexJson = await response.text();

  const json = JSON.parse(indexJson);
  distribute(json);
}

function distribute(obj) {
  const links = document.querySelector('#links');
  const distributeAll = obj.distribute;

  for (const iii of distributeAll) {
    if (iii.hidden == false) {
      const distributeA = document.createElement('a');
      distributeA.setAttribute("class", "ja");
      distributeA.setAttribute("href", iii.link);
      distributeA.setAttribute("target", "_blank");
      distributeA.textContent = iii.name;
      distributeA.hidden = iii.hidden;
      links.appendChild(distributeA);
    }
  }
}

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
