// form

export const inputs = () => {
  $('input,select').focus(function(){
    $(this).parents('fieldset').addClass('focused');
  });
  
  $('input,select').blur(function(){
    var inputValue = $(this).val();
    if ( inputValue == "" ) {
      $(this).removeClass('filled');
      $(this).parents('fieldset').removeClass('focused');  
    } else {
      $(this).addClass('filled');
    }
  })    
}
