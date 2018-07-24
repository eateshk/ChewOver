/* VARIABLE DECLARATIONS
*/
var currentUser = {
	profilePic: "../asset/image/avatar.png",
	name: "jayasurya the great",
}
var state = [
	{
		id: 'c1',
		avatar: '../asset/image/avatar.png',
		author: 'author',
		metadata: 'metdata',
		text: 'sometext',
		children: [{
			id: 'c2',
			avatar: '../asset/image/avatar.png',
			author: 'child2 author',
			metadata: 'metdata',
			text: 'sometext',
			children: [{
        id: 'c2.1',
        avatar: '../asset/image/avatar.png',
        author: 'child2.1 author',
        metadata: 'metdata',
        text: 'sometext',
        children: []
      }]
		},
		{
			id: 'c5',
			avatar: '../asset/image/avatar.png',
			author: 'child5 added',
			metadata: 'metdata',
			text: 'sometext',
			children: []
		}
		]
	},
	{
		id: 'c4',
		avatar: '../asset/image/avatar.png',
		author: 'child 4 author',
		metadata: 'metdata',
		text: 'sometext',
		children: []
  }
]
var form = '<form class="ui reply form" action="#"> <div class="field"> <textarea></textarea> </div> <div class="ui blue labeled submit icon button" onclick=addComment(this)> <i class="icon edit"></i> Add Reply </div> </form>';
//////////////////////////////////////////////////////////////
/* FUNCTION DELCARATIONS
*/

function toggleCommentBox(e) {
	console.log("clicked" + $(e).attr('id'));
	var val = $(e).attr('data-value');
	console.log("now the val is " + val);
	if (val === "yes") {
		$(form).insertAfter(e);
		$(e).attr('data-value', "no");
	}
	else {
		$(e).attr('data-value', 'yes');
		$(e).siblings(".form").remove();
	}
}

function addComment(e) {
	var parent = $(e).parent().parent();
	var commentParent = parent.parent();
	var commentParentId = commentParent.parent().attr("id");
	console.log("parent comment id " + commentParentId);
	var textVal = $(e).parent().find(".field textarea").val();
	console.log("textbox text " + textVal);
  $(e).parent().remove();
  var newcomment = GetComment(textVal);
  var newcommentObj = GetCommentObj(textVal);
  parent.append(newcomment);
  console.log("comment that is gonna be inserted");
  console.log(newcommentObj);
  UpdateState(commentParentId, state, newcommentObj)
}

function GetCommentObj(textval){
  var obj = {};
  obj.id = Math.floor((Math.random() * 10000) + 1);
  obj.avatar = "../asset/image/avatar.png";
  obj.author = 'author';
	obj.metadata = 'metdata';
	obj.text = textval;
	obj.children = [];
  return obj;
}
function GetComment(text) {
	var commentid = 'c' + Math.floor((Math.random() * 10000) + 1);
	var commentHtml = `<div id=${commentid} class="comment">
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

function UpdateState(id, obj, objToAdd) {
	obj.forEach(function (element) {
		if (element.id === id) {
			console.log("found id element is " + element.id.children);
			element.children.push(objToAdd);
			return obj;
		}
    var child = [];
    if(element.children.length>0){
        child = UpdateState(id, element.children, objToAdd);
    }
		console.log("going to print child");
		console.log(child);
		obj.children = child;
	})
	return obj;
}

function init(parentSelector) {
  //var a = GetCommentFromState(parentSelector, state, false);
  // first clear the comments
  $('.comment').remove();
  var a = foobar();
  a.forEach(function(element){

    $('#comment-start').parent().append(element);
  })
	console.log("retunred " + a);
}


function deszstate(statecopy){
  var html2 = [];
  statecopy.forEach(function(element){
    //get child html
    var thischildhtml = "";
    var thischildstring = "";
    if(element.children.length > 0){
      thischildhtml = deszstate(element.children);
    }
    if(thischildhtml.length > 0){
      thischildhtml.forEach(function(childhtmlgenerated){
        thischildstring = thischildstring + childhtmlgenerated;
      })
    }
      //get html
      var random = Math.floor((Math.random() * 10000) + 1);
      var thishtmlelement = `<div class="comment" id="${element.id}">
      <a class="avatar">
      <img src=${element.avatar}>
      </a>
      <div  id=${random} class="content">
      <a class="author">${element.author}</a>
      <div class="metadata">
        <span class="date">${element.metadata}</span>
      </div>
      <div class="text">
        <p> ${element.text} </p>
      </div>
      <div class="actions">
        <a class="reply" data-value = "yes" onclick="toggleCommentBox(this)">Reply</a>
      </div>
      ${thischildstring}
      </div>
    </div>`;
      //append html2.thishtml
      html2.push(thishtmlelement);
    })

    return html2
}

/////////////////////////////////////////
/* FUNCTIONS THAT HELP IN TESTING
*/

function foo() {
	var objTopush = {
		id: 'c5',
		avatar: '../asset/image/avatar.png',
		author: 'newly added',
		metadata: 'metdata',
		text: 'sometext',
		children: []
	};
	var newstate = UpdateState("c2.1", state, objTopush);

	console.log(newstate);
	state = newstate;
}

function foobar(){
  console.log("v2 desz");
  var desz2 = deszstate(state);
  console.log(desz2);
  return desz2;
}

function GetCommentFromState(parentSelector, locState, isChild) {
	var commentElement = "";
	var random = Math.floor((Math.random() * 10000) + 1);
	locState.forEach(function (element) {
		commentElement = `<div class="comment" id="${element.id}">
	  <a class="avatar">
		<img src=${element.avatar}>
	  </a>
	  <div  id=${random} class="content">
		<a class="author">${element.author}</a>
		<div class="metadata">
		  <span class="date">${element.metadata}</span>
		</div>
		<div class="text">
		  <p> ${element.text} </p>
		</div>
		<div class="actions">
		  <a class="reply" data-value = "yes" onclick="toggleCommentBox(this)">Reply</a>
		</div>
	  </div>
	</div>`;
		if (!isChild) {
			$(parentSelector).parent().append(commentElement);
		}
		var isChildrenThere = element.children.length > 0 ? true : false;
		console.log("is children present: " + isChildrenThere);

		var childrenhtml = GetCommentFromState(parentSelector, element.children, isChildrenThere);
		// if (childrenhtml != null && childrenhtml != "") {
      if(true){
			if (isChild) {
				var nestedChildHtml = `<div class="comment" id=${element.id}>
		<a class="avatar">
		  <img src=${element.avatar}>
		</a>
		<div  id=${random} class="content">
		  <a class="author">${element.author}</a>
		  <div class="metadata">
			<span class="date">${element.metadata}</span>
		  </div>
		  <div class="text">
			<p> ${element.text} </p>
		  </div>
		  <div class="actions">
			<a class="reply" data-value = "yes" onclick="toggleCommentBox(this)">Reply</a>
		  </div>
		  ${childrenhtml}
		</div>
	  </div>`;
				commentElement = nestedChildHtml;
			}
			else {

				$(`#${random}`).append(childrenhtml);
			}
		}else{
      if(isChild){
        console.log("this is child element and doesnt have child" + element.id);
      }
    }
		console.log("children html is " + childrenhtml);
	});

	return commentElement;
}