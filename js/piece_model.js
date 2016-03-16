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
    
    for (var y = 23; y < ccp.y; y--){
      var rowYDivs = controller.getRowDivs(y);
      if(rowYDivs.length == 10){

        //get highest y value 
        //loop through all the column divs
        for (var x = 0; x < 9; x++){
          var highestYDiv = 23;
          var colXDiv = controller.getColDivs(x);

          colXDiv.forEach(function(div){
            var yVal = div.getAttribute('data-y')

            if (yVal < highestYDiv){
              highestYDiv = yval;
            }
          });

        $('full[data-x="'+ x + '"][data-y="' + highestYDiv + '"]').removeClass('full');
        }
      }
    }
  }, 

  //have to modify to check all rows.
    //loop through rows starting with y = 23 up to currentPiece.y
    //for each value of x (keeping y the same), check if 'full' is on the piece
      //if 10 fulls in a row
      //getRowDivs
      //checkRowDivs.length
      //if eq 10
      //remove full class from the row
        //instead of removing, think about looping through the colDivs, getting the one with the lowest y value and removing 'full'


  // checkRows: function(){
  //   var divs = controller.getFullDivs();
  //   var rowCounter = 0;
  //   var yval = 0;

  //   //if there are 10 divs with the same div.y then row full
  //   for(var x = 0; x <= 9; x++){
  //     var divx = divs[i].getAttribute('data-x');
  //     var divy = divs[i].getAttribute('data-y');
  //   }
  //   if (divy === yval){
  //     yval = divy;
  //     yval += 1;
  //   }
  //   if (yval === 9){
  //     return true;
  //   }
    
  // }

}