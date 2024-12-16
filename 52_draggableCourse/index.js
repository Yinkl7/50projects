const container = document.querySelector('.container')

let source = null
container.ondragstart = (e) => {
  e.dataTransfer.effectAllowed = e.target.dataset.effect
  source = e.target
}

container.ondragover = (e) => {
  e.preventDefault();
}

function clearStyles() {
  document.querySelectorAll('.drop-over').forEach(node => {
    node.classList.remove('drop-over')
  })
}

container.ondragenter = (e) => {
  clearStyles()
  const dropNode = getDropNode(e.target)
  if(!dropNode) {
    return
  }
  if(source.dataset.effect === dropNode.dataset.drop) {
    dropNode.classList.add('drop-over')
  }
}

// 课表上存在课程且拖动到课程上，那么就取当前课程的父级
function getDropNode(node) {
  while(node) {
    if(node.dataset && node.dataset.drop) {
      return node
    }
    
    node = node.parentNode
  }
}

container.ondrop = (e) => {
  const dropNode = getDropNode(e.target)
  if(!dropNode) {
    return
  }
  // 不应该被拖动到该区域
  if(source.dataset.effect !== dropNode.dataset.drop) {
    return
  }
  clearStyles()
  if(dropNode.dataset.drop === 'copy') {
    const cloned = source.cloneNode(true)
    cloned.dataset.effect = 'move'
    dropNode.innerHTML = ''
    dropNode.appendChild(cloned)
  } else {
    source.remove()
  }

}
