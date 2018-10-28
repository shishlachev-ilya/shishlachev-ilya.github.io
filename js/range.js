document.addEventListener("DOMContentLoaded", function () {

  $( ".range" ).slider({
    range: true,
    min: 0,
    max: 5000,
    values: [ 0, 5000 ],
    slide: function( event, ui ) {
      $( ".from" ).val( ui.values[ 0 ] );
      $( ".to" ).val( ui.values[ 1 ] );
    }
  });
  $( ".from" ).val( $( ".range" ).slider( "values", 0 ) );
  $( ".to" ).val( $( ".range" ).slider( "values", 1 ) );

  // Изменение местоположения ползунка при вводиде данных в первый элемент input
  $(".from").change(function(){
    var value1=$(".from").val();
    var value2=$(".to").val();
    if(parseInt(value1) > parseInt(value2)){
      value1 = value2;
      $("from").val(value1);
    }
    $(".range").slider("values",0,value1);
  });

  // Изменение местоположения ползунка при вводиде данных в второй элемент input
  $(".to").change(function(){
    var value1=$(".from").val();
    var value2=$(".to").val();

    if(parseInt(value1) > parseInt(value2)){
      value2 = value1;
      $(".to").val(value2);
    }
    $(".range").slider("values",1,value2);
  });

});