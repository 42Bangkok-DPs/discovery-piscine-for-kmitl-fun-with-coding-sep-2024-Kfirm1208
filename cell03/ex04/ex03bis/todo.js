  // Utility function to get cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(";").shift() : undefined;
};

// Utility function to set cookies
const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

// Load tasks from cookies when the page loads
$(document).ready(() => {
    const savedTasks = getCookie("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(addTask);
    }
});

// Save tasks to cookies
const saveTasks = () => {
    const tasks = $("#ft_list div").map((_, div) => $(div).text()).get();
    setCookie("tasks", JSON.stringify(tasks), 7);
};

// Add new task to the list
const addTask = (taskText) => {
    const $taskDiv = $(`<div>${taskText}</div>`);
    
    // Add click event to delete task
    $taskDiv.on("click", function () {
        if (confirm("Do you really want to remove this task?")) {
            $(this).remove();
            saveTasks(); // Save changes to cookies
        }
    });

    // Insert task at the top of the list
    $("#ft_list").prepend($taskDiv);
};

// New task button event
$("#new_btn").on("click", () => {
    const taskText = prompt("Please enter a new task:");
    if (taskText) {
        addTask(taskText);
        saveTasks(); // Save new task to cookies
    }
});