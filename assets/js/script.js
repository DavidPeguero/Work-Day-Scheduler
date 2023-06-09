// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  //Get all the time block containers
  var timeBlocks = $(".time-block");

  //Add eventlister for each timeblock 
  $(timeBlocks).each(function (){
    //Detect click on a element with .savebtn  within timeblock
    $(this).on("click",".saveBtn", function(){
      console.log($(this).parent().attr("id"));
      //Store in local storage the text with a key equal to the id of the textblock
      localStorage.setItem($(this).parent().attr("id"), $(this).parent().find(".description").val());
    })
  })

  
  // for all time blocks add the appropriate class to said container
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  //Get the current hour
  var currHour = dayjs().hour(); 

  /*
  For each timeblock compare the current hour to the timeblock hour and add the appropriate class depending
  on whether the timeblock has already past, we are currently in it, or if it's going to be in the future
  */ 
  for(var i = 0; i < timeBlocks.length; i++){
    var hour = parseInt($(timeBlocks[i]).attr("hour"));
    if(hour < currHour){
        $(timeBlocks[i]).addClass('past');
    }
    else if(hour === currHour){
      $(timeBlocks[i]).addClass('present');
    }
    else{
      $(timeBlocks[i]).addClass('future');
    }
    
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  //On launch load the events in localStorage that are saved in the browser in to the respective timeblock
  $(timeBlocks).each(function (){
      var innerText = localStorage.getItem($(this).attr("id"));
      if(innerText !==null){
        console.log(innerText);
        $(this).find(".description").val(innerText);
      }
      else{
        return
      }
  })
  // TODO: Add code to display the current date in the header of the page.

  //Create the formatted date and insert it into the span with id of "currentDay".
  var formattedDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(formattedDate)
});
