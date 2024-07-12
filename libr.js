let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");

let messageEl = document.getElementById("message");
let spinnerEl = document.getElementById("spinner");


function appendBooks(result){
    let imgUrl = result.imageLink;
    let authorName = result.author;

    let imageEl = document.createElement("img");
    imageEl.src = imgUrl;
    imageEl.classList.add("image");
    searchResultsEl.appendChild(imageEl);

    let authorEl = document.createElement("p");
    authorEl.textContent = authorName;
    authorEl.classList.add("author");
    searchResultsEl.appendChild(authorEl);
}

function displaySearchReasults(search_results){
    searchInputEl.value = "";
    let headingE1 = document.createElement("h1");
    headingE1.classList.add("error-msg");
    searchResultsEl.appendChild(headingE1);

    let heading2 = document.createElement("h1");
    heading2.classList.add("popular-books");
    searchResultsEl.appendChild(heading2)

    if(search_results && search_results.length === 0){
        spinnerEl.classList.add("d-none");
        headingE1.textContent = "No Results Found";
    }else if(search_results){
        spinnerEl.classList.remove("d-none");
        heading2.textContent = "Popular Books";
        for(let result of search_results){
            appendBooks(result);
        
        }
    }else{
        spinnerEl.classList.add("d-none");
        headingE1.textContent = "Error"
    }
};
searchInputEl.addEventListener("keydown",function(event){
    let searchInputVal = event.target.value;
    searchResultsEl.textContent = "";

    if(event.key === "Enter"){
        spinnerEl.classList.remove("d-none");
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputVal;

        let options = {
            method:"GET"
        }
        fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let{search_results} = jsonData
            displaySearchReasults(search_results)
        });
    }
})