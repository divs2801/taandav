const termsAndDefinitions = [
    { term: 'Natya Veda', definition: 'The fifth Veda created by Brahma combining elements of speech, music, gestures, and emotions.' },
    { term: 'Bharati Vritti', definition: 'Vocal or speech-based expression used in Natya.' },
    { term: 'Kaisikii Vritti', definition: 'A delicate and graceful mode of expression introduced by the Apsaras.' },
    { term: 'Purvaranga Vidhi', definition: 'Preliminary rituals performed before a play to ensure its success.' },
    { term: 'Ranga Devatas', definition: 'The deities responsible for guarding different aspects of the theatre and production.' },
    { term: 'Asura Parajaya', definition: 'The first play produced by Bharata’s troupe, depicting the defeat of demons.' },
    { term: 'Jarjara', definition: 'Indra’s flag-staff, used to protect the production from demonic interference.' },
    { term: 'Viswakarma', definition: 'The celestial architect who built the Natya Griha, a theatre acoustically perfect and protected from disturbances.' }
];

// Create pairs of terms and definitions and shuffle them
let cards = [];
termsAndDefinitions.forEach(item => {
    cards.push({ text: item.term, type: 'term' });
    cards.push({ text: item.definition, type: 'definition' });
});
cards = cards.sort(() => 0.5 - Math.random()); // Shuffle the cards

let firstCard = null;
let secondCard = null;
let locked = false;

function createGameBoard() {
    const grid = document.getElementById('memory-game-grid');
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-game-card', 'hidden');
        cardElement.setAttribute('data-index', index);
        cardElement.setAttribute('data-text', card.text);
        cardElement.setAttribute('data-type', card.type); // 'term' or 'definition'
        cardElement.innerText = ''; // Initially hidden
        cardElement.addEventListener('click', handleCardClick);
        grid.appendChild(cardElement);
    });
}

function handleCardClick(event) {
    const clickedCard = event.target;
    if (locked || clickedCard.classList.contains('matched') || clickedCard === firstCard) return;

    // Reveal the card's text
    clickedCard.innerText = clickedCard.getAttribute('data-text');
    clickedCard.classList.remove('hidden');

    if (!firstCard) {
        firstCard = clickedCard;
    } else if (!secondCard) {
        secondCard = clickedCard;
        checkForMatch();
    }
}

function checkForMatch() {
    locked = true;
    const firstText = firstCard.getAttribute('data-text');
    const secondText = secondCard.getAttribute('data-text');
    const firstType = firstCard.getAttribute('data-type');
    const secondType = secondCard.getAttribute('data-type');

    // Check if they match (term and definition pair)
    const matchingPair = termsAndDefinitions.find(item =>
        (item.term === firstText && item.definition === secondText) ||
        (item.term === secondText && item.definition === firstText)
    );

    if (matchingPair && firstType !== secondType) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetCards();

        // Check if all cards are matched
        const allMatched = document.querySelectorAll('.memory-game-card.matched').length === cards.length;
        if (allMatched) {
            setTimeout(() => {
                window.location.href = 'memory-game-completion.html'; // Redirect to completion screen
            }, 1000);
        }
    } else {
        setTimeout(() => {
            firstCard.innerText = '';
            secondCard.innerText = '';
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    locked = false;
}

// Initialize the game
createGameBoard();