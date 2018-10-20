/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const mainDiv = document.querySelector('.page');
const ul = document.querySelector('.student-list');
const list = ul.children;
const paginationDiv = document.createElement('div');

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four

//Geting number of links at the bottom based on how many students are in the list
function getPages(list) {
  const pageCount = Math.ceil(list.length / 10);
  return pageCount;
}
const pageCount = getPages(list);

// Create and append the pagination links - Creating a function that can do this is a good approach
mainDiv.appendChild(paginationDiv);
paginationDiv.className = 'pagination';
mainDiv.insertBefore(ul, paginationDiv);
const praginationUL = document.createElement('ul');
paginationDiv.appendChild(praginationUL);


function createPagination() {
  for(let i = 1; i <= pageCount; i++) {
  const praginationLI = document.createElement('li');
  praginationLI.className = 'pragnation li';
  praginationUL.appendChild(praginationLI);
  const pragnationLink = document.createElement('a');
  pragnationLink.textContent = i;
  pragnationLink.setAttribute('href', '#');
  praginationLI.appendChild(pragnationLink);
}
}

createPagination();

// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
