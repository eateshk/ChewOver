var currentUser = {
    profilePic: "../asset/image/avatar.png",
    name: "jayasurya the great",
}

var form = '<form class="ui reply form"> <div class="field"> <textarea></textarea> </div> <div class="ui blue labeled submit icon button" onclick=addComment(this)> <i class="icon edit"></i> Add Reply </div> </form>';
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

function addComment(e){
    var parent = $(e).parent().parent();
    $(e).parent().remove();
    console.log("textbox text " + $(e).parent().val());
    parent.append(GetComment($(e).parent().siblings("textarea").text()))
}

function GetComment(text){
    var commentHtml = `<div class="comment">
    <a class="avatar">
      <img src=${currentUser.profilePic}>
    </a>
    <div class="content">
      <a class="author">${currentUser.name}</a>
      <div class="metadata">
        <span class="date">Just now</span>
      </div>
      <div class="text">
        ${text}
      </div>
      <div class="actions">
        <a class="reply" data-value = "yes" onclick="toggleCommentBox(this)">Reply</a>
      </div>
    </div>
  </div>`;
  return commentHtml;
}
