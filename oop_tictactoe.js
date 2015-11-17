var newController = new boardController();
var newPlayer = new player();
var newBoard = new board();

//Game Controller
function boardController() {
    this.player1Turn = true;

    this.updatePoints = function (square) {
        for (var i in newBoard.gameBoard) {
            if ($(square).hasClass(i)) {
                if (this.player1Turn) {
                    newBoard.gameBoard[i]['p1'] += 1;
                }

                else {
                    newBoard.gameBoard[i]['p2'] += 1;
                }
            }
        }
    };

    this.checkForWin = function () {
        for (var i in newBoard.gameBoard) {
            if (newBoard.gameBoard[i]['p1'] == 3) {
                //Activate the modal and fill it with proper contents
                $('#pix-modal img').attr('src', 'images/betafish.png');
                $('.modal-footer p').text('Beta Fish Wins!');
                $('#pix-modal').modal();
                this.resetGame();
                return
            }

            else if (newBoard.gameBoard[i]['p2'] == 3) {
                $('#pix-modal img').attr('src', 'images/puffer.png');
                $('.modal-footer p').text('Puffer Fish Wins!');
                $('#pix-modal').modal();
                this.resetGame();
                return
            }
        }
    };

    this.checkForWinLg = function () {
        for (i in newBoard.gameBoard) {
            if (newBoard.gameBoard[i]['p1'] == 4) {
                //Activate the modal and fill it with proper contents
                $('#pix-modal img').attr('src', 'images/betafish.png');
                $('.modal-footer p').text('Beta Fish Wins!');
                $('#pix-modal').modal();
                this.resetGame();
                return
            }

            else if (newBoard.gameBoard[i]['p2'] == 4) {
                $('#pix-modal img').attr('src', 'images/puffer.png');
                $('.modal-footer p').text('Puffer Fish Wins!');
                $('#pix-modal').modal();
                this.resetGame();
                return
            }
        }
    };

    this.resetGame = function () {
        $('.game_board').html('').removeClass('clicked');

        this.player1Turn = true;

        newBoard.resetBoard();
    }
}

//Player
function player() {
    this.player1_piece = 'images/betafish.png';
    this.player2_piece = 'images/puffer.png';

    this.insertPlayerPiece = function (square) {

        if (newController.player1Turn == true) {
            var player1_icon = $('<img>').attr('src', this.player1_piece);
            $(square).prepend(player1_icon);
            $(square).addClass('clicked x');
        }

        else {
            var player2_icon = $('<img>').attr('src', this.player2_piece);
            $(square).prepend(player2_icon);
            $(square).addClass('clicked o');
        }
    }
}

//Board
function board() {
    this.gameBoard = {
        column1: {p1: 0, p2: 0},
        column2: {p1: 0, p2: 0},
        column3: {p1: 0, p2: 0},
        column4: {p1: 0, p2: 0},
        row1: {p1: 0, p2: 0},
        row2: {p1: 0, p2: 0},
        row3: {p1: 0, p2: 0},
        row4: {p1: 0, p2: 0},
        diagonal1: {p1: 0, p2: 0},
        diagonal2: {p1: 0, p2: 0}
    };

    this.resetBoard = function () {
        this.gameBoard = {
            column1: {p1: 0, p2: 0},
            column2: {p1: 0, p2: 0},
            column3: {p1: 0, p2: 0},
            column4: {p1: 0, p2: 0},
            row1: {p1: 0, p2: 0},
            row2: {p1: 0, p2: 0},
            row3: {p1: 0, p2: 0},
            row4: {p1: 0, p2: 0},
            diagonal1: {p1: 0, p2: 0},
            diagonal2: {p1: 0, p2: 0}
        };
    };

    this.swapInEasyBoard = function () {
        $(".gameboard_wrapper").removeClass('hide');
        $(".lg_gameboard_wrapper").addClass('hide');
    };

    this.swapInDifficultBoard = function () {
        $(".lg_gameboard_wrapper").removeClass('hide');
        $(".gameboard_wrapper").addClass('hide');
    }
}

//Misc Functions

//Document Ready - Click Handler
$(document).ready(function () {
    $('.gameboard_wrapper, .lg_gameboard_wrapper').on('click', '.game_board', function () {

        var current_square = this;

        if ($(this).hasClass("clicked")) {
            return
        }

        else {
            newPlayer.insertPlayerPiece(current_square);
            newController.updatePoints(current_square);

            //Which Difficulty Board Check
            if ($('.gameboard_wrapper').hasClass('hide')) {
                newController.checkForWinLg();
            }

            else {
                newController.checkForWin();
            }

            //Player Toggle
            if (newController.player1Turn) {
                newController.player1Turn = false;
            }

            else {
                newController.player1Turn = true;
            }
        }
    });

    //Difficulty Board Switch
    $("#easy").click(function () {
        newBoard.swapInEasyBoard();
        newController.resetGame();
    });

    $("#difficult").click(function () {
        newBoard.swapInDifficultBoard();
        newController.resetGame();
    });
});