const next = document.getElementById('next')
const prev = document.getElementById('prev')
const circles = document.querySelectorAll('.circle')
const progress = document.getElementById('progress')

let currentActive = 1

next.addEventListener('click', () => {
  currentActive ++
  if(currentActive > circles.length) {
    currentActive = circles.length
  }

  update()
})

prev.addEventListener('click', () => {
  currentActive --
  if(currentActive < 1) {
    currentActive = 1
  }

  update()
})

function update() {
  // 1、为circle添加active
  circles.forEach((circle, index) => {
    if(index < currentActive) {
      circle.classList.add('active')
    } else {
      circle.classList.remove('active')
    }
  })

  // 2、处理progress的长度
  const activeEles = document.querySelectorAll('.active')
  // 计算线的长度 圆圈的数量减一 例：四个圆圈中间三根线
  progress.style.width = `${(activeEles.length - 1)/(circles.length - 1) * 100}%`

  // 3、根据 currentActive 控制btn
  if(currentActive == 1) {
    prev.disabled = true
    next.disabled = false
  } else if(currentActive == circles.length) {
    prev.disabled = false
    next.disabled = true
  } else {
    prev.disabled = false
    next.disabled = false
  }
}
