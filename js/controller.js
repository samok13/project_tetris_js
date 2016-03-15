var controller = {

  np: PieceModel.generatePiece(),

  init: function(){
    BoardModel.buildBoard();
    // view.init();
    this.gameLoop();
  
  },

  getBoard: function(){
    return BoardModel.boardArray;
  }, 

  gameLoop: function(){
    var that = this;
    setInterval(function(){
      PieceModel.movePiece(that.np);
      view.init(that.np);
    }, 1000);
  }


}