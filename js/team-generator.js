function shuffle(originalArray) {
    const array = structuredClone(originalArray);
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function isPlayerForbiddenInTeam(team, player, forbiddenInTheSameTeamRules) {
    for (let ruleIdx in forbiddenInTheSameTeamRules) {
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

function removeUndefinedPlayers(teams) {
    const newTeams = structuredClone(teams);
    newTeams.forEach((team, idx) => newTeams[idx] = team.filter(p => p !== undefined))
    return newTeams;
}

function notAllTeamsAreFull(teams, minTeamPlayers) {
    return removeUndefinedPlayers(teams).find(team => team.length < minTeamPlayers) != null;
}

function generateTeams(players, rules, teamCount) {
    const minTeamPlayers = Math.floor(players.length / teamCount);

    let selectedTeams = selectTeams(players, rules, teamCount)
    for (let attempt = 0; attempt < 100 && notAllTeamsAreFull(selectedTeams, minTeamPlayers); attempt++) {
        selectedTeams = selectTeams(players, rules, teamCount);
    }


    if (notAllTeamsAreFull(selectedTeams, minTeamPlayers)) {
        throw new Error("Cannot generate teams")
    }

    return removeUndefinedPlayers(selectedTeams);
}
