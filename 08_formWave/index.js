const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
  console.log(label.innerText)
  label.innerHTML = label.innerText.split('').map((char, index) => {
    return `<span style="transition-delay: ${index * 50}ms;">${char}</span>`
  }).join('')
})
