const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')
const URL_API = 'http://localhost:3000/'

function addElement({ name, url }) {
  const li = document.createElement('li')
  const a = document.createElement("a")
  const trash = document.createElement("span")

  a.href = url
  a.innerHTML = name
  a.target = "_blank"

  trash.innerHTML = "x"
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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let { value } = input

  if (!value)
    return alert('Preencha o campo')

  const [name, url] = value.split(",")

  if (!url)
    return alert('formate o texto da maneira correta')

  if (!/^http/.test(url))
    return alert("Digite a url da maneira correta")

  addElement({ name, url })
  
  add({ name, url })

  input.value = ""
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
