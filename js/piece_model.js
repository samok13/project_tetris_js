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


  userMove:function(){
    var cd = controller.direction;
    var ccp = controller.currentPiece;
    var divs = controller.getFullDivs();
    var moveLeft = true;
    var moveRight = true;

    // check if we're moving off the board
    if (cd === "left" && ccp.x < 1) {
      moveLeft = false;
    } 
    else if (cd === "right" && ccp.x > 8) {
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
    if( cd === 'fastDown'){
      var colXDivs = controller.getColDivs(ccp.x);
      var newY;
      for (var y = ccp.y; y <= 23; y++){
        for(var i = 0; i < colXDivs.length; i ++){
          if(colXDivs[i].getAttribute('data-y') == y){
            newY = y - 2;
            break;
          }
        }
        if (newY){
          break;
        }   
      }
      if (!newY){
        newY = 23;
      }
      ccp.y = newY;
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
  }, 

  checkRow: function(){
    var ccp = controller.currentPiece;
    
    for (var y = 23; y > ccp.y; y--){
      console.log('inside first loop');
      var rowYDivs = controller.getRowDivs(y);
      console.log('row divs set to' + rowYDivs);
      if(rowYDivs.length == 10){

        //get highest y value 
        //loop through all divs in a single row
        for (var x = 0; x < 9; x++){
          var highestYDiv = 23;
          var colXDivs = controller.getColDivs(x);

          for(var i = 0; i < colXDivs.length; i++){
            var yVal = colXDivs[i].getAttribute('data-y');
            console.log(yVal + 'yVal');
            if (yVal < highestYDiv){
              highestYDiv = yVal;
              console.log(highestYDiv + 'highestYDiv');
            }
          }
          $(".full[data-x='"+ x +"'][data-y='" + highestYDiv + "']").removeClass('full'); 
        }
      }
    }
  }  

}


