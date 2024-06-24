const textarea = document.getElementById('textarea')

const tagsEle = document.getElementById('tags')

textarea.focus()

textarea.addEventListener('keyup', (e) => {
  if(e.key == 'Enter') {
    setTimeout(() => {
      e.target.value = ''
    }, 100)
    randomSelect()
  } else {
    createTag(e.target.value)
  }
})

function createTag(input) {
  const tags = input.split(',').filter(tag => !!tag.trim()).map(tag => tag.trim())
  tagsEle.innerHTML = ''

  tags.forEach(tag => {
    const span = document.createElement('span')
    span.classList.add('tag')
    span.innerText = tag
    tagsEle.appendChild(span)
  })
}

function randomSelect() {
  // 选择时间
  const times = 30
  // interval 随机动画
  const interval = setInterval(() => {
    const randomTag = pickRandomTag()
    if(!!randomTag) {
      hightLightTag(randomTag)

      setTimeout(() => {
        unHighLightTag(randomTag)
      }, 100)
    }
  }, 100)

  // timeout 清除interval；随机选择
  setTimeout(() => {
    clearInterval(interval)
    
    setTimeout(() => {
      const randomTag = pickRandomTag()

      if(!!randomTag) {
        hightLightTag(randomTag)
      }
    }, 100);
  }, times * 100)
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag')
  return tags[Math.floor(Math.random() * tags.length)]
}

function hightLightTag(tag) {
  tag.classList.add('highlight')
}

function unHighLightTag(tag) {
  tag.classList.remove('highlight')
}
