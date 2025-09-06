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
    let li = createListElement(studies[i].school + ': ' + studies[i].course, studies[i].school, modalBody)    
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

setData().then(() => {
  console.log('Data loaded')
})

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
  let p1 = document.createElement('p')
  p1.innerText = 'School: ' + study.school
  let p2 = document.createElement('p')
  div.appendChild(p1)
  div.appendChild(p2)

  p2.innerText = 'Course: ' + study.course
  if (study.begin) {
    let p3 = document.createElement('p')
    p3.innerText = 'Began: ' + study.begin
    div.appendChild(p3)
  }
  if (study.end) {
    let p4 = document.createElement('p')
    p4.innerText = 'Graduated: ' + study.end
    div.appendChild(p4)
  }
  if (study.ECTS) {
    let p5 = document.createElement('p')
    p5.innerText = 'ECTS: ' + study.ECTS
    div.appendChild(p5)
  }
  return div
}

createWorkModalBody = function (work) {
  let div = document.createElement('div')
  let p1 = document.createElement('p')
  p1.innerText = 'Company: ' + work.company
  let p2 = document.createElement('p')
  p2.innerText = 'Title: ' + work.title
  div.appendChild(p1)
  div.appendChild(p2)
  if (work.description) {
    let p3 = document.createElement('p')
    p3.innerText = 'Description: ' + work.description
    div.appendChild(p3)
  }
  if (work.begin) {
    let p4 = document.createElement('p')
    p4.innerText = 'Began: ' + work.begin
    div.appendChild(p4)
  }
  if (work.end) {
    let p5 = document.createElement('p')
    p5.innerText = 'Ended: ' + work.end
    div.appendChild(p5)
  }
  if (work.tech.length > 0) {
    let p6 = document.createElement('p')
    p6.innerText = 'Technologies: ' + work.tech.join(', ')
    div.appendChild(p6)
  }
  return div
}