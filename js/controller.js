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
      PieceModel.checkRow();
    }, 500);
  },

  userMove: function(){
    PieceModel.userMove();
    controller.direction = "";
  },

  stop: function() {
    view.stopPiece();
  }, 

  getFullDivs: function(){
    return view.getFullDivs();
  },

  getColDivs: function(colNum){
    return view.getColDivs(colNum);
  },

  getRowDivs: function(rowNum){
    return view.getRowDivs(rowNum);
  }

}