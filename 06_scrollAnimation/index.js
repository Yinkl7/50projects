console.log(window.innerHeight / 5 * 4, window.innerHeight)

const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
  const triggerBottom = window.innerHeight / 10 * 9

  boxes.forEach((box, index) => {
    const boxTop = box.getBoundingClientRect().top
    console.log(box.getBoundingClientRect(), index)

    if(triggerBottom > boxTop) {
      box.classList.add('show')
    } else {
      box.classList.remove('show')
    }
  })
} 
