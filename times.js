const forbiddenInTheSameTeamRules = [
    ["Marcus", "Smangol", "Lúdico"], // desequilibra
    ["Paulo", "Rodolfo", "Felipe"], // compromete ataque
    ["Anderson", "Paulinho", "Léo"] // compromete defesa
];

const players = [
    "Smangol",
    "Stéfano",
    "Lucas",
    "Horse",
    "Lúdico",
    "Paulo",
    "Felipe",
    "Guilherme",
    "Marcos",
    "Léo",
    "Bruno",
    "Rafael",
    "Matheus",
    "Anderson",
    "Gme"
];

const teamCount = 3;
const playerCountPerTeam = Math.ceil(players.length / teamCount);

function shuffle(originalArray) {
    const array = JSON.parse(JSON.stringify(originalArray));
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function isPlayerForbiddenInTeam(team, player) {
    for (ruleIdx in forbiddenInTheSameTeamRules) {
        const rule = forbiddenInTheSameTeamRules[ruleIdx];
        
        if(!rule.includes(player)) continue;        
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

function selectTeams() {
    const teams = [];
    const shuffledPlayers = shuffle(players);

    for (let teamIdx = 0; teamIdx < teamCount; teamIdx++) {
        const team = [];
        let playerIdx = 0;
        while (team.length < playerCountPerTeam) {
            const player = shuffledPlayers[playerIdx++];
            if (isPlayerForbiddenInTeam(team, player)) continue;
            team.push(player); 
            markPlayerAsSelected(shuffledPlayers, player);
            playerIdx = 0;
        }
        teams.push(team);
    }
    return teams;
}

let selectedTeams = selectTeams(); 
while (selectedTeams.find(t => t.includes(undefined)) != null) {    
    selectedTeams = selectTeams();   
}

for (let teamIdx = 0; teamIdx < teamCount; teamIdx++) {
    console.log('Team', teamIdx  + 1, selectedTeams[teamIdx]);    
}
