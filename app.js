const menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];

const mainEl = document.querySelector('main')
mainEl.style.backgroundColor = "var(--main-bg)"
mainEl.innerHTML = "<h1>SEI Rocks!</h1>"
mainEl.setAttribute("class", "flex-ctr")

// console.log(mainEl)

const topMenuEl = document.querySelector('nav#top-menu')
topMenuEl.style.height = '100%'
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'
topMenuEl.setAttribute("class", "flex-around")

// console.log(topMenuEl) 


for (let i = 0; i < menuLinks.length; i++) {
    let linkEl = document.createElement('a')
    linkEl.innerText = menuLinks[i].text
    linkEl.setAttribute('href', menuLinks[i].href)
    topMenuEl.appendChild(linkEl)
}


const subMenuEl = document.querySelector('nav#sub-menu')
subMenuEl.style.height = '100%'
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'
subMenuEl.setAttribute('class', 'flex-around')
subMenuEl.style.position = 'absolute'
subMenuEl.style.top = '0'

const topMenuLinks = document.querySelectorAll('nav#top-menu > a')
// console.log(topMenuLinks)

let showingSubMenu = false

topMenuEl.addEventListener('click', function(event){
  event.preventDefault()
  if(event.target.tagName !== 'A') {
    return
  }
  // console.log(event.target.innerText)


  if(event.target.classList.contains('active')) {
    event.target.classList.remove('active')
    showingSubMenu = false
    subMenuEl.style.top ='0'
  }

  for (let i = 0; i < topMenuLinks.length; i++) {
    if (topMenuLinks[i].classList.contains('active')){
      topMenuLinks[i].classList.remove('active')
    }
  }

  event.target.setAttribute('class', 'active')

  if (event.target.innerText !== 'ABOUT'){
    showingSubMenu = true
  }

  if (showingSubMenu === true) {
    subMenuEl.style.top = '100%' 
    buildSubMenu()
  }
  else {
    subMenuEl.style.top = '0'
    mainEl.innerHTML = '<h1>ABOUT</h1>'
  }
})

subMenuEl.addEventListener('click', function(event){
  event.preventDefault()
  if(event.target.tagName !== 'A') {
    return
  }
  showingSubMenu = false
  subMenuEl.style.top = '0'
  for (let i = 0; i < topMenuLinks.length; i++) {
    if (topMenuLinks[i].classList.contains('active')){
      topMenuLinks[i].classList.remove('active')
    }
  }
  mainEl.innerHTML = '<h1>'+ event.target.innerText + '</h1>'
})


function addSubElements(subArray) {
  for (let i = 0; i < subArray.length; i++) {
    let subMenuLink = document.createElement('a')
    subMenuLink.setAttribute('href', subArray[i].href)
    subMenuLink.innerText = subArray[i].text
    subMenuEl.appendChild(subMenuLink)
  }
}

function buildSubMenu() {
  subMenuEl.replaceChildren()

  let subArray;
  if (event.target.innerText === "CATALOG") {
    subArray = menuLinks[1].subLinks
    addSubElements(subArray)
    }
  else if (event.target.innerText === 'ORDERS') {
      subArray = menuLinks[2].subLinks
      addSubElements(subArray)
    }
  else if (event.target.innerText === 'ACCOUNT') {
    subArray = menuLinks[3].subLinks
    addSubElements(subArray)
  }
}