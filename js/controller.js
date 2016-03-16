var controller = {

  currentPiece: null,
  direction: '',

  init: function(){
    BoardModel.buildBoard();
    PieceModel.generatePiece();
    view.init();
    view.renderBoard();
    this.gameLoop();
  
  },

  getBoard: function(){
    return BoardModel.boardArray;
  }, 

  gameLoop: function(){
    var that = this;
    setInterval(function(){
      PieceModel.movePiece(that.currentPiece);
      PieceModel.stopPiece();
      view.renderPiece(that.currentPiece);
    }, 100);
  },

  moveSideways: function(){
    PieceModel.moveHorizontal();
    controller.direction = "";
  },

  stop: function() {
    view.stopPiece();
  }, 

  getFullDivs: function(){
    return view.getFullDivs();
  }



}