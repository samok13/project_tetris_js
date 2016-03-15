var controller = {

  np: PieceModel.generatePiece(),
  currentPiece: null,
  direction: '',

  init: function(){
    BoardModel.buildBoard();
    this.currentPiece = PieceModel.generatePiece();
    view.init();
    this.gameLoop();
  
  },

  getBoard: function(){
    return BoardModel.boardArray;
  }, 

  gameLoop: function(){
    var that = this;
    setInterval(function(){
      PieceModel.movePiece(that.currentPiece);
      view.renderBoard();
      view.renderPiece(that.currentPiece);
    }, 1000);
  },

  moveSideways: function(){
    PieceModel.moveHorizontal();
  }


}