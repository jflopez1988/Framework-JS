

/*Start of game functions*/

// Gets random numbers
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Causes a text to 'blink' while changing its colors infinitely
function colorBlink(selector) {
  $(selector).animate({
    opacity: '1',
  },
  {
    step: function() {
      $(this).css('color', '#DCFF0E');
    },
    queue: true
  }
  )
  .animate({
    opacity: '1'
  },
  {
    step: function() {
      $(this).css('color', 'red');
    },
    queue: true
  }, 600
  )
  .delay(1000)
  .animate({
    opacity: '1'
  },
  {
    step: function() {
      $(this).css('color', '#DCFF0E');
    },
    queue: true
  }
  )
  .animate({
    opacity: '1'
  },
  {
    step: function() {
      $(this).css('color', 'purple')
      colorBlink('h1.main-title');
    },
    queue: true
  }
  );
}

// Returns a candyRow or all CandyColumns
function giveCandyArrays(arrayType, index) {

  var candyCol1 = $('.col-1').children();
  var candyCol2 = $('.col-2').children();
  var candyCol3 = $('.col-3').children();
  var candyCol4 = $('.col-4').children();
  var candyCol5 = $('.col-5').children();
  var candyCol6 = $('.col-6').children();
  var candyCol7 = $('.col-7').children();

  var candyColumns = $([candyCol1, candyCol2, candyCol3, candyCol4,
                       candyCol5, candyCol6, candyCol7]);

  if (typeof index === 'number') {
    var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
                      candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
                      candyCol7.eq(index)]);
  } else {
    index = '';
  }

  if (arrayType === 'columns') {
    return candyColumns;
  } else if (arrayType === 'rows' && index !== '') {
    return candyRow;
  }
}

// Creates candyRow arrays
function candyRows(index) {
  var candyRow = giveCandyArrays('rows', index);
  return candyRow;
}

// Creates candyColumn arrays
function candyColumns(index) {
  var candyColumn = giveCandyArrays('columns');
  return candyColumn[index];
}

// Validates whether there's candy to be deleted in a column
function columnValidation() {
  // Iterates over each candyColumn
  for (var j = 0; j < 7; j++) {
    var counter = 0;
    // Will save the position of candy
    var candyPosition = [];
    // Will save the position of extra candy
    var extraCandyPosition = [];
    // Creates a candyColumn
    var candyColumn = candyColumns(j);
    // Takes candyColumn's first object
    var comparisonValue = candyColumn.eq(0);
    // It will be set to true if there's a gap in between 'candy-lines'
    var gap = false;
    // Iterates over candyColumn object
    for (var i = 1; i < candyColumn.length; i++) {
      // The src attr of comparisonValue
      var srcComparison = comparisonValue.attr('src');
      // the src attr of the object after comparisonValue
      var srcCandy = candyColumn.eq(i).attr('src');

      if (srcComparison != srcCandy) {
        if (candyPosition.length >= 3) {
          gap = true;
        } else {
          candyPosition = [];
        }
        counter = 0;
      } else {
        if (counter == 0) {
          if (!gap) {
            candyPosition.push(i-1);
          } else {
            extraCandyPosition.push(i-1);
          }
        }
        if (!gap) {
          candyPosition.push(i);
        } else {
          extraCandyPosition.push(i);
        }
        counter += 1;
      }
      // Updates comparisonValue
      comparisonValue = candyColumn.eq(i);
    }
    // If extraCandyPosition has more than two elements, it's merged with candyPosition
    if (extraCandyPosition.length > 2) {
      candyPosition = $.merge(candyPosition, extraCandyPosition);
    }
    // If candyPosition has less than/or two elements, it is deleted
    if (candyPosition.length <= 2) {
      candyPosition = [];
    }
    // CandyCount is equal to the number of elements in candyPosition
    candyCount = candyPosition.length;
    // If there was a 'candy line' of 3 or more
    if (candyCount >= 3) {
      deleteColumnCandy(candyPosition, candyColumn);
      setScore(candyCount);
    }
  }
}

// Adds the class 'delete' to 'candy lines' found in candyColumns
function deleteColumnCandy(candyPosition, candyColumn) {
  for (var i = 0; i < candyPosition.length; i++) {
    candyColumn.eq(candyPosition[i]).addClass('delete');
  }
}

// Validates whether there's candy to be deleted in a row
function rowValidation() {
  // Iterates over each candyRow
  for (var j = 0; j < 6; j++) {
    var counter = 0;
    // Will save the position of candy
    var candyPosition = [];
    // Will save the position of extra candy
    var extraCandyPosition = [];
    // Creates a candyRow
    var candyRow = candyRows(j);
    // Takes candyRow's first object
    var comparisonValue = candyRow[0];
    // It will be set to true if there's a gap in between 'candy-lines'
    var gap = false;
    // Iterates over candyRow array
    for (var i = 1; i < candyRow.length; i++) {
      // The src attr of comparisonValue
      var srcComparison = comparisonValue.attr('src');
      // the src attr of the object after comparisonValue
      var srcCandy = candyRow[i].attr('src');

      if (srcComparison != srcCandy) {
        if (candyPosition.length >= 3) {
          gap = true;
        } else {
          candyPosition = [];
        }
        counter = 0;
      } else {
        if (counter == 0) {
          if (!gap) {
            candyPosition.push(i-1);
          } else {
            extraCandyPosition.push(i-1);
          }
        }
        if (!gap) {
          candyPosition.push(i);
        } else {
          extraCandyPosition.push(i);
        }
        counter += 1;
      }
      // Updates comparisonValue
      comparisonValue = candyRow[i];
    }
    // If extraCandyPosition has more than two elements, it's merged with candyPosition
    if (extraCandyPosition.length > 2) {
      candyPosition = $.merge(candyPosition, extraCandyPosition);
    }
    // If candyPosition has less than/or two elements, it is deleted
    if (candyPosition.length <= 2) {
      candyPosition = [];
    }
    // CandyCount is equal to the number of elements in candyPosition
    candyCount = candyPosition.length;
    // If there was a 'candy line' of 3 or more
    if (candyCount >= 3) {
      deleteHorizontal(candyPosition, candyRow);
      setScore(candyCount);
    }
  }
}

// Adds the class 'delete' to 'candy lines' in candyRows
function deleteHorizontal(candyPosition, candyRow) {
  for (var i = 0; i < candyPosition.length; i++) {
    candyRow[candyPosition[i]].addClass('delete');
  }
}

// Sets the score according to the number of candy you got
function setScore(candyCount) {
  var score = Number($('#score-text').text());
  switch (candyCount) {
    case 3:
      score += 25;
      break;
    case 4:
      score += 50;
      break;
    case 5:
      score += 75;
      break;
    case 6:
      score += 100;
      break;
    case 7:
      score += 200;
  }
  $('#score-text').text(score);
}

// It is called whenever the game starts, or changes occur in the game board
function checkBoard() {
  fillBoard();
}

function fillBoard() {
  var top = 6;
  var column = $('[class^="col-"]');

  column.each(function() {
    var candys = $(this).children().length;
    var agrega = top - candys;
    for (var i = 0; i < agrega; i++) {
      // Gets a random candy type
      var candyType = getRandomInt(1, 5);
      // If the column is empty, uses append
      if (i == 0 && candys < 1) {
        $(this).append('<img src="image/'+candyType+'.png" class="element"></img>');
      } else {
        // Or else, pushes the upper, older, candy downwards, inserting the newer before them
        $(this).find('img:eq(0)').before('<img src="image/'+candyType+'.png" class="element"></img>');
      }
    }
  });
  addCandyEvents();
  setValidations();
}

// Sets both column and row validations
function setValidations() {
  columnValidation();
  rowValidation();
  // If there's candy to be deleted
  if ($('img.delete').length != 0) {
    deletesCandyAnimation();
  }
}

// Adds candy's events. Called whenever they are created
function addCandyEvents() {
  $('img').draggable({
    containment: '.panel-board',
    droppable: 'img',
    revert: true,
    revertDuration: 500,
    grid: [100, 100],
    zIndex: 10,
    drag: constrainCandyMovement
  });
  $('img').droppable({
    drop: swapCandy
  });
  enableCandyEvents();
}

function disableCandyEvents() {
  $('img').draggable('disable');
  $('img').droppable('disable');
}

function enableCandyEvents() {
  $('img').draggable('enable');
  $('img').droppable('enable');
}

// Limits the candy's movement (this one is faulty)
function constrainCandyMovement(event, candyDrag) {
  candyDrag.position.top = Math.min(100, candyDrag.position.top);
  candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
  candyDrag.position.left = Math.min(100, candyDrag.position.left);
  candyDrag.position.right = Math.min(100, candyDrag.position.right);
}

// Swaps one candy for another (through drag and drop)
function swapCandy(event, candyDrag) {
  // The candy that was dragged
  var candyDrag = $(candyDrag.draggable);
  // The src attr of candyDrag
  var dragSrc = candyDrag.attr('src');
  // The 'droppable' candy
  var candyDrop = $(this);
  // The src attr of candyDrop
  var dropSrc = candyDrop.attr('src');
  // We swap candyDrag and candyDrag src attributes
  candyDrag.attr('src', dropSrc);
  candyDrop.attr('src', dragSrc);

  setTimeout(function() {
    checkBoard();
    // This way, we impede wrong moves
    if ($('img.delete').length == 0) {
      // candyDrag and candyDrop are given their initial src's
      candyDrag.attr('src', dragSrc);
      candyDrop.attr('src', dropSrc);
    } else {
      updateMoves();
    }
  }, 500);

}

// Updates the moves value
function updateMoves() {
  var actualValue = Number($('#moves-text').text());
  var result = actualValue += 1;
  $('#moves-text').text(result);
}

// Animation that precedes candy deletion
function deletesCandyAnimation() {
  disableCandyEvents();
  $('img.delete').effect('pulsate', 1000);
  $('img.delete').animate({
    opacity: '0'
  },{
    duration: 800
  }
  )
  .animate({
    opacity: '0'
  },
  {
    duration: 1000,
    complete: function() {
      deletesCandy();
      checkBoard();
    },
    queue: true
  }
  )
}

// Deletes candy
function deletesCandy() {
  $('img.delete').remove();
}

//Ends the game
function endGame() {
  $('div.panel-board, div.time').effect('fold');
  $('h1.main-title').addClass('title-over')
  .text('Thanks for playing!');
  $('div.score, div.moves, div.panel-score').width('100%');
}

// Starts the game
function initGame() {

  colorBlink('h1.main-title');

  $('.btn-retry').click(function() {
    // Reloads the page when clicked for the second time
    if ($(this).text() == 'Retry') {
      location.reload(true);
    }
    checkBoard();
    $(this).text('Reintentar');
    // Comenzar a contar el tiempo
    $('#timer').startTimer({
      onComplete: endGame
    })
  });
}

/* End of game functions */

/* It prepares the game */
$(function() {
  initGame();
});
