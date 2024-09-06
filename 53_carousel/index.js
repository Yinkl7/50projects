const doms = {
  carouselList: document.querySelector('.carousel-list'),
  arrowLeft: document.querySelector('.arrow-left'),
  arrowRight: document.querySelector('.arrow-right'),
  indicators: document.querySelectorAll('.indicator span'),
}

const count = doms.indicators.length

let currentIndex = 0 

function moveTo(index) {
  doms.carouselList.style.transform = `translateX(${-index}00%)`
  doms.carouselList.style.transition = `all .5s`
  const active = document.querySelector('.indicator span.active')
  active.classList.remove('active')
  doms.indicators[index].classList.add('active')
  currentIndex = index
}

doms.indicators.forEach((item, i) => {
  item.onclick = function() {
    moveTo(i)
  }
})

function init() {
  // 复制并添加第一个和最后一个元素；实现无缝滚动
  const firstChild = doms.carouselList.firstElementChild.cloneNode(true)
  const lastChild = doms.carouselList.lastElementChild.cloneNode(true)
  lastChild.style.marginLeft = '-100%'
  doms.carouselList.appendChild(firstChild)
  doms.carouselList.insertBefore(lastChild, doms.carouselList.firstElementChild)
}

init()

function moveLeft() {
  if(currentIndex === 0) {
    doms.carouselList.style.transform = `translateX(${-count}00%)`
    doms.carouselList.style.transition = `none`
    // 强制渲染一次
    doms.carouselList.clientHeight
    moveTo(count - 1)
  } else {
    moveTo(currentIndex - 1)
  }
}

function moveRight() {
  if(currentIndex === (count - 1)) {
    doms.carouselList.style.transform = `translateX(0)`
    doms.carouselList.style.transition = `none`
    // 强制渲染一次 再移动
    doms.carouselList.clientHeight
    moveTo(0)
  } else {
    moveTo(currentIndex + 1)
  }
}

doms.arrowLeft.onclick = moveLeft
doms.arrowRight.onclick = moveRight

let timer = setInterval(() => {
  moveRight()
}, 3000)

doms.carouselList.onmouseenter = function() {
  clearInterval(timer)
}

doms.carouselList.onmouseleave = function() {
  timer = setInterval(() => {
    moveRight()
  }, 3000)
}
