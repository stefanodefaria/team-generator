function generateTeamsButtonAction() {
    const namesInput = document.getElementById('names-input').value;
    const rulesInput = document.getElementById('rules-input').value;
    const teamCount = parseInt(document.getElementById('team-count-select').value, 10);
    const players = namesInput.split('\n').map(name => name.trim());
    const rules = rulesInput.split('\n').map(rule => rule.split(",").map(player => player.trim()));

    try {
        const teams = generateTeams(players, rules, teamCount);
        let textForCopying = '';
        teams.forEach((team, idx) => {
            const teamAsString = `${team.join(', ')}`;
            textForCopying += `Time ${idx + 1}: ${teamAsString}\n`;
            document.getElementById(`output-${idx + 1}`).textContent = teamAsString;
        });
        document.getElementById('copy-content').textContent = textForCopying;
        displayOnlyTeamResults(teamCount);
    } catch (e) {
        displayOnlyErrorMessage();
    }
}

function hideWelcomeMessages() {
    document.getElementById('copy-feedback-message').style.display = 'none';
    document.getElementById('pre-infos').style.display = 'none';
}

function displayOnlyErrorMessage() {
    hideWelcomeMessages();
    document.getElementById('team-results').style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
}

function displayOnlyTeamResults(teamCount) {
    hideWelcomeMessages();

    if(teamCount === 2) {
        document.getElementById('team-results-3').style.display = 'none';
    } else if (teamCount === 3) {
        document.getElementById('team-results-3').style.display = 'block';
    }

    document.getElementById('error-message').style.display = 'none';
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
