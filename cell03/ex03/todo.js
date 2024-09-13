// Utility function to get cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Utility function to set cookies
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Load tasks from cookies when the page loads
  window.onload = function() {
    const savedTasks = getCookie('tasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach(task => addTask(task));
    }
  };

  // Save tasks to cookies
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#ft_list div').forEach(taskDiv => {
      tasks.push(taskDiv.textContent);
    });
    setCookie('tasks', JSON.stringify(tasks), 7);
  }

  // Add new task to the list
  function addTask(taskText) {
    const ftList = document.getElementById('ft_list');
    const taskDiv = document.createElement('div');
    taskDiv.textContent = taskText;

    // Add click event to delete task
    taskDiv.onclick = function() {
      const confirmDelete = confirm("Do you really want to remove this task?");
      if (confirmDelete) {
        taskDiv.remove();
        saveTasks();  // Save changes to cookies
      }
    };

    // Insert task at the top of the list
    ftList.insertBefore(taskDiv, ftList.firstChild);
  }

  // New task button event
  document.getElementById('new_btn').onclick = function() {
    const taskText = prompt("Please enter a new task:");
    if (taskText) {
      addTask(taskText);
      saveTasks();  // Save new task to cookies
    }
  };