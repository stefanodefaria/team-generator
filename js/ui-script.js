function generateTeamsButtonAction() {
    const namesInput = document.getElementById('names-input').value;
    const rulesInput = document.getElementById('rules-input').value;
    const teamCount = parseInt(document.getElementById('team-count-select').value, 10);
    const players = sanitizePlayers(namesInput);
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
    window.scrollTo(0, 0);
}

function sanitizePlayers(playersString) {
    const pattern = "(?:\\d{1,2}\\s*-\\s*(?:(?:((?:[A-zÀ-ú]+\\s*[0-9]?\\s*)+))❌\\s*)?(?:(?:((?:[A-zÀ-ú]+\\s*[0-9]?\\s*)+))✅?))|(?:(?:((?:[A-zÀ-ú]+\\s*[0-9]?\\s*)+)))";

    return playersString.split('\n')
        .map(p => p.trim())
        .map(p => p.replaceAll("✖️", "❌").replaceAll("✔️", "✅").replaceAll("☑️", "✅"))
        .filter(p =>
            new RegExp(pattern, "g").test(p)
        )
        .map(p => new RegExp(pattern, "g").exec(p).filter(Boolean).pop())
        .filter(Boolean)
        .map(p => p.trim());
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

    if (teamCount === 2) {
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
