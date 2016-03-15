var PieceModel = {

  init: {},

  Piece: function(x, y){
    this.x = x;
    this.y = y;
  },

  generatePiece: function(){
    var x = Math.floor(Math.random()*4);
    var y = 3;

    controller.currentPiece = new PieceModel.Piece(x, y)
  }, 

  movePiece: function(pieceToMove){
    //var pieceToMove = this.generatePiece();
    if (pieceToMove.y < 23) {
      pieceToMove.y += 1;
    }
  },

  moveHorizontal: function(){
    if(controller.direction === 'left' && controller.currentPiece.x > 0){
      controller.currentPiece.x -= 1;
    } else if (controller.direction === 'right' && controller.currentPiece.x < 9) {
      controller.currentPiece.x += 1;
    } 
  },

  pieceHitsBottom: function() {
    if (controller.currentPiece.y === 23) {
      controller.keepBottomPiece();
      this.generatePiece();
    }
  }


}