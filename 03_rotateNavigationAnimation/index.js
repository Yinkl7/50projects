const close = document.getElementById('close')
const open = document.getElementById('open')
const contanier = document.querySelector('.container')

open.addEventListener('click', () => {
  contanier.classList.add('show-nav')
})

close.addEventListener('click', () => {
  contanier.classList.remove('show-nav')
})
