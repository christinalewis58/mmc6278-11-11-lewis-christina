const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (poemArray) => {
  const poem = poemArray[0]
  console.log(poem)
  let html = makeTag('h2')(poem.title)
  let author = pipe(makeTag('em'),makeTag('h3'))('by ' + poem.author)
  html = html + author
  console.log(html)
  let arrayOfStanzas = []
  let currentStanza = []
  const lines = poem.lines
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    console.log(line)
    if (!line) {
      arrayOfStanzas.push(currentStanza)
      currentStanza = []
      continue
    } else {
      currentStanza.push(line)
    }
    if (index === lines.length - 1) {
      arrayOfStanzas.push(currentStanza)
    }
  }
  for (let i = 0; i < arrayOfStanzas.length; i++) {
    const stanza = arrayOfStanzas[i];
    console.log(stanza)
    let paragraph = makeTag('p')(stanza.join('<br>'))

    html = html + paragraph
  }
  
  console.log(arrayOfStanzas)
  return html
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
  //const poemArray = await getJSON(poemURL)
  //makePoemHTML(poemArray) 
}
