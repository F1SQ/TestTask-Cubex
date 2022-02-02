  //'use strict';
  
    let addMessage = document.querySelector('.message'),
      addButton = document.querySelector('.add-button'),
      list = document.querySelector('.list'),            
      removeSubButton = document.querySelector('.button-remove-sublist'),
      listItem = document.querySelectorAll('li');


    let items = [];   


 

    // function addSubList() {
    // }
    // addSubList();

    
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
      loadUpButtons();
      loadDownButtons(); 
      addSubList();   
    });

  
    function displayMessages(){         
      let displayMessage = '';
      items.forEach(function(item, i){
        displayMessage += `
        <li id='item_${i}' class="list-item">
        <button class="button-up">></button>
        <button class="button-down">></button>
        ${item}  
        <input placeholder="Your task-list">
        <button class="button-add-sublist">Add list</button>
        <button class="button-remove-sublist">Remove list</button>
        <button class="button-remove-item">Delete</button>
        </li>
        `;
        list.innerHTML = displayMessage;        
      });
    }
    console.log(items);


    // function deleteElements() {
    //   document.querySelectorAll('.button-remove-item').forEach((btn, i) => {
    //     btn.addEventListener('click', () => { 
    //       btn.parentElement.remove(); 
    //       items.splice(i, 1);  
    //       localStorage.setItem('list', JSON.stringify(items));         
    //     });
    //   });
    // }

      function deleteElements() {
        let removeButton = document.querySelectorAll('.button-remove-item');
          removeButton.forEach((btn, i) => {
          btn.addEventListener('click', () => { 
            btn.parentElement.remove(); 
            items.splice(i, 1);  
            localStorage.setItem('list', JSON.stringify(items));         
          });
        });
      }

  

    function changeUpItem(btn, i) {      
      let a = items[i];
      
      items[i] = items[i - 1];
      items[i - 1] = a;

      displayMessages();
      localStorage.setItem('list', JSON.stringify(items));
      loadUpButtons();
      loadDownButtons();
      deleteElements();
    }

    function loadUpButtons() {
      let upButton = document.querySelectorAll('.button-up');
  
      upButton.forEach(function(el, i) {
          el.addEventListener('click', function(e) { 
            changeUpItem(el, i);
          });
      });
    }

    function changeDownItem(btn, i) {
      let b = items[i];    
      items[i] = items[i + 1];
      items[i + 1] = b;


      displayMessages();
      localStorage.setItem('list', JSON.stringify(items));
      loadDownButtons();
      loadUpButtons();
      deleteElements();
    }

    function loadDownButtons() {
      let downButton = document.querySelectorAll('.button-down');

      downButton.forEach(function(el, i) {
        el.addEventListener('click', function(e) {                           
         changeDownItem(el, i);          
        });
      });
    }

    function addSubList() {
      const subList = document.createElement('ul');      
      subList.classList.add('sublist');
      document.querySelectorAll('.button-add-sublist').forEach((item, i) => {
        item.addEventListener('click', (event) => {
          if (event.target) {
          createSubList(item); 
          }                    
        });
      });    
    }


    function createSubList() {
    const subList = document.createElement('ul');
      subList.classList.add('sublist');
      document.querySelectorAll('.list-item').forEach((item, i) => {
        item.append(subList);
      });
  }

      
    addSubList();
    deleteElements();
    loadUpButtons();
    loadDownButtons();