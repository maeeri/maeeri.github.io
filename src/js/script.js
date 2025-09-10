const options = {
  method: 'GET',
  headers: {
    //'Authorization': 'Bearer ${{ secrets.GITHUB_APP_JWT }}',
    'Accept': 'application/vnd.github.html+json'
  }
}

async function fetchJsonData(url) {
  const res = await fetch(url)
  data = await res.json()
  return data
}

async function setData() {
  // const baseUrl = 'https://maeeri.github.io/'
  // let studies = (await fetchJsonData(baseUrl +'src/data/studies.json')).studies
  let studies = (await fetchJsonData('src/data/studies.json')).studies
  let studieslist = document.getElementById('studieslist')
  studies.sort((a, b) => new Date(b.end ? b.end : '9999-12-31') - new Date(a.end ? a.end : '9999-12-31'))
  
  for (let i = 0; i < studies.length; i++) {
    let modalBody = createStudyModalBody(studies[i])
    let title = studies[i].school ? studies[i].school + ": " + studies[i].course : studies[i].course
    let li = createListElement(title, studies[i].school, modalBody)
    li = addModalTrigger(li, studies[i].course, modalBody)
    studieslist.appendChild(li)
  }

  // let work = (await fetchJsonData(baseUrl +'src/data/work.json')).work
  let work = (await fetchJsonData('src/data/work.json')).work
  let worklist = document.getElementById('worklist')
  for (let i = 0; i < work.length; i++) {
    let modalBody = createWorkModalBody(work[i])
    let li = createListElement(work[i].company + ': ' + work[i].title)
    li = addModalTrigger(li, work[i].title, modalBody)
    worklist.appendChild(li)
  }

  const username = "maeeri"
  const apiUrl = `https://api.github.com/users/${username}/repos`
  let repos = (await fetchJsonData(apiUrl))
  repos
    .sort((a, b) => b.language - a.language)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  
  let reposlist = document.getElementById('reposlist')
  for (let i = 0; i < repos.length; i++) {
    let readme = await fetchJsonData(repos[i].url + '/readme', {headers: {'Accept': 'application/vnd.github.html+json'}})
    let modalBody = createRepoModalBody(repos[i], readme)
    let screenName = changeRepoName(repos[i].name)
    let li = createRepoListElement(repos[i].language ? repos[i].language : 'N/A',
      new Date(repos[i].created_at).toLocaleDateString(),
      screenName)
    li = addModalTrigger(li, screenName, modalBody)
    reposlist.appendChild(li)
  }
}

function setModalContent(title, body) {
  document.getElementById('modal-title').innerText = title
  document.getElementById('modal-body').removeChild(document.getElementById('modal-body').firstChild)
  document.getElementById('modal-body').appendChild(body)
  let myModal = new bootstrap.Modal(document.getElementById('myModal'))
  myModal.show()
}

function createListElement(listText) {
  let li = document.createElement('li')
  li.innerText = listText
  li.className = 'list-group-item'
  return li
}

function createStudyModalBody(study) {
  let div = document.createElement('div')
  let school = createElement('School: ', study.school ? study.school : 'N/A')
  div.appendChild(school)

  let course = createElement('Course: ', study.course)
  div.appendChild(course)
  if (study.begin) {
    let begin = createElement('Began: ', new Date(study.begin).toLocaleDateString())
    div.appendChild(begin)
  }
  if (study.end) {
    let end = createElement('Finished: ', new Date(study.end).toLocaleDateString())
    div.appendChild(end)
  }
  if (study.ECTS) {
    let ects = createElement('ECTS: ', study.ECTS)
    div.appendChild(ects)
  }
  if (study.website) {
    let website = document.createElement('div')
    let label = createLabel('Website: ')
    let a = document.createElement('a')
    a.href = study.website
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.innerText = study.website.length > 40 ? study.website.substring(8, 40) + '...' : study.website
    a.title = study.website
    website.appendChild(label)
    website.appendChild(a)
    div.appendChild(website)
  }
  return div
}

createWorkModalBody = function (work) {
  let div = document.createElement('div')
  let company = createElement('Company: ', work.company)
  div.appendChild(company)
  let title = createElement('Title: ', work.title)
  div.appendChild(title)
  if (work.description) {
    let description = createElement('Description: ', work.description)
    div.appendChild(description)
  }
  if (work.begin) {
    let begin = createElement('Began: ', new Date(work.begin).toLocaleDateString())
    div.appendChild(begin)
  }
  if (work.end) {
    let end = createElement('Ended: ', new Date(work.end).toLocaleDateString())
    div.appendChild(end)
  }
  if (work.tech.length > 0) {
    let tech = createElement('Technologies: ', work.tech.join(', '))
    div.appendChild(tech)
  }
  return div
}

function createRepoModalBody(repo, readme) {
  let div = document.createElement('div')
  let description = createElement('Description: ', repo.description ? repo.description : 'N/A')
  div.appendChild(description)
  let language = createElement('Main Language: ', repo.language ? repo.language : 'N/A')
  div.appendChild(language)
  let created = createElement('Created at: ', new Date(repo.created_at).toLocaleDateString())
  div.appendChild(created)
  let updated = createElement('Last Updated: ', new Date(repo.updated_at).toLocaleDateString())
  div.appendChild(updated)
  let linkDiv = document.createElement('div')
  let linkLabel = createLabel('Link: ')
  let link = document.createElement('a')
  link.href = repo.html_url
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.innerText = repo.html_url.length > 40 ? repo.html_url.substring(8, 40) + '...' : repo.html_url
  link.title = repo.html_url
  linkDiv.appendChild(linkLabel)
  linkDiv.appendChild(link)
  div.appendChild(linkDiv)
  if (readme && readme.content) {
    console.log(readme.constent)
    // let readmeDiv = document.createElement('div')
    // readmeDiv.appendChild(atob(readme.content))
    // modalBody.appendChild(document.createElement('hr'))
    // let readmeLabel = createLabel('README.md')
    // readmeDiv.prepend(readmeLabel)
    // modalBody.appendChild(readmeDiv)
  }
  return div
}

function createLabel(text) {
  let span = document.createElement('span')
  span.className = 'label'
  span.innerText = text
  return span
}

function createContent(text) {
  let span= document.createElement('span')
  span.innerText = text
  return span
}

function createElement(labelText, contentText) {
  let div = document.createElement('div')
  let label = createLabel(labelText)
  let content = createContent(contentText)
  div.appendChild(label)
  div.appendChild(content)
  div.className = 'mb-2'
  return div
}

function changeRepoName(name) {
  splitname = name.split('-')
  splitname = splitname.map(word => word.charAt(0).toUpperCase() + word.slice(1))
  return splitname.join(' ')  
}

function createRepoListElement(text1, text2, text3) {
  let rowDiv = document.createElement('div')
  rowDiv.className = 'row'
  rowDiv.style.width = '100%'
  let li = document.createElement('li')
  li.className = 'list-group-item'
  let div1 = document.createElement('div')
  div1.innerText = text1
  div1.style.fontWeight = 'bold'
  div1.className = 'col-md-2'
  let div2 = document.createElement('div')
  div2.className = 'col-md-2'
  div2.innerText = text2
  let div3 = document.createElement('div')
  div3.className = 'col-md-7'
  div3.innerText = text3
  rowDiv.appendChild(div1)
  rowDiv.appendChild(div2)
  rowDiv.appendChild(div3)
  li.appendChild(rowDiv)
  return li
}

function addModalTrigger(li, modalTitle, modalBody) {
  li.dataBsToggle = 'modal'
  li.dataBsTarget = '#myModal'
  li.addEventListener('click', () => {
    setModalContent(modalTitle, modalBody)
    let myModal = new bootstrap.Modal(document.getElementById('myModal'))
    myModal.show()
  })
  return li
}

setData()