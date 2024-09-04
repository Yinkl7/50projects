let doms = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.lrc-list'),
  lrcWrapper: document.querySelector('.lrc-wrapper')
}

/**
 * 
 * @param {} str
 * 解析歌词字符串得到一个歌词数组 
 * {
 *  words: string,
 *  time: string,
 *  parsedTime: number
 * }
 */
function parseLrc(str) {
  const lines = str.split(/\r?\n/)
  let res = lines.map(line => {
    let reg = /^\[(.*?)\](.*)$/
    const match = line.match(reg)
    if(match) {
      return {
        time: match[1],
        parsedTime: parseTime(match[1]),
        words: match[2]
      }
    }
  })
  return res.filter(item => !!item)
}

// 时间处理
function parseTime(time) {
  let times = time.split(':')
  let seconds = 0

  if(times && times.length > 0) {
    const [ minitus, second ] = times
    seconds = Number(second)

    if(Number(minitus) > 0) {
      seconds = seconds + 60 * Number(minitus)
    }
  }
  return seconds
}

const lrcList = parseLrc(lrc)

// 根据播放器播放时间；找到播放的歌词
function findLrcIndex() {
  const time = doms.audio.currentTime
  for(let i = 0; i < lrcList.length; i ++) {
    if(lrcList[i].parsedTime >= time) {
      return Math.max(i - 1, 0)
    }
  }
  // 播放到最后一个句歌词
  return lrcList.length - 1
}

// 创建li歌词元素
function createLrcElements() {
  const fragment = document.createDocumentFragment()
  lrcList.forEach(item => {
    const li = document.createElement('li')
    li.textContent = item.words
    fragment.appendChild(li)
  })
  doms.ul.appendChild(fragment)
}

createLrcElements()

// 容器高度
const containerHeight = doms.lrcWrapper.clientHeight
const liHeight = doms.ul.children[0].clientHeight
const maxScrollTop = doms.ul.clientHeight - containerHeight
// 记录前一次actvie的歌词
let prevIndex = -1

// 计算ul滚动高度
function setUlScrollTop() {
  let index = findLrcIndex()
  let h1 = liHeight * index + liHeight / 2
  let scrollTop = h1 - containerHeight / 2
  if(scrollTop < 0) {
    scrollTop = 0
  }

  scrollTop = Math.min(scrollTop, maxScrollTop)
  if(prevIndex != -1) {
    doms.ul.children[prevIndex].classList.remove('active')
  }
  prevIndex = index
  doms.ul.children[index].classList.add('active')
  doms.ul.style.transform = `translateY(-${scrollTop}px)`
}

doms.audio.addEventListener('timeupdate', setUlOffset)
