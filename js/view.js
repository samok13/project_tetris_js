var view = {

  init: function(piece){
    // register event listeners
    this.eventListeners();


  },

  renderBoard: function(){
    // $("#board").html("");

    // var board = controller.getBoard();
    //Need to adjust o render the blocks array not just the piece

    for (var y = 0; y < 24; y++) {
      $("#board").append('<div class="row row'+ y + '"></div>');
      for(var x = 0; x < 10; x++){
        $('.row'+ y).append('<div class="col-xs-1 cell" data-x='+ x +' data-y='+ y +' ></div>');
      }
    } 
    this.hideTopRows();  
  },

  renderPiece: function(piece) {
    // set a class on the div that matches the piece's x and y coords
    // var x = piece.x;
    // var y = piece.y;
    var blocks = piece.getBlocks();


    // remove class from previous block, regardless of location
    $('.cell').removeClass('moving-block');

    for(var i = 0; i < blocks.length; i++){
      var block = blocks[i];
      var divToAdd = $('[data-y=' + block.y + '][data-x=' + block.x + ']');
      $(divToAdd).addClass('moving-block');
    }
    // add class to current block
    
  },

  stopPiece: function(piece) {
    var blocks = piece.getBlocks();

    for(var i = 0; i < blocks.length; i++){
      var block = blocks[i];
      var divToAdd = $('[data-y=' + block.y + '][data-x=' + block.x + ']');
      $(divToAdd).addClass('stopped-block');
    }
  },


  eventListeners: function(){
    $(document).keyup(function(event){
      switch(event.which){
        //left
        case 37:
        controller.direction = 'left';
        break;

        //right
        case 39:
        controller.direction = 'right';
        break;

        //down arrow
        case 40:
        controller.direction = 'fastDown';
        console.log('fastDown');
        break;

        default: return;
      }
      event.preventDefault();
      controller.userMove();
    }); 
  }, 

  getStoppedBlocks: function(){
    return $('.stopped-block')
  },

  getColDivs: function(colNum){
    return $('.stopped-block[data-x="' + colNum + '"]');
  },

  getRowDivs: function(rowNum){
    return $('.stopped-block[data-y="' + rowNum + '"]');
  }, 

  hideTopRows: function() {
    $('.col-xs-1[data-y="0"]').hide()
    $('.col-xs-1[data-y="1"]').hide()
    $('.col-xs-1[data-y="2"]').hide()
    $('.col-xs-1[data-y="3"]').hide()
  }

}

