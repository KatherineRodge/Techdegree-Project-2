/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const mainDiv = document.querySelector('.page');
const ul = document.querySelector('.student-list');
const list = ul.children;
const pageCount = getPages(list);
const listValue = parseInt(list.length) - 1;



// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four

//Number of links at the bottom based on how many students are in the list
function getPages(list) {
  const pageCount = Math.ceil(list.length / 10);
  return pageCount;
}

function tenStudents(value) {
  //for (let i = 1; i <= pageCount; i++) {
    let lowerNumber = ((parseInt(value) - 1) * 10);
    const comparisonNumber = (parseInt(value) * 10);
  for (let h = 0; h <= listValue; h++) {
    if ( h < lowerNumber ) {
      const listItem = list[h];
      listItem.style.display = 'none'
    } else if(lowerNumber < comparisonNumber) {
        const listItem = list[lowerNumber];
        listItem.style.display = '';
        lowerNumber = lowerNumber + 1;
    }  else {
        const listItem = list[lowerNumber];
        listItem.style.display = 'none';
        lowerNumber = lowerNumber + 1;
      }
    }
  //}
}

// Create and append the pagination links - Creating a function that can do this is a good approach
function createElement(elementType, property, value){
  const element = document.createElement(elementType);
  element[property] = value
  return element;
};

//pagination div creation
const paginationDiv = createElement('div', 'className', 'pagination');
mainDiv.appendChild(paginationDiv);
mainDiv.insertBefore(ul, paginationDiv);

//pagination ul creation
const paginationUL = document.createElement('ul');
paginationDiv.appendChild(paginationUL);

//creating list items and links
function createPaginationLinks() {
  for(let i = 1; i <= pageCount; i++) {
  const paginationLI = createElement('li', 'className', 'pagnation li');
  paginationUL.appendChild(paginationLI);

  const paginationLink = document.createElement('a');
  paginationLink.textContent = i;
  paginationLink.setAttribute('href', '#');
  paginationLI.appendChild(paginationLink);
}
};
createPaginationLinks();

const clickLink = document.querySelectorAll('a');

function addDefaults() {
  clickLink[0].className = 'active';
  tenStudents(1); 
}
addDefaults();

function removeClass() {
  const remove = document.querySelector('.active');
  remove.className = '';
  return remove;
}

paginationUL.addEventListener ('click', (e) => {
  removeClass();
  e.target.className = 'active';
  const paginationvalue = e.target.textContent;
  console.log(paginationvalue);
  parseInt(paginationvalue);
  tenStudents(paginationvalue);
})


// Tip: If you created a function above to show/hide list items, it could be helpful here
