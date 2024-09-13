// Utility function to get cookies
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(";").shift() : undefined;
};

// Utility function to set cookies
const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

// Load tasks from cookies when the page loads, in the same order they were before
$(document).ready(() => {
    const savedTasks = getCookie("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(decodeURIComponent(savedTasks));
        tasks.reverse().forEach(task => addTask(task));  // Add each task in saved order
    }
});

// Save tasks to cookies while preserving the order and special characters
const saveTasks = () => {
    const tasks = $("#ft_list div").map((_, div) => $(div).html()).get();  // Use .html() to preserve spaces
    setCookie("tasks", JSON.stringify(tasks), 7);  // Save tasks in the current order
};

// Add new task to the list
const addTask = (taskText) => {
    // Use &nbsp; for spaces to preserve them in HTML
    const escapedTaskText = taskText.replace(/ /g, "&nbsp;");
    const $taskDiv = $(`<div>${escapedTaskText}</div>`);

    // Add click event to delete task
    $taskDiv.on("click", function () {
        if (confirm("Do you really want to remove this task?")) {
            $(this).remove();
            saveTasks(); // Save changes to cookies
        }
    });

    // Insert task at the top of the list (fix)
    $("#ft_list").prepend($taskDiv);  // Appends the new task to the bottom (in correct order)
};

// New task button event
$("#new_btn").on("click", () => {
    const taskText = prompt("Please enter a new task:");

    // Allow any input, including spaces (fix)
    if (taskText !== null) {  // Allow any task, even if it's just spaces
        addTask(taskText);
        saveTasks();  // Save new task to cookies
    }
});
// the frist item must show on the first in the stack