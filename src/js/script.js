async function fetchJsonData(url) {
  const res = await fetch(url)
  data = await res.json()
  return data
}

async function setData() {
  let studies = (await fetchJsonData('src/data/studies.json')).studies
  let studieslist = document.getElementById('studieslist')
  
  for (let i = 0; i < studies.length; i++) {
    let modalBody = createStudyModalBody(studies[i])
    let title = studies[i].school ? studies[i].school + ": " + studies[i].course : studies[i].course
    let li = createListElement(title, studies[i].school, modalBody)    
    studieslist.appendChild(li)
  }

  let work = (await fetchJsonData('src/data/work.json')).work
  let worklist = document.getElementById('worklist')
  for (let i = 0; i < work.length; i++) {
    let modalBody = createWorkModalBody(work[i])
    let li = createListElement(work[i].company + ': ' + work[i].title, work[i].company, modalBody)
    worklist.appendChild(li)
  }
}

function setModalContent(title, body) {
  document.getElementById('modal-title').innerText = title
  document.getElementById('modal-body').removeChild(document.getElementById('modal-body').firstChild)
  document.getElementById('modal-body').appendChild(body)
  let myModal = new bootstrap.Modal(document.getElementById('myModal'))
  myModal.show()
}

function createListElement(listText, modalTitle, modalBody) {
  let li = document.createElement('li')
  li.innerText = listText
  li.className = 'list-group-item'
  li.dataBsToggle = 'modal'
  li.dataBsTarget = '#myModal'
  li.addEventListener('click', () => {
    setModalContent(modalTitle, modalBody)
    let myModal = new bootstrap.Modal(document.getElementById('myModal'))
    myModal.show()
  })
  return li
}

function createStudyModalBody(study) {
  let div = document.createElement('div')
  let school = createElement('School: ', study.school ? study.school : 'N/A')
  div.appendChild(school)

  let course = createElement('Course: ', study.course)
  div.appendChild(course)
  if (study.begin) {
    let begin = createElement('Began: ', study.begin)
    div.appendChild(begin)
  }
  if (study.end) {
    let end = createElement('Finished: ', study.end)
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
    a.innerText = study.website
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
    let begin = createElement('Began: ', work.begin)
    div.appendChild(begin)
  }
  if (work.end) {
    let end = createElement('Ended: ', work.end)
    div.appendChild(end)
  }
  if (work.tech.length > 0) {
    let tech = createElement('Technologies: ', work.tech.join(', '))
    div.appendChild(tech)
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

setData()