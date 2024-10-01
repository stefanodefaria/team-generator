function parseInput(input) {
    return input.split('\n').map(name => name.trim());
}

function parseRules(input) {
    return input.split('\n').map(rule => rule.split(",").map(player => player.trim()));
}

function shuffle(originalArray) {
    const array = JSON.parse(JSON.stringify(originalArray));
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function isPlayerForbiddenInTeam(team, player, forbiddenInTheSameTeamRules) {
    for (ruleIdx in forbiddenInTheSameTeamRules) {
        const rule = forbiddenInTheSameTeamRules[ruleIdx];

        if (!rule.includes(player)) continue;
        const forbiddenPlayers = new Set();
        forbiddenPlayers.add(player);

        team.filter(p => rule.includes(p)).forEach(p => forbiddenPlayers.add(p));

        if (forbiddenPlayers.size > 1) return true;
    }
    return false;
}

function markPlayerAsSelected(shuffledPlayers, player) {
    const index = shuffledPlayers.indexOf(player);
    shuffledPlayers.splice(index, 1);
}

function selectTeams(players, rules, teamCount) {
    const playerCountPerTeam = Math.ceil(players.length / teamCount);
    const teams = [];
    const shuffledPlayers = shuffle(players);

    for (let teamIdx = 0; teamIdx < teamCount; teamIdx++) {
        const team = [];
        let playerIdx = 0;
        while (team.length < playerCountPerTeam) {
            const player = shuffledPlayers[playerIdx++];
            if (isPlayerForbiddenInTeam(team, player, rules)) continue;
            team.push(player);
            markPlayerAsSelected(shuffledPlayers, player);
            playerIdx = 0;
        }
        teams.push(team);
    }

    return teams;
}

function generateTeams() {
    const namesInput = document.getElementById('names-input').value;
    const rulesInput = document.getElementById('rules-input').value;        
    const teamCount = parseInt(document.getElementById('team-count-select').value, 10);
    const players = parseInput(namesInput);
    const rules = parseRules(rulesInput);

    console.log(rules)

    let selectedTeams = selectTeams(players, rules, teamCount);
    while (selectedTeams.find(t => t.includes(undefined)) != null) {
        selectedTeams = selectTeams(players, rules, teamCount);
    }

    
    let outputCopy = '';
    selectedTeams.forEach((team, idx) => {
        let output = '';
        output += `${team.join(', ')}\n`;
        outputCopy += `Time ${idx + 1}: ${team.join(', ')}\n`;
        document.getElementById(`output-${idx + 1}`).textContent = output;
    });

    document.getElementById('copy-content').textContent = outputCopy;
    resizePages();
    showHiddenElements();
    
}

function resizePages() {
    // TO-DO
}

function showHiddenElements() {
    document.getElementById('copy-feedback-message').style.display = 'none';
    document.getElementById('pre-infos').style.display = 'none';
    document.getElementById('team-results').style.display = 'block';
}

function copyToClipboard() {
    const conteudoParaCopiar = document.getElementById('copy-content').textContent;
    
    navigator.clipboard.writeText(conteudoParaCopiar)
    .then(() => {
        document.getElementById('copy-feedback-message').style.display = 'block';
    })
    .catch(err => {
        document.getElementById('copy-feedback-message').style.display = 'block';
        document.getElementById('copy-feedback-message').textContent = "Erro ao copiar os times.";
        console.error('Erro ao copiar para o clipboard: ', err);
    });
}