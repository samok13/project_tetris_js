var PieceModel = {

  init: {},

  Piece: function(x, y){
    this.x = x;
    this.y = y;
  },

  generatePiece: function(){
    var x = Math.floor(Math.random()*11);
    var y = 3;

    controller.currentPiece = new PieceModel.Piece(x, y)
  }, 


  movePiece: function(pieceToMove){
    if (pieceToMove.y < 23) {
      pieceToMove.y += 1;
    }
  },


  moveHorizontal:function(){
    var cd = controller.direction;
    var ccp = controller.currentPiece;
    var divs = controller.getFullDivs();
    var moveLeft = true;
    var moveRight = true;

    // check if we're moving off the board
    if (cd === "left" && ccp.x < 1) {
      moveLeft = false;
    } 
    else if (cd === "right" && ccp.x > 9) {
      moveRight = false;
    } 
    
    // don't drop on top of another piece
    for(var i = 0; i < divs.length; i++){
      var divx = divs[i].getAttribute('data-x');
      var divy = divs[i].getAttribute('data-y');

      if (cd === 'left'){
        if (divx == ccp.x-1 && divy == ccp.y+1){
          moveLeft = false;
        }
      } 

      else if (cd === 'right'){
        if (divx == ccp.x+1 && divy == ccp.y+1) {
          moveRight = false;
        }
      }
    }

    if (cd === "") {
      moveLeft = false;
      moveRight = false;
    }
    
    if (moveLeft && cd === "left"){
      ccp.x -= 1;
    }
    if (moveRight && cd === "right"){
      ccp.x += 1;
    }
  },

  stopPiece: function() {
    var divs = controller.getFullDivs();
    var stop = false;

    for(var i = 0; i < divs.length; i++){
      var divx = divs[i].getAttribute('data-x');
      var divy = divs[i].getAttribute('data-y');

      if( divx == controller.currentPiece.x && divy == controller.currentPiece.y+1){
        stop = true;
      }
    }

    if (controller.currentPiece.y === 23) {
      stop = true;
    }
    if (stop){
      controller.stop();
      this.generatePiece();
    }
  }

}