const mario = document.querySelector(".mario")
const pipe = document.querySelector(".pipe")
const clouds = document.querySelector(".clouds")
const containerpoints = document.querySelector(".points")
const gameOver = document.querySelector('.game-over')

let recordLocal = localStorage.getItem('recordGame')
let recordAtual = document.querySelector(".record")
recordAtual.innerHTML = recordLocal

let points = 0
let record = 0

const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500)
}

const poinCounter = setInterval(() => {
    points++
    containerpoints.innerText = points
}, 100)

const restart = () => {
    location.reload()
}


const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = Number(window.getComputedStyle(mario).bottom.replace('px', ''))
    const cloudsPosition = Number(window.getComputedStyle(clouds).left.replace('px', ''))

    if (pipePosition <= 105 && pipePosition > 0 && marioPosition <= 100) {
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`

        mario.src = './images/game-over.png'
        mario.style.width = '70px'
        mario.style.marginLeft = '25px'

        clouds.style.animation = 'none'
        clouds.style.left = `${cloudsPosition}px`

        clearInterval(loop)
        clearInterval(poinCounter)

        if (points > recordLocal) {
            localStorage.setItem('recordGame', points)
        }

        recordAtual.innerHTML = recordLocal
        gameOver.style.display = 'block'

        setTimeout(() => {
            document.addEventListener('keydown', restart)
        }, 500)
    }

}, 50)

document.addEventListener('keydown', jump)