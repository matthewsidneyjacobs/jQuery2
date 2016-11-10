$(document).ready(function() {
  var listo = [];
  getSavedList();
  console.log(listo);

  listo.forEach(function(task){
    $('#newItemInput').val('');
      $('#newList').append(
          '<a href="#finish" class="" id="item">' +
          '<li class="list-groupitem">' +
          '<h3>' + task.task + '</h3>' +
          '<span class="arrow pull-right">' +
          '<i class="glyphicon glyphicon-arrow-right">' +
          '</span>' +
          '</li>' +
          '</a>'
      );
  })
  //  listo.forEach(function(element){addTask(element)});


  //trying to get data from local storage
  function getSavedList() {
    var getList = localStorage.getItem("to-do-list");
    listo = JSON.parse(getList);
    console.log(listo);
    if (!listo) {
      listo=[];
    }


  }


  function saveToDos() {
    var list = JSON.stringify(listo);
    localStorage.setItem("to-do-list", list);
  }

  $('#newTaskForm').hide();

  var advanceTask = function(task) {
  var modified = task.innerText.trim()
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};

  $('.save-todo-list').on('click', function() {
    var list = JSON.stringify(listo);
    localStorage.setItem("to-do-list", list);
  });


  $(document).on('click', '#item', function(e) {
    e.preventDefault();
  });

  $(document).on('click','#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress'
  });

  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });

  $(document).on('click', '#inProgress', function (e){
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });

  $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });

  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  }

  var addTask = function(task) {
    if (task) {
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val('');
        $('#newList').append(
            '<a href="#finish" class="" id="item">' +
            '<li class="list-groupitem">' +
            '<h3>' + task.task + '</h3>' +
            '<span class="arrow pull-right">' +
            '<i class="glyphicon glyphicon-arrow-right">' +
            '</span>' +
            '</li>' +
            '</a>'
        );
    }
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

  $('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newInputItem').val().trim();
    addTask(task);
  });

  //opens form
  $('#add-todo').on('click', function() {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  //closes form
  $('#cancel').on('click', function(e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast','linear');
  });

});
