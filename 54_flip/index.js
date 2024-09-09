

const doms = {
  cardContainer: document.querySelector('.card-container'),
  cardItems: document.querySelectorAll('.card-item')
}

document.addEventListener('DOMContentLoaded', function() {
  const time = getTime()
  let frontDoms = document.querySelectorAll(`.front`)
  frontDoms.forEach(item => {
    item.classList.add(`number${time}`)
  })
})

function getTime() {
  let second = new Date().getSeconds().toString()
  return Number(second.slice(1, 2))
}

let oldVal = getTime()
let newVal = -1

let isFlipping = false

function flipDown() {
  doms.cardItems.forEach(item => {
    item.style.transition = `.6s`
  })

  newVal = getTime()
  if(newVal !== oldVal && !isFlipping) {
    changeCard(newVal)
  }
}

function changeCard(newVal) {
  isFlipping = true
  let frontDoms = document.querySelectorAll(`.front`)
  let backDoms = document.querySelectorAll(`.back`)
  frontDoms.forEach(item => {
    item.classList.add(`number${oldVal}`)
  })

  backDoms.forEach(item => {
    item.classList.add(`number${newVal}`)
  })

  doms.cardContainer.classList.add('flip')

  setTimeout(() => {
    doms.cardItems.forEach(item => {
      item.style.transition = `none`
    })

    frontDoms.forEach(item => {
      item.classList.add(`number${newVal}`)
      item.classList.remove(`number${oldVal}`)
    })

    backDoms.forEach(item => {
      item.classList.remove(`number${newVal}`)
    })

    oldVal = newVal

    doms.cardContainer.classList.remove('flip')

    isFlipping = false
  }, 500)
}

// function fn() {
//   requestAnimationFrame(() => {
//     flipDown()
//     fn()
//   })
// }

// fn()


setInterval(flipDown, 500)
