var player1 = prompt("Player One: Enter Your Name, You will be Blue");
console.log("Player One is: " + player1);
var player1Color = 'rgb(50, 123, 240)';

var player2 = prompt("Player Two: Enter Your Name, You will be Red");
console.log("Player Two is: " + player2);
var player2Color = 'rgb(248, 34, 66)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum) {
    console.log(currentName + " You won starting at this row, col: (" + (rowNum + 1) + "," + (colNum + 1) + ")");
}

function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
    for (var row = 5; row >= 0; row--) {
        if (returnColor(row, colIndex) === 'rgb(128, 128, 128)') {
            return row;
        }
    }
    return -1;
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
                console.log('Horizontal Win');
                reportWin(row, col);
                return true;
            }
        }
    }
    return false;
}

function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
                console.log('Vertical Win');
                reportWin(row, col);
                return true;
            }
        }
    }
    return false;
}

function diagonalWinCheck() {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 7; col++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3)) ||
                colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                console.log('Diagonal Win');
                reportWin(row, col);
                return true;
            }
        }
    }
    return false;
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + " it is your turn, pick a column to drop in!");

$('button').on('click', function () {
    var col = $(this).closest('td').index();
    var bottomAvail = checkBottom(col);

    if (bottomAvail !== -1) {
        changeColor(bottomAvail, col, currentColor);

        if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
            $('h1').text(currentName + " You have Won!");
            $('h3').fadeOut(20);
            $('.container').fadeOut(7000);
            game_on = false;
            return;
        }

        currentPlayer *= -1;
        if (currentPlayer === 1) {
            currentName = player1;
            currentColor = player1Color;
        } else {
            currentName = player2;
            currentColor = player2Color;
        }

        $('h3').text(currentName + " it is your turn, pick a column to drop in!");
    }
});
