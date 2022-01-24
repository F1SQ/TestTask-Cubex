  'use strict';
  
    let addMessage = document.querySelector('.message'),
      addButton = document.querySelector('.add-button'),
      list = document.querySelector('.list'),
      upButton = document.querySelector('.button-up'),
      downButton = document.querySelector('.button-down'),  
      addSubButton = document.querySelector('.button-add-sublist'),
      removeSubButton = document.querySelector('.button-remove-sublist'),
      listItem = list.querySelector('li');


    let items = [];   
    
    
    if(localStorage.getItem('list')){      
      items = JSON.parse(localStorage.getItem('list'));
      displayMessages();
    }

    addButton.addEventListener('click', function(){  
      let newItem = (addMessage.value);
      if (newItem == '' || newItem == null) {
      
      }
      else {
        addMessage.value = '';
        items.push(newItem);
        displayMessages();
        localStorage.setItem('list', JSON.stringify(items));
      }
      deleteElements();      
    });

    function displayMessages(){         
      let displayMessage = '';
      items.forEach(function(item, i){
        displayMessage += `
        <li id='item_${i}'>
        <button class="button-up">></button>
        <button class="button-down">></button>
        ${item}
        <button class="button-add-sublist">Add list</button>
        <button class="button-remove-sublist">Remove list</button>
        <button class="button-remove-item">Delete</button>
        </li>
        `;
        list.innerHTML = displayMessage;        
      });
    }
    console.log(items);


    function deleteElements() {
      document.querySelectorAll('.button-remove-item').forEach((btn, i) => {
        btn.addEventListener('click', () => {    
          console.log("click del btn");   
          btn.parentElement.remove();
        });
      });
    }
    deleteElements();