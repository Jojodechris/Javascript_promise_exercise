// let baseURL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=2';

// $.getJSON(baseURL)
//   .then(data => {
//     console.log(data.cards[0].value + " of " + data.cards[0].suit);
//     console.log(data.cards[1].value + " of " + data.cards[1].suit);
 
//     $.getJSON(baseURL)
//     .then((data)=>{
//     // Assign the value of the second card to the 'second' variable
//     let second = data.cards[2].value + " of " + data.cards[2].suit;

//     // You can use the 'second' variable here or elsewhere in your code
//     console.log("Second card: " + second);
//   });
//   })
$(function() {
  let baseURL = 'https://deckofcardsapi.com/api/deck/new';

  // 1.
  $.getJSON(`${baseURL}/new/draw/`).then(data => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });


  // 2.
  let firstCard = null;
  $.getJSON(`${baseURL}/new/draw/`)
    .then(data => {
      firstCard = data.cards[0];
      let deckId = data.deck_id;
      return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then(data => {
      let secondCard = data.cards[0];
      [firstCard, secondCard].forEach(function(card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });

  // 3.
  let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#card-area');

  $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });
  });

