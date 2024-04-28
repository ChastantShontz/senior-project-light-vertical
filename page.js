// Functions

function changePage(page, event) {
  if (page == "resume") {
    toggleSection("", event);
    toggleGrid("", event);
  }
  countWords(event);
  window.scrollTo(0, 0);
}

function showSidebar() {
  document.getElementById("menuEnter").style.visibility = "hidden";
  document.getElementById("menuEnter").style.opacity = "0";
  document.getElementById("menuEnter").style.transition = "all .1s ease 0s";
  document.getElementById("sidebar").style.width = "10em";
  document.getElementById("sidebar").style.transition = "width .25s ease 0s";
  for (var i = 0; i < document.getElementsByClassName("sidebarListItem").length; i++) {
    document.getElementsByClassName("sidebarListItem")[i].style.visibility = "visible";
    document.getElementsByClassName("sidebarListItem")[i].style.opacity = "1";
    document.getElementsByClassName("sidebarListItem")[i].style.transition = "all .1s ease .15s";
  }
  document.getElementById("menuExit").style.visibility = "visible";
  document.getElementById("menuExit").style.opacity = "1";
  document.getElementById("menuExit").style.transition = "all .1s ease .15s";
}

function hideSidebar() {
  document.getElementById("menuExit").style.visibility = "hidden";
  document.getElementById("menuExit").style.opacity = "0";
  document.getElementById("menuExit").style.transition = "all .1s ease 0s";
  for (var i = 0; i < document.getElementsByClassName("sidebarListItem").length; i++) {
    document.getElementsByClassName("sidebarListItem")[i].style.visibility = "hidden";
    document.getElementsByClassName("sidebarListItem")[i].style.opacity = "0";
    document.getElementsByClassName("sidebarListItem")[i].style.transition = "all .1s ease 0s";
  }
  document.getElementById("sidebar").style.width = "5em";
  document.getElementById("sidebar").style.transition = "width .25s ease 0s";
  document.getElementById("menuEnter").style.visibility = "visible";
  document.getElementById("menuEnter").style.opacity = "1";
  document.getElementById("menuEnter").style.transition = "all .1s ease .15s";
}

function toggleSection(element, event) {
  if (element == "") {
    for (var i = 0; i < document.getElementsByClassName("category").length; i++) {
      element = document.getElementsByClassName("category")[i].id;
      if (eval("sessionStorage." + element + "Opened") == undefined) {
        eval("sessionStorage." + element + "Opened = \"true\"");
      }
      if (eval("sessionStorage." + element + "Opened") == "true") {
        openSection(element, event);
      }
      else if (eval("sessionStorage." + element + "Opened") == "false") {
        closeSection(element, event);
      }
    }
  }
  else {
    if (eval("sessionStorage." + element + "Opened") == "true") {
      closeSection(element, event);
    }
    else if (eval("sessionStorage." + element + "Opened") == "false") {
      openSection(element, event);
    }
  }
}

function openSection(element, event) {
  if (document.getElementById(element).classList.contains("categoryClosed")) {
    document.getElementById(element).classList.replace("categoryClosed", "categoryOpened");
  }
  if (event.type == "load") {
    document.getElementById(element).open = true;
  }
  document.getElementById(element + "Heading").ariaLabel = "Close the '" + (element.charAt(0)).toUpperCase() + element.substring(1) + "' section";
  eval("sessionStorage." + element + "Opened = \"true\"");
}

function closeSection(element, event) {
  if (document.getElementById(element).classList.contains("categoryOpened")) {
    document.getElementById(element).classList.replace("categoryOpened", "categoryClosed");
  }
  if (event.type == "load") {
    document.getElementById(element).open = false;
  }
  document.getElementById(element + "Heading").ariaLabel = "Open the '" + (element.charAt(0)).toUpperCase() + element.substring(1) + "' section";
  eval("sessionStorage." + element + "Opened = \"false\"");
}

function toggleGrid(element, event) {
  if (element == "") {
    for (var i = 0; i < document.getElementsByClassName("category").length; i++) {
      element = document.getElementsByClassName("category")[i].id;
      if (event.type == "load") {
        if (eval("sessionStorage." + element + "Expanded") == undefined) {
          eval("sessionStorage." + element + "Expanded = \"false\"");
        }
      }
      var former = document.getElementById(element + "Grid").classList[2];
      if (window.innerWidth < 550) {
        document.getElementById(element + "Grid").classList.replace(former, "categoryGrid1");
      }
      else if ((window.innerWidth >= 550) && (window.innerWidth < 1280)) {
        if ((document.getElementById(element + "Grid").classList.contains("categoryGridSmall")) || (document.getElementById(element + "Grid").classList.contains("categoryGridMid"))) {
          document.getElementById(element + "Grid").classList.replace(former, "categoryGrid1");
        }
        else if (document.getElementById(element + "Grid").classList.contains("categoryGridLarge")) {
          document.getElementById(element + "Grid").classList.replace(former, "categoryGrid2");
        }
      }
      else if (window.innerWidth >= 1280) {
        if (document.getElementById(element + "Grid").classList.contains("categoryGridSmall")) {
          document.getElementById(element + "Grid").classList.replace(former, "categoryGrid1");
        }
        else if (document.getElementById(element + "Grid").classList.contains("categoryGridMid")) {
          document.getElementById(element + "Grid").classList.replace(former, "categoryGrid2");
        }
        else if (document.getElementById(element + "Grid").classList.contains("categoryGridLarge")) {
          document.getElementById(element + "Grid").classList.replace(former, "categoryGrid3");
        }
      }
      var columns = (document.getElementById(element + "Grid").classList)[2].charAt((document.getElementById(element + "Grid").classList)[2].length - 1);
      var items = (columns * 3);
      if (document.getElementsByClassName(element + "GridItem").length <= items) {
        document.getElementById(element + "Grid").style.marginBottom = "0";
        document.getElementById(element + "ButtonCont").style.display = "none";
      }
      if (event.type == "load") {
        if (eval("sessionStorage." + element + "Expanded") == "true") {
          expandGrid(element, items);
        }
        else if (eval("sessionStorage." + element + "Expanded") == "false") {
          collapseGrid(element, items);
        }
      }
      else if (event.type == "resize") {
        if (eval("sessionStorage." + element + "Expanded") == "false") {
          adjustGrid(element, items);
        }
      }
    }
  }
  else {
    var columns = (document.getElementById(element + "Grid").classList)[2].charAt((document.getElementById(element + "Grid").classList)[2].length - 1);
    var items = (columns * 3);
    if (document.getElementsByClassName(element + "GridItem").length <= items) {
      document.getElementById(element + "Grid").style.marginBottom = "0";
      document.getElementById(element + "ButtonCont").style.display = "none";
    }
    if (eval("sessionStorage." + element + "Expanded") == "true") {
      collapseGrid(element, items);
    }
    else if (eval("sessionStorage." + element + "Expanded") == "false") {
      expandGrid(element, items);
    }
  }
}

function expandGrid(element, items) {
  if (document.getElementById(element + "Grid").classList.contains("categoryGridCollapsed")) {
    document.getElementById(element + "Grid").classList.replace("categoryGridCollapsed", "categoryGridExpanded");
  }
  for (var i = 0; i < document.getElementsByClassName(element + "GridItem").length; i++) {
    if (i >= items) {
      if (document.getElementsByClassName(element + "GridItem")[i].classList.contains("categoryGridItemHidden")) {
        document.getElementsByClassName(element + "GridItem")[i].classList.replace("categoryGridItemHidden", "categoryGridItemShown");
        document.getElementsByClassName(element + "GridItem")[i].classList.replace(element + "GridItemHidden", element + "GridItemShown");
      }
      document.getElementsByClassName(element + "GridItem")[i].style.display = "block";
    }
  }
  document.getElementById(element + "Button").innerHTML = "See Less <span class=\"categoryArrow upArrow " + element + "Arrow\" id=\"" + element + "UpArrow\">&#65087;</span>";
  document.getElementById(element + "Button").ariaLabel = "Collapse the '" + (element.charAt(0)).toUpperCase() + element.substring(1) + "' section";
  eval("sessionStorage." + element + "Expanded = \"true\"");
}

function collapseGrid(element, items) {
  if (document.getElementById(element + "Grid").classList.contains("categoryGridExpanded")) {
    document.getElementById(element + "Grid").classList.replace("categoryGridExpanded", "categoryGridCollapsed");
  }
  for (var i = 0; i < document.getElementsByClassName(element + "GridItem").length; i++) {
    if (i >= items) {
      if (document.getElementsByClassName(element + "GridItem")[i].classList.contains("categoryGridItemShown")) {
        document.getElementsByClassName(element + "GridItem")[i].classList.replace("categoryGridItemShown", "categoryGridItemHidden");
        document.getElementsByClassName(element + "GridItem")[i].classList.replace(element + "GridItemShown", element + "GridItemHidden");
      }
      document.getElementsByClassName(element + "GridItem")[i].style.display = "none";
    }
  }
  document.getElementById(element + "Button").innerHTML = "See More <span class=\"categoryArrow downArrow " + element + "Arrow\" id=\"" + element + "DownArrow\">&#65088;</span>";
  document.getElementById(element + "Button").ariaLabel = "Expand the '" + (element.charAt(0)).toUpperCase() + element.substring(1) + "' section";
  eval("sessionStorage." + element + "Expanded = \"false\"");
}

function adjustGrid(element, items) {
  for (var i = 0; i < document.getElementsByClassName(element + "GridItem").length; i++) {
    if (i < items) {
      if (document.getElementsByClassName(element + "GridItem")[i].classList.contains("categoryGridItemHidden")) {
        document.getElementsByClassName(element + "GridItem")[i].classList.replace("categoryGridItemHidden", "categoryGridItemShown");
        document.getElementsByClassName(element + "GridItem")[i].classList.replace(element + "GridItemHidden", element + "GridItemShown");
      }
      document.getElementsByClassName(element + "GridItem")[i].style.display = "block";
    }
    else if (i >= items) {
      if (document.getElementsByClassName(element + "GridItem")[i].classList.contains("categoryGridItemShown")) {
        document.getElementsByClassName(element + "GridItem")[i].classList.replace("categoryGridItemShown", "categoryGridItemHidden");
        document.getElementsByClassName(element + "GridItem")[i].classList.replace(element + "GridItemShown", element + "GridItemHidden");
      }
      document.getElementsByClassName(element + "GridItem")[i].style.display = "none";
    }
  }
}

function countWords(event) {
  if (document.getElementsByTagName("template").length > 0) {
    for (var i = 0; i < document.getElementsByTagName("template").length; i++) {
      var element = (document.getElementsByTagName("template")[i].id).replace(/Template/sm, "");
      if (event.type == "load") {
        document.getElementById(element + "Template").innerHTML = document.getElementById(element + "Description").innerHTML;
        eval("sessionStorage." + element + "More = \"false\"");
      }
      if ((event.type == "load") || ((event.type == "resize") && (eval("sessionStorage." + element + "More") == "false"))) {
        if (window.innerWidth < 550) {
          var limit = 10;
        }
        else if ((window.innerWidth >= 550) && (window.innerWidth < 768)) {
          var limit = 20;
        }
        else if ((window.innerWidth >= 768) && (window.innerWidth < 990)) {
          var limit = 30;
        }
        else if ((window.innerWidth >= 990) && (window.innerWidth < 1280)) {
          var limit = 40;
        }
        else if (window.innerWidth >= 1280) {
          var limit = 50;
        }
        var words = 0;
        for (var j = 0; j < ((document.getElementById(element + "Description").innerHTML).replace(/\s*\<span.*class\=\"seeMore\".*\>.*\<\/span\>/sm, "")).length; j++) {
          if (((document.getElementById(element + "Description").innerHTML[j]).replace(/\s*\<span.*class\=\"seeMore\".*\>.*\<\/span\>/sm, "")).match(/\s+/sm)) {
            words++;
            if (words == limit) {
              var position = j;
            }
          }
        }
        if ((words + 1) < limit) {
          growWords(element, words, limit);
        }
        else if ((words + 1) > limit) {
          shrinkWords(element, position);
        }
      }
    }
  }
}

function growWords(element, oldWords, limit) {
  if (limit > (((document.getElementById(element + "Template").innerHTML).match(/\s+/gsm)).length + 1)) {
    limit = (((document.getElementById(element + "Template").innerHTML).match(/\s+/gsm)).length + 1);
  }
  var difference = (limit - oldWords);
  var newWords = 0;
  var startPosition = ((document.getElementById(element + "Description").innerHTML).replace(/\s*\<span.*class\=\"seeMore\".*\>.*\<\/span\>/sm, "")).length;
  for (var j = startPosition; j < (document.getElementById(element + "Template").innerHTML).length; j++) {
    if ((document.getElementById(element + "Template").innerHTML[j]).match(/\s+/sm)) {
      newWords++;
      if (newWords == difference) {
        var endPosition = j;
      }
    }
  }
  document.getElementById(element + "Description").innerHTML = (document.getElementById(element + "Description").innerHTML).replace(/\s*\<span.*class\=\"seeMore\".*\>.*\<\/span\>/sm, "") + (document.getElementById(element + "Template").innerHTML).substring(startPosition, endPosition);
  if (document.getElementById(element + "Description").innerHTML != document.getElementById(element + "Template").innerHTML) {
    document.getElementById(element + "Description").innerHTML = document.getElementById(element + "Description").innerHTML + " <span class=\"seeMore\" id=\"" + element + "SeeMore\" aria-label=\"See more of this paragraph\" onclick=\"seeMore('" + element + "')\">[.&nbsp;.&nbsp;.]</span>";
  }
}

function shrinkWords(element, position) {
  document.getElementById(element + "Description").innerHTML = (document.getElementById(element + "Description").innerHTML).substring(0, (position + 1)) + " <span class=\"seeMore\" id=\"" + element + "SeeMore\" aria-label=\"See more of this paragraph\" onclick=\"seeMore('" + element + "')\">[.&nbsp;.&nbsp;.]</span>";
}

function seeMore(element) {
  document.getElementById(element + "Description").innerHTML = document.getElementById(element + "Template").innerHTML;
  eval("sessionStorage." + element + "More = \"true\"");
}

function downloadResume() {
  var element = document.activeElement.id;
  const day = new Date();
  if (sessionStorage.downloads == undefined) {
    sessionStorage.downloads = 1;
  }
  else {
    sessionStorage.downloads++;
  }
  document.getElementById(element).download = "Chastant_Shontz_Resume_" + day.getFullYear() + "-" + (((+day.getMonth() + 1) < 10) ? ("0" + (+day.getMonth() + 1)) : (+day.getMonth() + 1)) + "-" + ((day.getDate() < 10) ? ("0" + day.getDate()) : (day.getDate())) + ((sessionStorage.downloads == 1) ? ("") : (" (" + sessionStorage.downloads + ")"));
}
