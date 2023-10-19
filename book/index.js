async function populate() {
  const requestURL = 'index.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const indexJson = await response.text();

  const topicIndex = JSON.parse(indexJson);
  indexObject(topicIndex);
}

function indexObject(obj) {
  const distribute = document.querySelector('#links');
  const itemDistribute = obj.distribute;

  for (const item of itemDistribute) {
    if (item.hidden == false) {
      const distributeA = document.createElement('a');
      distributeA.setAttribute("class", "ja");
      distributeA.setAttribute("href", item.link);
      distributeA.setAttribute("target", "_blank");
      distributeA.textContent = item.name;
      distributeA.hidden = item.hidden;
      distribute.appendChild(distributeA);
    }
  }
}

populate();

async function fetchMD(url = '', query = '') {
  fetch(url)
    .then(response => response.text())
    .then(text => {
      document.querySelector(query).innerText = text
    })
}
