'use strict';

// Implement the following features which will require a more complex store object:
// DONE User can press a switch/checkbox to toggle between displaying all items or displaying only items that are unchecked
//   DONE Need a switch or checkbox on the HTML




// User can edit the title of an item




//DONE change code to utilize new STORE data structure
//DONE new STORE = object with items list. displayAllCheckedToggle. 
const STORE = {
  items: [ {name: 'apple', completed: false, filtered: false}, {name: 'banana', completed: true, filtered: false}, {name: 'pineapple', completed: false, filtered: false} ],
  removeCheckedItems: false,
  searchTerm: ''
};

// User input is captured and stored into a datastore
// You should be able to add items to the list
function addItemToStore(object) {
  // Push new item object to datastore
  STORE.items.push(object);
}

function removeItemFromStore(index) {
  // Removes the array item from index in store
  STORE.items.splice(index, 1);
}

// You should be able to delete items from the list
function handleDeleteItemClicked() {
  // input
  $('ul.shopping-list').on('click', '.shopping-item-delete', function(event) {
    // update store
    const index = retrieveItemIndexFromDOM($(event.target));
    // Remove the array item at index
    removeItemFromStore(index);
    // rerender
    renderShoppingList();
  });
}

//BUG: Click Removed Checkbox -> Click check on one item -> Click check on another item and the first item toggles back
// You should be able to check items on the list
function handleItemCheckClicked() {
  // Need to use event delegation Listen for when a user clicks the check button
  $('ul.shopping-list').on('click', '.shopping-item-toggle', function(event) {
    // Retrieve the item's index in STORE from ther data attr
    const index = retrieveItemIndexFromDOM($(event.target));
    // Toggle the checked property in the store
    toggleCheckedForListItem(index);
    // Re-render the shopping list
    renderShoppingList();
  });
}

function retrieveItemIndexFromDOM(eventObj) {
  // Return the value of data-item-index attribute
  return eventObj.closest('li').attr('data-item-index');
}

function toggleCheckedForListItem(index) {
  // Set value of boolean to opposite of boolean
  STORE.items[index].completed = !STORE.items[index].completed;
}

// Handle submit event listener
function handleAddItem() {
  // Listen for when users submit a new list item
  $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    // Get the name of the new item from the text input
    const inputObject = $('.js-shopping-list-entry');
    const newListItem = inputObject.val();
    // Clear out the value of the input so new items can be addeed
    inputObject.val('');
    // Update the store
    addItemToStore({ name: newListItem, completed: false, filtered: false });
    // Rerender the shopping list
    renderShoppingList();
  });
}

function listItemToHTML(itemObject, itemIndex) {
  // we're passed a object from STORE and its index
  // check the completed status in itemObject, if true add class
  // else pass empty string as class
  const checkedStatus = itemObject.completed ? 'shopping-item__checked' : '';

  console.log(itemObject, STORE);

  if (STORE.removeCheckedItems && itemObject.completed) {
    return '';
  }

  if (STORE.searchTerm !== '' && !itemObject.name.includes(STORE.searchTerm)) {
    return '';
  }

  // return generated html
  return `
  <li data-item-index="${itemIndex}">
    <span class="shopping-item ${checkedStatus}">${itemObject.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle">
        <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete">
        <span class="button-label">delete</span>
      </button>
    </div>
  </li>
  `;
}

function handleShowAllvsShowChecked() {
  $('.js-shopping-list-checkbox').change( function(event) {
    STORE.removeCheckedItems = !STORE.removeCheckedItems;
    renderShoppingList();
  });
}

function getUncompletedItems() {
  let checkedItems = [];
  checkedItems = STORE.items.filter((item) => item.completed === false);
  return checkedItems;
}

// User can type in a search term and the displayed list will be filtered by item names only containing that search term
//    DONE Need a search box on the HTML
//    DONE Listen for Search box to be clicked
//    DONE Get user search data
//    DONE show search results similar to how we filtered before
//    IF TIME: search dynamically on key presses in the search box (onChange?)

function handleSearchClicked() {
  $('#js-shopping-list-search').submit( event => {
    event.preventDefault();
  
    // Get the name of the new item from the text input
    const inputObject = $('.js-shopping-list-search');
    const searchItem = inputObject.val();
    // Clear out the value of the input so new items can be added
    inputObject.val('');

    // Change the Search Filter
    addSearchTermToStore(searchItem);

    // Rerender the shopping list
    renderShoppingList();

  });
}

function addSearchTermToStore(searchItem) {
  STORE.searchTerm = searchItem;
}

function searchForItems(itemsToSearch) {
  return itemsToSearch.filter( item => item.name === STORE.searchTerm);
}

// Shopping list should be rendered to the page
function renderShoppingList() {
  // loop through store using map to generate html to be placed on page
  let items = STORE.items;

  //if (STORE.searchTerm !== '') {
  //  items = searchForItems(items);
  //}

  items = items.map(listItemToHTML);
  
  // place html on page
  $('ul.shopping-list').html(items.join(''));
}

// On ready function
function handleShoppingList() {
  // run other functions
  renderShoppingList();
  handleAddItem();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleShowAllvsShowChecked();
  handleSearchClicked();
}

$(handleShoppingList);
