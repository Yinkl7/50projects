const pinball = document.querySelector('.pinball')
const container = document.querySelector('.container-wrapper')
const w = container.clientWidth
const h = container.clientHeight

let speedX = 5
let speedY = 5

let timer = null
timer = setInterval(() => {
  const rect = pinball.getBoundingClientRect()

  if((rect.height + rect.top) >= h) {
    speedY = -speedY
  }

  if((rect.width + rect.left) >= w) {
    speedX = -speedX
  }

  if(rect.top <= 0) {
    speedY = Math.abs(speedY)
  }

  if(rect.left === 0) {
    speedX = Math.abs(speedX)
  }

  pinball.style.top = (rect.top + speedY) + 'px'
  pinball.style.left = (rect.left + speedX) + 'px'
  
}, 20)

