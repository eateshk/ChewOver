var a =5;
var form = '<form class="ui reply form"> <div class="field"> <textarea></textarea> </div> <div class="ui blue labeled submit icon button"> <i class="icon edit"></i> Add Reply </div> </form>';
function toggleCommentBox(e){
    console.log("clicked"+$(e).attr('id'));
    var val = $(e).attr('data-value');
    console.log("now the val is " + val);
    if(val === "yes"){
        $(form).insertAfter(e);
        $(e).attr('data-value',"no");
    }
    else{
        $(e).attr('data-value','yes');
        $(e).siblings(".form").remove();
    }
}