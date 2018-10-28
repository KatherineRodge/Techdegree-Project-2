/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const mainDiv = document.querySelector('.page');
const ul = document.querySelector('.student-list');
let list = ul.children;
const pageCount = getPages(list);
const headerDiv = document.querySelector('.page-header');
const studentDetail = document.querySelectorAll('.student-details');
let searchList = [];
let paginationvalue = 0;


//Result Creation to be used in search
//As well an added list item that appears when there are no results
const noResults = createElement('li', 'className', 'zeroResults');
ul.appendChild(noResults);
noResults.style.display = 'none';
noResults.innerHTML = '<h3>Sorry, no results returned</h3>';

// Create Element Function
function createElement(elementType, property, value){
  const element = document.createElement(elementType);
  element[property] = value
  return element;
};

//Create Search Bar
const searchDiv = createElement('div', 'className', 'student-search');
const searchInput = createElement('input', 'placeholder', 'Search for students...');
const button = createElement('button', 'textContent', 'Search');

headerDiv.appendChild(searchDiv);
searchDiv.appendChild(searchInput);
searchDiv.appendChild(button);
searchDiv.insertBefore(searchInput, button);

//Number of links at the bottom based on how many students are in the list
function getPages(list) {
  const pageCount = Math.ceil(list.length / 10);
  return pageCount;
}

//Function created to pull up 10 appropriate students on each page and hide all the others
function tenStudents(value, items) {
    let lowerNumber = ((parseInt(value) - 1) * 10);
    const comparisonNumber = (parseInt(value) * 10);
  for (let h = 0; h <= (items.length - 1); h++) {
    if ( h < lowerNumber ) {
      const listItem = items[h];
      listItem.style.display = 'none'
    } else if(lowerNumber < comparisonNumber) {
        const listItem = items[lowerNumber];
        listItem.style.display = '';
        lowerNumber = lowerNumber + 1;
    }  else {
        const listItem = items[lowerNumber];
        listItem.style.display = 'none';
        lowerNumber = lowerNumber + 1;
      }
    } noResults.style.display = 'none';
}

//pagination div creation
const paginationDiv = createElement('div', 'className', 'pagination');
mainDiv.appendChild(paginationDiv);
mainDiv.insertBefore(ul, paginationDiv);

//pagination ul creation
const paginationUL = document.createElement('ul');
paginationDiv.appendChild(paginationUL);

//creating pagination list items and links
function createPaginationLinks(value) {
  for(let i = 1; i <= value; i++) {
  const paginationLI = createElement('li', 'className', 'pagnation li');
  paginationUL.appendChild(paginationLI);
  const paginationLink = document.createElement('a');
  paginationLink.textContent = i;
  paginationLink.setAttribute('href', '#');
  paginationLI.appendChild(paginationLink);
}
};

//Function that creates opening page default
//1st link set to active & first ten students only appear

function addDefaults(pageValue, items) {
  createPaginationLinks(pageValue);
  const clickLink = document.querySelectorAll('a');
  clickLink[0].className = 'active';
  const first = clickLink[0].textContent;
  parseInt(first);
  tenStudents(first, items);
}
addDefaults(pageCount, list);

//Function to remove active class from where it was
function removeClass() {
  const remove = document.querySelector('.active');
  remove.className = '';
  return remove;
}

//Click Links - removes previous active class and adds it to target
//Collects a value to be used in the function used to call 10 needed Students
//Calls 10 students to appropriate page based on target link
function callCorrectStudents(paginationvalue, list){
  parseInt(paginationvalue);
  tenStudents(paginationvalue, list);
}

//Search Function
//assistance from https://www.youtube.com/watch?v=rrN3KomhPIw
function createSearchList(searchList) {
  const inputValue = searchInput.value;
  let counterDisplay = 0;
  let counterNone = 0;
  for (let i = 0; i < list.length; i++){
    let headingThree = list[i].getElementsByTagName('h3')[0].textContent;
    if (headingThree.indexOf(inputValue) > -1) {
       list[i].style.display = '';
       counterDisplay++;
       searchList.push(list[i]);
     } else {
       list[i].style.display = 'none';
       counterNone++;
     }
} return searchList;
}

//Function created to modify pagnation based on search results
function changePagination(searchList){
  while(paginationUL.firstChild) {
    paginationUL.removeChild(paginationUL.firstChild);
  }
  const updatedLinkCount = Math.ceil(searchList.length/ 10);

  if (searchList.length === 0) {
    noResults.style.display = '';
  } else if (updatedLinkCount <= 1) {
    createPaginationLinks(1);
    const clickLink = document.querySelectorAll('a');
    clickLink[0].className = 'active';
    noResults.style.display = 'none';
  } else if (updatedLinkCount > 1) {
    createPaginationLinks(updatedLinkCount);
    const clickLink = document.querySelectorAll('a');
    clickLink[0].className = 'active';
    noResults.style.display = 'none';
    }
  }

// Runs when new search is actived, pulls up appropriate students.
// Modifies pagniation and limits it to 10 students per link if results more than 10
button.addEventListener('click', (e) => {
  e.preventDefault();
  searchList = [];
  createSearchList(searchList);
  changePagination(searchList);
  const linkNumber = paginationUL.children.length;
  const clickLink = document.querySelectorAll('a');
  clickLink[0].className = 'active';
  const first = clickLink[0].textContent;
  parseInt(first)
  tenStudents(first, searchList);
});

//actives when a pagniation link is clicked. 
paginationUL.addEventListener ('click', (e) => {
  e.preventDefault();
  removeClass();
  e.target.className = 'active';
  paginationvalue = e.target.textContent;

//search results
  if (searchList.length > 0) {
    callCorrectStudents(paginationvalue, searchList) }
//Given List
   else {
    callCorrectStudents(paginationvalue, list)}
})

//Removes all previous pagination
//https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript

//updated pagination & no result


   //return searchList;
//getPages(searchList);
//tenStudents(pageCount, searchList);
