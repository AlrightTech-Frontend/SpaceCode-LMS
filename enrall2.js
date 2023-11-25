document.addEventListener("DOMContentLoaded", function () {
    // Retrieve child's name from local storage
    var storedChildName = localStorage.getItem("childName");

    // Populate the select element for children
    var childrenSelect = document.getElementById("children");

    // If there is a stored child name, add it to the select element
    if (storedChildName) {
        var option = document.createElement("option");
        option.value = storedChildName;
        option.textContent = storedChildName;
        childrenSelect.appendChild(option);
    }

    // Define the courses array
    var courses = [
        { tutor: "Manar Muath", course: "Scratch", prerequisite: "None" },
        { tutor: "Safiah Hamad", course: "Html & css", prerequisite: "None" },
        { tutor: "Manar Muath", course: "Java", prerequisite: "None" },
        { tutor: "Safiah Hamad", course: "PHP", prerequisite: "Html & css" },
        { tutor: "Ahmed Ali", course: "Python", prerequisite: "Java" },
        { tutor: "Noura Saleh", course: "snap", prerequisite: "Java" },
        { tutor: "Ahmed Ali", course: "AI", prerequisite: "Python" },
        { tutor: "Noura Saleh", course: "swift", prerequisite: "C#" },
        { tutor: "Manar Muath", course: "C#", prerequisite: "Scratch" },
        // Add more courses as needed
    ];

    // Populate filter options for tutor and prerequisite
    var tutorsFilter = document.getElementById("tutor1");
    var prerequisitesFilter = document.getElementById("prerequisite");

    // Use Set to keep track of unique tutor and prerequisite names
    var uniqueTutors = new Set();
    var uniquePrerequisites = new Set();

    courses.forEach(function (course) {
        uniqueTutors.add(course.tutor);
        uniquePrerequisites.add(course.prerequisite);
    });

    // Add unique tutors to the filter options
    uniqueTutors.forEach(function (tutor) {
        var option = document.createElement("option");
        option.value = tutor;
        option.textContent = tutor;
        tutorsFilter.appendChild(option);
    });

    // Add unique prerequisites to the filter options
    uniquePrerequisites.forEach(function (prerequisite) {
        var option = document.createElement("option");
        option.value = prerequisite;
        option.textContent = prerequisite;
        prerequisitesFilter.appendChild(option);
    });

    // Handle form submission
    var form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Check if a child is selected
        var selectedChild = childrenSelect.value;
        if (!selectedChild) {
            alert("Please select a child.");
            return;
        }

        // Check if a course is selected
        var selectedCourses = document.querySelectorAll("input[name='checkbox']:checked");
        if (selectedCourses.length === 0) {
            alert("Please select at least one course.");
            return;
        }

        // Get the selected tutor and prerequisite
        var selectedTutor = tutorsFilter.value;
        var selectedPrerequisite = prerequisitesFilter.value;

        // Display information on the page
        var informationContainer = document.querySelector(".enral");
        informationContainer.innerHTML = "<h2>Enrollment Information</h2> <br>";
        informationContainer.innerHTML += "<p>Child Name: " + selectedChild + "</p> ";
        informationContainer.innerHTML += "<p>Selected Courses:</p>";
        informationContainer.innerHTML += "<ul>";

        // Find and display selected courses and their tutors based on filters
selectedCourses.forEach(function (selectedCourse) {
    // Get the associated label text
    var label = selectedCourse.closest('label');
    var courseName = label.textContent.trim();

    courses.forEach(function (course) {
        if (
            course.course === courseName &&
            (selectedTutor === "All" || course.tutor === selectedTutor) &&
            (selectedPrerequisite === "All" || course.prerequisite === selectedPrerequisite)
        ) {
            informationContainer.innerHTML +=
                "<li>" + course.course + " (Tutor: " + course.tutor + ")</li>";
        }
    });
});

        informationContainer.innerHTML += "</ul>";

        // Clear the form
        form.reset();
    });
});


