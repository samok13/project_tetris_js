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

  // moveHorizontal:function(){
  //   var cd = controller.direction
  //   if(cd === 'left')
  // }



  },

  stopPiece: function() {
    var divs = controller.getFullDivs();
    var stop = false;

    for(var i = 0; i < divs.length; i++){
      var divx = divs[i].getAttribute('data-x');
      var divy = divs[i].getAttribute('data-y');
      console.log(divx, divy);

      // if(controller.direction === 'left'){
      //   if(divx == controller.currentPiece.x-1 && divy == controller.currentPiece.y+1){
      //     stop = true;
      //   }
      // }
      // else if (controller.direction === 'right'){
      //   if(divx == controller.currentPiece.x+1 && divy == controller.currentPiece.y+1){
      //     stop = true;
      //   }
      // } 
      // else{
      if( divx == controller.currentPiece.x && divy == controller.currentPiece.y+1){
        stop = true;
      }
      // } 
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