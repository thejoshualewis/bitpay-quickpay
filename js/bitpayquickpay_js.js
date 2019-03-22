
    function showBpQp(env,api,btnId){
    BPQPhideMessage()
    var price = jQuery('#'+btnId).val()
    if(price.length == 0){
        alert('Please enter a price')
        return
    }

    if(isNaN(parseInt(price)) || parseInt(price) == 0){
        alert('Minimum of 1.00 is required')
        jQuery('#'+btnId).val('')
        return
       }
       
    BPQPAddClickState()   
    var d = jQuery('#desc_'+btnId).val()
    if (env == 'test'){
        bitpay.enableTestMode()
    }
     var myObj = {
        price: price,
        description:d
     }
   var saveData = jQuery.ajax({
       type: 'POST',
       url: api,
       data: myObj,
       dataType: "text",
      
       success: function (resultsData) {
           
            response = JSON.parse(resultsData);
            if(typeof(response.error) !== "undefined"){
                BPQPRemoveClickState()
                BPQPhideMessage()
                alert(response.error)
                return;
            }
            //console.log(response)
            bitpay.showInvoice(response.data.id)
            BPQPRemoveClickState()
       }
   });
}

function BPQPFrontend_Clean(val,button){
    if (val.length == 0 || !jQuery.isNumeric(val)){
        val = val.substring(0, val.length - 1)
        jQuery('#' + button).val(val)
        
        return
    }
}
function BPQPAddClickState(){
    jQuery('.bpqpButton').addClass( "bpqpButtonClicked" );
    jQuery('.bpqpButton').prop('disabled', true);
}
function BPQPRemoveClickState(){
    jQuery('.bpqpButton').removeClass( "bpqpButtonClicked" );
    jQuery('.bpqpButton').prop('disabled', false);
    
}
function BPQPshowMessage(){
    jQuery('.bpqpMsg').show()
}
function BPQPhideMessage(){
    jQuery('.bpqpMsg').hide()
}
