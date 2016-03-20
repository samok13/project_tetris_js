var controller = {

  currentPiece: null,
  direction: '',
  state: {
    justStoppedPiece: false,
  },
  

  init: function(){
    BoardModel.buildBoard();
    PieceModel.generatePiece();
    view.init();
    view.renderBoard();
    this.setupGameLoop();
    // this.gameLoop();
  
  },

  // getBoard: function(){
  //   return BoardModel.boardArray;
  // }, 

  // gameLoop: function(){
  //   var that = this;
  //   setInterval(function(){
  //     PieceModel.movePiece(that.currentPiece);
  //     PieceModel.stopPiece(that.currentPiece);
  //     view.renderPiece(that.currentPiece);
  //     PieceModel.checkRow();
  //   }, 500);
  // },

  setupGameLoop: function() {
    setInterval(this.gameLoop, 500);
  },

  gameLoop: function() {
    PieceModel.movePiece(controller.currentPiece);
    controller.state.justStoppedPiece = PieceModel.stopPiece(controller.currentPiece);
    view.renderPiece(controller.currentPiece);
    PieceModel.checkRow();
  },

  userMove: function(){
    PieceModel.userMove();
    controller.direction = "";
  },

  stop: function() {
    view.stopPiece(this.currentPiece);
  }, 

  getStoppedBlocks: function(){
    return view.getStoppedBlocks();
  },

  getColDivs: function(colNum){
    return view.getColDivs(colNum);
  },

  getRowDivs: function(rowNum){
    return view.getRowDivs(rowNum);
  }

}
