$(document).ready(function(){

    var board;
    var game = new Chess();

    // do not pick up pieces if the game is over
    // only pick up pieces for White
    var onDragStart = function(source, piece, position, orientation) {
      if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
      }
    };

    // ToDo : Improve logic to make better moves
    var makeRandomMove = function() {
      var possibleMoves = game.moves();

      // game over
      if (possibleMoves.length === 0) return;

      var randomIndex = Math.floor(Math.random() * possibleMoves.length);
      game.move(possibleMoves[randomIndex]);
      board.position(game.fen());
    };

    var onDrop = function(source, target) {
      // see if the move is legal
      var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      });

      // illegal move
      if (move === null) return 'snapback';

      // make random legal move for black
      window.setTimeout(makeRandomMove, 250);
    };

    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    var onSnapEnd = function() {
      board.position(game.fen());
    };

    var cfg = {
      draggable: true,
      position: 'start',
      onDragStart: onDragStart,
      onDrop: onDrop,
      //onChange: onChange,
      onSnapEnd: onSnapEnd
    };
    board = ChessBoard('board', cfg);

//    var onChange = function(oldPos, newPos) {
//      console.log("Position changed:");
//      console.log("Old position: " + ChessBoard.objToFen(oldPos));
//      console.log("New position: " + ChessBoard.objToFen(newPos));
//      console.log("--------------------");
//    };

    $('#startBtn').on('click', board.start);
    $('#clearBtn').on('click', board.clear);
});


