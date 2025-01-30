function generateTeamsButtonAction() {
    sanitizePlayersTextArea()
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
        console.error(e);
    }
    window.scrollTo(0, 0);
}

function sanitizePlayersTextArea() {
    const dirtyPlayersText = document.getElementById('names-input').value;
    document.getElementById('names-input').value = sanitizeNamesInput(dirtyPlayersText);
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
    const contentToCopy = document.getElementById('copy-content').textContent;

    navigator.clipboard.writeText(contentToCopy)
        .then(() => {
            document.getElementById('copy-feedback-message').style.display = 'block';
        })
        .catch(err => {
            document.getElementById('copy-feedback-message').style.display = 'block';
            document.getElementById('copy-feedback-message').textContent = "Erro ao copiar os times.";
            console.error('Erro ao copiar para o clipboard: ', err);
        });
}

function sanitizeNamesInput(namesInput) {
    return namesInput.replace(/^.*mensalista não confirmado:/s, '')
        .replaceAll("✖️", "❌")
        .replaceAll("✔️", "✅")
        .replaceAll("☑️", "✅")
        .split('\n')
        .map(line => line.trim())
        .filter(line => Boolean(line) && !line.includes('🧤'))
        .map(line => {
            let player = '';
            let transformedLine = line.replace(/^\d+\s*-\s*/, '');
            const alreadySanitized = line.match(/^(?:[A-zÀ-ú]+\s*[0-9]?\s*)+$/);
            if (transformedLine.includes('❌')) { // Considerar avulsos
                player = line.split('❌')[1].trim();
            } else if (alreadySanitized || transformedLine.includes('✅')) { // Somente considerar mensalista confirmado
                player = transformedLine;
            }

            return player.replace(/✅/g, '').trim();
        })
        .filter(Boolean)
        .join('\n');
}


    async function test() {
        try {
            // Verifica se o navegador suporta a API Clipboard
            if (navigator.clipboard && navigator.clipboard.readText) {
                const clipboardText = await navigator.clipboard.readText();
                document.getElementById('names-input').value = clipboardText;
            } else {
                // Fallback para navegadores que não suportam a API Clipboard
                const namesInput = document.getElementById('names-input');
                namesInput.focus();
    
                // Criando um event listener para capturar o "colar" no input
                document.execCommand('paste');
            }
        } catch (error) {
            console.error("Erro ao colar do clipboard:", error);
        }
    }    
