const gmailParts = [
    'likespussy',
    'asspicker',
    'lovesdicks',
    'dicklover',
    'dievirgin',
    'muthking'
]

const gmailPasswords = [
    'dicksaregreat6969',
    'iwillgrow_my_pp',
    'chotichaabi_lives_matter69',
    'sexismygoal@69420',
    'pornhubislife__6920'
]

const mostVisitedSites = [
    'https://xvideos.com',
    'http://favepornvids.com/en/',
    'https://pornhubs.video',
    'https://xhamster.desi',
    'https://cartoonpornvideos.com'
]

const onlyFansTemplates = [
    'see@dicks69',
    '@bigdicksmalldick420',
    '@attitudesmalldick69',
    'smalldicklivesmatter@420',
    '@makemypussywet',
]

const orientations = [
    'Homosexual',
    'Asexual',
    'Bisexual'
]

const getHackDetails = (name) => {
    let data = {}
    data.gmailAddress = `${name.toLowerCase().replace(' ', '')}${gmailParts[Math.floor(Math.random() * gmailParts.length)]}${Math.random() < 0.5 ? 6969 : 420}@gmail.com`
    data.gmailPassword = `${name.toLowerCase().replace(' ', '')}${gmailParts[Math.floor(Math.random() * gmailParts.length)]}${Math.random() < 0.5 ? 6969 : 420}`
    data.mostVisitedSite = mostVisitedSites[Math.floor(Math.random() * mostVisitedSites.length)];
    data.onlyFans = onlyFansTemplates[Math.floor(Math.random() * onlyFansTemplates.length)].replace('@', name).toLowerCase().replace(' ', '');
    data.orientation = orientations[Math.floor(Math.random() * orientations.length)];
    data.stalkCount = Math.floor(Math.random() * (10000 - 3000 + 1) + 3000);

    return data
}

module.exports = getHackDetails