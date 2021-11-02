/*var button = document.getElementById('button');
var input = document.getElementById('input');
var results = document.getElementById('results');*/

var item, tile, author, publisher, bookLink, bookImg;
var outputList = document.getElementById("list-output");
var bookUrl = "https://www.googleapis.com/books/v1/volumes?maxResults=40&q=";
var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
var placeHldr = '<img src="https://via.placeholder.com/150">';
var searchData;

button.addEventListener('click', function() {
 /* if(input.value === '') {
    alert('There is no value');
  }else {
    console.log('This function works');
    console.log(input.value);
    $.ajax({
      // will bring the books to the page
      url: "https://www.googleapis.com/books/v1/volumes?q=" +  input.value,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        for(var i = 0; i < data.items.length; i++) {
          // these will pull the image for book info and authors
          results.innerHTML +='<div class="card">';
          results.innerHTML += '<img src="' + data.items[i].volumeInfo.imageLinks.smallThumbnail + '">';
          results.innerHTML += '<h1>' + data.items[i].volumeInfo.title + '</h2>';
          results.innerHTML += '<h3>' + data.items[i].volumeInfo.authors + '</h3>';
          //);results.innerHTML += '<p>' + data.items[i].volumeInfo.description + '</p>';
          results.innerHTML += '<p>' + data.items[i].volumeInfo.publishedDate + '</p>';
          results.innerHTML +='</div>'
        }
      },
      type: 'GET'
    });
    input.value = '';
  }*/

  console.log("hello");
    outputList.innerHTML = ""; //empty html output
    document.body.style.backgroundImage = "url('')";
     searchData = $("#input").val();
     //handling empty search input field
     if(searchData === "" || searchData === null) {
       displayError();
     }
    else {
       // console.log(searchData);
       // $.get("https://www.googleapis.com/books/v1/volumes?maxResults=40&q="+searchData, getBookData()});
       $.ajax({
          url: bookUrl + searchData,
          dataType: "json",
          success: function(response) {
            console.log(response)
            if (response.totalItems === 0) {
              alert("no result!.. try again")
            }
            else {
              $("#title").animate({'margin-top': '5px'}, 1000); //search box animation
              $(".book-list").css("visibility", "visible");
              displayResults(response);
            }
          },
          error: function () {
            alert("Something went wrong.. <br>"+"Try again!");
          }
        });
      }
      $("#search-box").val(""); //clearn search box
   });

   /*
   * function to display result in index.html
   * @param response
   */
   function displayResults(response) {
      for (var i = 0; i < response.items.length; i+=2) {
        item = response.items[i];
        title1 = item.volumeInfo.title;
        author1 = item.volumeInfo.authors;
        console.log(author1);
        publisher1 = item.volumeInfo.publisher;
        bookLink1 = item.volumeInfo.previewLink;
        bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
        bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;

        item2 = response.items[i+1];
        title2 = item2.volumeInfo.title;
        author2 = item2.volumeInfo.authors;
        publisher2 = item2.volumeInfo.publisher;
        bookLink2 = item2.volumeInfo.previewLink;
        console.log(bookLink2);
        bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
        bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr ;

        // in production code, item.text should have the HTML entities escaped.
        outputList.innerHTML += '<div class="row mt-4">' +
                                formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn) +
                                formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2) +
                                '</div>';

        console.log(outputList);
      }
   }

   /*
   * card element formatter using es6 backticks and templates (indivial card)
   * @param bookImg title author publisher bookLink
   * @return htmlCard
   */
   function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
     // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
    // var viewUrl = 'book.html?isbn='+bookIsbn; //constructing link for bookviewer
    // <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
     var htmlCard = `<div class="col-lg-6">
       <div class="card border border-dark" style=" ">
       <div class="card-body " style="border-style: solid; margin-bottom: 25px;  border-radius: 3px;border: 0px solid #818a91;box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
  
       transition: all 0.1s linear; 
       ">
         <div class="row no-gutters">
           <div class="col-md-4">
             <img src="${bookImg}" class="card-img" alt="..." width="160" height="170">
           </div>
           <div class="col-md-8">
             
               <h5 class="card-title" style="  font-size: 18px;
               font-style: normal;
               font-weight: 700;
               font-variant: normal;
               font-family: Poppins;
               font-color: rgb(0, 0, 0);
               background-color: rgba(0, 0, 0, 0);
               ">${title}</h5>
               <p class="card-text"  style="    font-size: 16px;
               font-style: normal;
               font-weight: 400;
               font-variant: normal;
               font-family: Poppins, sans-serif;
               font-color: rgb(102, 102, 102);
               background-color: rgba(0, 0, 0, 0);
               
               text-indent: 0px;
               line-height: 28.8px;
               text-transform: none;
               text-decoration: none solid rgb(102, 102, 102);
               ">Author: ${author} </p>
               <p class="card-text" style="  font-size: 16px;
               font-style: normal;
               font-weight: 400;
               font-variant: normal;
               font-family: Poppins, sans-serif;
               font-color: rgb(102, 102, 102);
               background-color: rgba(0, 0, 0, 0);
               
               text-indent: 0px;
               line-height: 28.8px;
               text-transform: none;
               text-decoration: none solid rgb(102, 102, 102);
               ">Publisher: ${publisher}</p>
               <button onclick="location.href='${bookLink }'" type="button">
               Preview</button>
             </div>
           </div>
         </div>
       </div>
     </div>`
     return htmlCard;
   }

   //handling error for empty search box
   function displayError() {
     alert("search term can not be empty!")
   }





//})
