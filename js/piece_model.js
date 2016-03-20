var PieceModel = {

  shapeTypes: ['single', 'square', 'line', 'leftL', 'rightL'],

  Block: function (x, y) {
    this.x = x;
    this.y = y;
  },

  Piece: function(x, y){
    // origin of the piece
    this.x = x;
    this.y = y;
    this.shape = PieceModel.shapeTypes[Math.floor(Math.random() * 5)];

    this.getBlocks = function() {
      var blocks = []
      if(this.shape === 'single'){
        blocks.push(new PieceModel.Block(this.x,this.y));
      } 
      else if(this.shape === 'square'){
        blocks.push(new PieceModel.Block(this.x,this.y));
        blocks.push(new PieceModel.Block(this.x+1,this.y));
        blocks.push(new PieceModel.Block(this.x,this.y-1));
        blocks.push(new PieceModel.Block(this.x+1,this.y-1));
      }
      else if(this.shape === 'line'){
        blocks.push(new PieceModel.Block(this.x,this.y));
        blocks.push(new PieceModel.Block(this.x,this.y-1));
        blocks.push(new PieceModel.Block(this.x,this.y-2));
        blocks.push(new PieceModel.Block(this.x,this.y-3));
      }
      else if(this.shape === 'leftL'){
        blocks.push(new PieceModel.Block(this.x,this.y));
        blocks.push(new PieceModel.Block(this.x+1,this.y));
        blocks.push(new PieceModel.Block(this.x+1,this.y - 1));
        blocks.push(new PieceModel.Block(this.x+1,this.y - 2));
      }
      else if(this.shape === 'rightL'){
        blocks.push(new PieceModel.Block(this.x,this.y));
        blocks.push(new PieceModel.Block(this.x+1,this.y));
        blocks.push(new PieceModel.Block(this.x,this.y -1));
        blocks.push(new PieceModel.Block(this.x,this.y - 2));
      }
      return blocks;
    }

  },

  generatePiece: function(){
    var x = Math.floor(Math.random()*9);
    var y = 3;

    var piece = new PieceModel.Piece(x, y);
    var potentialBlocks = piece.getBlocks();

    var onBoard = true;
    for(var i = 0; i < potentialBlocks.length; i++){
      if (!BoardModel.isPositionOnBoard(potentialBlocks[i])){
        onBoard = false;
      }
    }
    if (onBoard) {
      controller.currentPiece = piece;    
    }
    else{
      this.generatePiece();
    }
  }, 


  movePiece: function(pieceToMove){
    if (pieceToMove.y < 23) {
      pieceToMove.y += 1;
    }
  },


  userMove:function(){
    var cd = controller.direction;
    var ccp = controller.currentPiece;
    var divs = controller.getStoppedBlocks();
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
      while(!controller.state.justStoppedPiece){
        controller.gameLoop()
      }
      // var colXDivs = controller.getColDivs(ccp.x);
      // var newY;
      // for (var y = ccp.y; y <= 23; y++){
      //   for(var i = 0; i < colXDivs.length; i ++){
      //     if(colXDivs[i].getAttribute('data-y') == y){
      //       newY = y - 2;
      //       break;
      //     }
      //   }
      //   if (newY){
      //     break;
      //   }   
      // }
      // if (!newY){
      //   newY = 23;
      // }
      // ccp.y = newY;
    }
  },

  stopPiece: function(currentPiece) {
    var divs = controller.getStoppedBlocks();
    var stop = false;
    var blocks= currentPiece.getBlocks();

    for(var i = 0; i < divs.length; i++){
      var divx = divs[i].getAttribute('data-x');
      var divy = divs[i].getAttribute('data-y');

      for(var j = 0; j < blocks.length; j++){
        if( divx == blocks[j].x && divy == blocks[j].y+1){
          console.log('stopme');
          stop = true;
        }
      }  
    }

    for(var j = 0; j < blocks.length; j++){
      if( 24 == blocks[j].y+1){
        stop = true;
      }
    } 
    if (stop){
      controller.stop();
      this.generatePiece();
    }
    return stop;
  }, 

  checkRow: function(){
    var ccp = controller.currentPiece;
    
    for (var y = 23; y > ccp.y; y--){
      var rowYDivs = controller.getRowDivs(y);
      if(rowYDivs.length == 10){

        //get highest y value 
        //loop through all divs in a single row
        for (var x = 0; x < 10; x++){
          var highestYDiv = 23;
          var colXDivs = controller.getColDivs(x);

          for(var i = 0; i < colXDivs.length; i++){
            var yVal = colXDivs[i].getAttribute('data-y');
            if (yVal < highestYDiv){
              highestYDiv = yVal;
            }
          }
          $(".stopped-block[data-x='"+ x +"'][data-y='" + highestYDiv + "']").removeClass('stopped-block'); 
        }
      }
    }
  },  

}


