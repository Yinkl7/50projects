const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
  panel.addEventListener('click', () => {
    // 遍历移除active；
    removeActive()
    // 添加新的active
    panel.classList.add('active')
  })
})

function removeActive() {
  panels.forEach(panel => {
    panel.classList.remove('active')
  })
}
