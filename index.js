//test 
'use strict';

const STORE = [];

// User input is captured and stored into a datastore
// You should be able to add items to the list
function addItemToStore(object) {
  // Push new item object to datastore
  STORE.push(object);
}

function removeItemFromStore(index) {
  // Removes the array item from index in store
  STORE.splice(index, 1);
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
  STORE[index].completed = !STORE[index].completed;
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
    addItemToStore({ name: newListItem, completed: false });
    // Rerender the shopping list
    renderShoppingList();
  });
}

function listItemToHTML(itemObject, itemIndex) {
  // we're passed a object from STORE and its index
  // check the completed status in itemObject, if true add class
  // else pass empty string as class
  const checkedStatus = itemObject.completed ? 'shopping-item__checked' : '';

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

// Shopping list should be rendered to the page
function renderShoppingList() {
  // loop through store using map to generate html to be placed on page
  const items = STORE.map(listItemToHTML);
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
}

$(handleShoppingList);
