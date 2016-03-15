
HEIGHT = 20;
HIDDEN_ROWS = 4;
WIDTH = 10;



var BoardModel = {

  init: {},

  boardArray: [],

  buildBoard: function() {
    for(var y = 0; y < (HEIGHT+HIDDEN_ROWS); y++){
      var row = [];
      for(var x = 0; x < WIDTH; x++){
        row.push(new PieceModel.Piece(x,y));
      }
      this.boardArray.push(row);
    }
  },










}