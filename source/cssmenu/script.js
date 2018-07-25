var everything = [{
  "type": "radio",
  "title": "How is your doggy doing now ?",
  "options": [
    "Doing Well, In recovery phase.",
    "Knocking!",
    "Need to visit vet ;(",
    "Don't know"
  ]
}, {}, {
  "type": "radio",
  "title": "What's your gender ?",
  "options": [
    "Male",
    "Female",
    "Other"
  ]
}, {
  type: "comment",
  id: 'c1',
  avatar: '../asset/image/avatar.png',
  author: 'author',
  metadata: 'metdata',
  text: 'sometext doggy',
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
  }, {
    id: 'c5',
    avatar: '../asset/image/avatar.png',
    author: 'child5 added',
    metadata: 'metdata',
    text: 'sometext',
    children: []
  }]
}];


function showSearchedItems() {
  var searchString = document.getElementById("searchForumsText").value;
  console.log(searchString);
  document.getElementById("createPollSection").style.display = "none";
  document.getElementById("createThread").style.display = "none";
  document.getElementById("searchForums").style.display = "block";
  loadFiltered(searchString);
}


function showForumSearch() {
  document.getElementById("createPollSection").style.display = "none";
  document.getElementById("createThread").style.display = "none";
  document.getElementById("searchForums").style.display = "block";
}

function showCreateThread() {
  document.getElementById("createPollSection").style.display = "none";
  document.getElementById("searchForums").style.display = "none";
  document.getElementById("createThread").style.display = "block";
}


function showCreatePolls() {
  console.log("showcreatepolls called");
  document.getElementById("searchForums").style.display = "none";
  document.getElementById("createPollSection").style.display = "block";
  // todo : make others none when they're added.
}

function ShowHideDiv() {
  var multiSelect = document.getElementById("multiSelect");
  var singleSelect = document.getElementById("singleSelect");
  if (selectionDropDown.value == "M") {
    console.log("singleSelect found");
    singleSelect.style.display = "block";
    multiSelect.style.display = "none";
    loadEverything();
  } else if (selectionDropDown.value == "S") {
    console.log("multiSelect found");
    multiSelect.style.display = "block";
    singleSelect.style.display = "none";
  }
  console.log("everything is below :");
  console.log(everything);
};

function SSButtonHandler() {
  var singleSelect = document.getElementById("singleSelect").value;
  document.getElementById("radioTitle").innerText = document.getElementById('gender').value;
  console.log("value is " + document.getElementById('gender').value);
  document.getElementById("myUL").innerHTML = '';
  document.getElementById("radioEditor").style.display = "block"
  console.log("Done Selected for SS");
  UpdateEverything();
};

function UpdateEverything() {
  console.log("Updating everything");
  everything.forEach(function(element) {
    if (element.type == "singleSelect") {
      console.log("single select found, updating !");
      /*
      var form = document.getElementById("everythingForm");

      element.values.forEach(function(el){
        var i = document.createElement("input");
        i.setAttribute('type',"radio");
        i.setAttribute('name',"testName");
        form.appendChild(el);
      });
      */
      // e.appendChild(element.values);
    }
  });
}

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  li.className = "item segment"
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("i");
  var txt = document.createTextNode("");
  span.className = "close times icon";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

function finishRadio() {
  var parent = document.getElementById("myUL");
  var lis = parent.getElementsByTagName("li");
  radioQuery = {
    "type": "radio",
    "title": document.getElementById("radioTitle").innerText,
    "options": []
  };

  for (i = 0; i < lis.length; i++) {
    console.log(lis[i])
    if (lis[i].style.display != 'none')
      radioQuery.options.push(lis[i].innerText);
  }
  everything.push(radioQuery);
  //loadEverything();
  loadLatest();
  console.log(everything);
}

function loadEverything() {
  var allView = document.getElementById("everything");
  for (var i = 0; i < everything.length; i++) {
    if (everything[i].type == "radio") {
      var div = document.createElement('div');
      var h4 = document.createElement('h4');
      h4.innerText = everything[i].title;
      div.appendChild(h4);
      for (var j = 0; j < everything[i].options.length; j++) {
        var labelname = everything[i].options[j];
        var value = i + "_" + j;
        var ih = `<input type="radio" value="${value}"> <label>${labelname}</label><br>`;
        var create = `<input type="radio" value="${value}">`;
        var create1 = `<label>${labelname}</label><br>`;
        var d = document.createElement('div');
        d.innerHTML = ih;
        div.appendChild(d)
      }
      allView.append(div);
      allView.style.display = "block";
    } else if (everything[i].type == "comment") {
      var div = document.createElement('div');
      var h4 = document.createElement('h4');
      h4.innerText = "This is a new type of component coming soon";
      div.appendChild(h4);
      allView.append(div);
    } else {
      var s = '<div id="comment-start-test">JeJo</div>';
      var d = document.createElement('div');
      d.innerHTML = s;
      allView.appendChild(d);
      GenerateCommentFromState(everything[3], "#comment-start-test");
    }
  }
}

function loadLatest() {
  var allView = document.getElementById("everything");
  for (var i = 0; i < everything.length; i++) {
    if (everything[i].type == "radio") {
      var i = everything.length - 1;
      var div = document.createElement('div');
      var h4 = document.createElement('h4');
      h4.innerText = everything[i].title;
      div.appendChild(h4);
      for (var j = 0; j < everything[i].options.length; j++) {
        var labelname = everything[i].options[j];
        var value = i + "_" + j;
        var ih = `<input type="radio" value="${value}"> <label>${labelname}</label><br>`;
        var create = `<input type="radio" value="${value}">`;
        var create1 = `<label>${labelname}</label><br>`;
        var d = document.createElement('div');
        d.innerHTML = ih;
        div.appendChild(d)
      }
      allView.append(div);
      allView.style.display = "block";
    } else {
      var div = document.createElement('div');
      var h4 = document.createElement('h4');
      h4.innerText = "This is a new type of component coming soon";
      div.appendChild(h4);
      allView.append(div);
    }
  }
}

function loadFiltered(searchString) {
  var filtered = everything;
  var searchList = searchString.split(",").map(item => item.trim());
  console.log("searchlist is " + searchList);
  var allView = document.getElementById("everything");
  allView.innerHTML = '';
  for (var i = 0; i < filtered.length; i++) {
    if (searchList.length != 0 && !isKeywordPresent(searchList, filtered[i]))
      continue;
    if (filtered[i].type == "radio") {
      var div = document.createElement('div');
      var h4 = document.createElement('h4');
      h4.innerText = filtered[i].title;
      div.appendChild(h4);
      for (var j = 0; j < filtered[i].options.length; j++) {
        var labelname = filtered[i].options[j];
        var value = i + "_" + j;
        var ih = `<input type="radio" value="${value}"> <label>${labelname}</label><br>`;
        var create = `<input type="radio" value="${value}">`;
        var create1 = `<label>${labelname}</label><br>`;
        var d = document.createElement('div');
        d.innerHTML = ih;
        div.appendChild(d)
      }
      allView.append(div);
      allView.style.display = "block";
    } else {
      var div = document.createElement('div');
      var h4 = document.createElement('h4');
      h4.innerText = "This is a new type of component coming soon";
      div.appendChild(h4);
      allView.append(div);
    }
  }
}

function createRadioElement(name, checked) {
  var radioHtml = '<input type="radio" name="' + name + '"';
  if (checked) {
    radioHtml += ' checked="checked"';
  }
  radioHtml += '/>';

  var radioFragment = document.createElement('div');
  radioFragment.innerHTML = radioHtml;

  return radioFragment.firstChild;
}

function isKeywordPresent(keywords, o) {
  var s = "";
  if (o.type == "radio")
    s = o.title;
  else if (o.type == "comments")
    s = o.text
  for (var i = 0; i < keywords.length; i++) {
    if (s != undefined && s.includes(keywords[i]))
      return true;
  }
  return false;
}