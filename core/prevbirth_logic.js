const births = [
    'Cock 🐓',
    'Itchy Dog 🐶',
    'Gorilla 🦍',
    'Orangutan 🦧',
    'Red Ass Monkey 🐵',
    'Wolf 🐺',
    'Cat 🐱',
    'Tiger 🐯',
    'Horse 🐴',
    'Gay Unicorn 🦄',
    'Pig 🐷',
    'Boar 🐗',
    'Camel 🐪',
    'Giraffe 🦒',
    'Elephant 🐘',
    'Mouse 🐭',
    'Bat 🦇',
    'Panda 🐼',
    'Chick 🐤',
    'Turtle 🐢',
    'Snake 🐍',
    'T-Rex 🦖',
    'Whale 🐋',
    'Dolphin 🐬',
    'Fish 🐠',
    'Snail 🐌',
]


function getPrevBirth() {
    return births[Math.floor(Math.random() * births.length)]
}

module.exports = getPrevBirth