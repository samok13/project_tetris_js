var controller = {

  np: PieceModel.generatePiece(),

  init: function(){
  BoardModel.buildBoard();
  this.gameLoop();
  
  },

  getBoard: function(){
    return BoardModel.boardArray;
  }, 

  gameLoop: function(){
    var that = this;
    setInterval(function(){PieceModel.movePiece(that.np)}, 1000);
  }


}