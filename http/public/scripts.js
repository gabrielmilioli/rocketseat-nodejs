const ul = document.querySelector('ul')
const inputName = document.getElementById('name')
const inputUrl = document.getElementById('url')
const form = document.querySelector('form')
const URL_API = 'http://localhost:3000/'

function addElement({ name, url }) {
  const li = document.createElement('li')
  const a = document.createElement('a')
  const trash = document.createElement('span')

  a.href = url
  a.innerHTML = name
  a.target = '_blank'

  trash.innerHTML = 'x'
  trash.onclick = () => removeElement(trash, { name, url })

  li.append(a)
  li.append(trash)
  ul.append(li)
}

function removeElement(el, { name, url }) {
  if (confirm('Tem certeza que deseja deletar?')) {
    el.parentNode.remove()
    remove({ name, url })
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = inputName.value
  const url = inputUrl.value

  if (!name || !url)
    return alert('Preencha os campos')

  if (!url)
    return alert('Preencha a url')

  if (!/^http/.test(url))
    return alert('Digite a url da maneira correta')

  addElement({ name, url })
  add({ name, url })

  inputName.value = ''
  inputUrl.value = ''
})

async function load() {
  const res = await fetch(URL_API)
    .then((data) => data.json())

  res.urls.map(({ name, url }) => addElement({ name, url }))
}

load();

async function add({ name, url }) {
  await fetch(`${URL_API}?name=${name}&url=${url}`)
    .then((data) => data.json())
}

async function remove({ name, url }) {
  await fetch(`${URL_API}?name=${name}&url=${url}&del=1`)
    .then((data) => data.json())
}
