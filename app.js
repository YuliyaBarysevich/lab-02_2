'use strict'

/// Globa variable
const keywordArr= [];

// Image Constructor
function ImgStorage(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

    ImgStorage.allimageStorage.push(this);
  }
  ImgStorage.allimageStorage = [];


// Rendering Images with Mustache and jQuery
ImgStorage.prototype.renderWithJQueryAndMustache = function() {

  const imgTemplateHtml = $('#mustache-template-section').html(); //  1. get the html from the script tag
  const outputFromMustache = Mustache.render(imgTemplateHtml, this); //  2. pass the html and an object to Mustache.render(html, object)  
  $('body > section').append(outputFromMustache);   // 3. append it to the page
};

// This Function utilizes AJAX to pull images from the server
  function objectFile(arrayObject) {    // STAND ALONE FUNCTION
  
    arrayObject.forEach(animalPic => {
    new ImgStorage(animalPic.image_url, animalPic.title, animalPic.description, animalPic.keyword, animalPic.horns);
    
            // Fills the Select Element
            if ($(`select:contains(${animalPic.keyword})`).length === 0){
            renderAnimalOptions(animalPic.keyword);
            }
    });
    ImgStorage.allimageStorage.forEach(imgStorage => imgStorage.renderWithJQueryAndMustache());
  }

/// Renders Dropdown Menu
function renderAnimalOptions(dropdownOptions){
    $('select').append('<option>' + dropdownOptions + '</option>');
  }

///
  function filterSelection(event) {
  $('body > section').empty();

  ImgStorage.allimageStorage.forEach(animalpic => {
    if (animalpic.keyword === event.target.value){
            animalpic.renderWithJQueryAndMustache()
        }
      })
    }


/////////////////////////
///// Main Program
/////////////////////////
// This Intiates Data File to be read and stored locally
$.ajax('data/page-1.json').then(objectFile); 

/// Function to click and filter
$('select').on('change', filterSelection);

$('#sort-button').on('click', function(){
  $('body > section').empty();
  
  ImgStorage.allimageStorage.sort(function(l, r) {
  console.log("🚀 ~ file: app.js ~ line 71 ~ ImgStorage.allimageStorage.sort ~ l, r", l, r)
    

    if (l.horns > r.horns) {
        return 1
    } else if (l.horns < r.horns) {
        return -1
    } else { 
        if (l.keyword > r.keyword) {
          return 1
      } else if (l.keyword < r.keyword) {
          return -1
      } else {
          return 0
      }
    }
  })

  ImgStorage.allimageStorage.forEach(imgStorage => imgStorage.renderWithJQueryAndMustache());
});



// Intializes Images to the page
  $('#lab-02').on('click', function() {
    $('select').empty();
    $('body > section').empty();
    ImgStorage.allimageStorage = [];
    $.ajax('data/page-1.json').then(objectFile); 
  })


// Intializes Images to the page
  $('#lab-03').on('click', function() {
    $('select').empty();
    $('body > section').empty();
    ImgStorage.allimageStorage = [];

    $.ajax('data/page-2.json').then(objectFile); 


  })
