document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'A', img: '🍉' },
        { name: 'A', img: '🍉' },
        { name: 'B', img: '🍎' },
        { name: 'B', img: '🍎' },
        { name: 'C', img: '🍐' },
        { name: 'C', img: '🍐' },
        { name: 'D', img: '🍑' },
        { name: 'D', img: '🍑' },
        { name: 'E', img: '🍒' },
        { name: 'E', img: '🍒' },
        { name: 'F', img: '🍌' },
        { name: 'F', img: '🍌' },
        { name: 'G', img: '🍇' },
        { name: 'G', img: '🍇' },
        { name: 'H', img: '🥑' },
        { name: 'H', img: '🥑' }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.querySelector('#gameBoard');
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];

    function createBoard() {
        cardArray.forEach((_, i) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.id = i;
            card.addEventListener('click', flipCard);
            card.innerHTML = `
                <div class="inner">
                    <div class="front">${cardArray[i].img}</div>
                    <div class="back"></div>
                </div>
            `;
            gameBoard.appendChild(card);
        });
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [optionOneId, optionTwoId] = cardsChosenIds;

        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            setTimeout(() => {
                cards[optionOneId].classList.remove('flipped');
                cards[optionTwoId].classList.remove('flipped');
            }, 1000);
        }
        cardsChosen = [];
        cardsChosenIds = [];

        if (cardsWon.length === cardArray.length / 2) {
            setTimeout(() => alert('You winnnnnnn!!!'), 500);
        }
    }

    function flipCard() {
        const cardId = this.dataset.id;
        if (!cardsChosenIds.includes(cardId) && cardsChosenIds.length < 2) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenIds.push(cardId);
            this.classList.add('flipped');
            
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    createBoard();
});
