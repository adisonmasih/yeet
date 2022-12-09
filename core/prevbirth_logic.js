const births = [
    'Cock 🐓',
    'Khujhli Wala Kutta 🐶',
    'Gorilla 🦍',
    'Orangutan 🦧',
    'Red Ass Monkey 🐵',
    'Wolf 🐺',
    'Cat 🐱',
    'Tiger 🐯',
    'Ghoda 🐴',
    'Gay Unicorn 🦄',
    'Pig 🐷',
    'Boar 🐗',
    'Camel 🐪',
    'Giraffe 🦒',
    'Haathi 🐘',
    'Chuha 🐭',
    'Chamkadar 🦇',
    'Panda 🐼',
    'Chick 🐤',
    'Turtle 🐢',
    'Aaasteen Ka Saap 🐍',
    'T-Rex 🦖',
    'Whale 🐋',
    'Dolphin 🐬',
    'Machli 🐠',
    'Snail 🐌',
]


function getPrevBirth () {
    return births[Math.floor(Math.random() * births.length)]
}

module.exports = getPrevBirth