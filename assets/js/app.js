const cols = document.querySelectorAll('.col')

setRandomColors(getColorsHash().length == 0 ? false : true)

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if(event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type
    if(type == 'open') {
        const node = event.target.tagName.toLowerCase() === 'i' 
        ? event.target : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    }
    else if (type == 'copy') {
        copyToClickboard(event.target.textContent)
    }
})

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}

function generatorRandomColor() {
    // RGB 

    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i<6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }

    return '#'+color
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsHash() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')

        if(isLocked) { 
            colors.push(text.textContent)
            return 
        }
        
        const color = isInitial ? colors[index] : generatorRandomColor()
        if(!isInitial) { colors.push(color) }
        
        col.style.background = color
        text.textContent = color
    })

    updateColorsHash(colors)
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
    .map((color) => color.substring(1) ).join('-')
}

function getColorsHash() {
    if(document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map((color) => '#'+color)
    }
    return []
}