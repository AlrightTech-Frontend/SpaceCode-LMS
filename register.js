// Wrap the entire code in a function to avoid global scope pollution
(function () {
    // Function to submit the form
    function submitForm(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Validate the form using validateForm1 function
        var isFormValid = validateForm1();

        // If the form is valid, print the information
        if (isFormValid) {
            printChildInformation();
        }
    }

    // Function to validate the form
    function validateForm1() {
        const form = document.getElementById('registrationForm');

        const name = document.getElementById('name').value;
        const phone = document.getElementById('Phone').value;
        const dob = document.getElementById('birthday').value;
        const email = document.getElementById('email').value;

        // Check for empty fields
        if (!name || !phone || !dob || !email) {
            alert('Please fill in all fields.');
            return false;
        }

        // Use the existing isNameStartsWithNumber function for name validation
        if (isNameStartsWithNumber(name)) {
            alert('Name should not start with a number');
            return false;
        }

        // Validate phone number (should be 10 digits)
        if (phone.length !== 10 || isNaN(phone)) {
            alert('Phone number should be 10 digits long');
            return false;
        }

        // Validate date of birth (not after 2017)
        const dobDate = new Date(dob);
        const currentDate = new Date();
        const cutOffYear = new Date(currentDate.getFullYear() - 6, currentDate.getMonth(), currentDate.getDate());

        if (dobDate > cutOffYear) {
            alert('DOB should not be after 2017 (children younger than 6 years old are not accepted)');
            return false;
        }

        // Validate email format using a simple regular expression
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format');
            return false;
        }

        // If all validations pass, store the data and return true
        alert('Form submitted successfully');
        storeData(name);
        return true;
    }

    // Function to check if the name starts with a number
    function isNameStartsWithNumber(name) {
        const firstCharacter = name.charAt(0);
        return !isNaN(firstCharacter);
    }


  // Function to store data in local storage
function storeData(name, imageDataUrl) {
    localStorage.setItem('childName', name);
    localStorage.setItem('childImage', imageDataUrl);
}

function getStoredChildNames() {
    var storedChildNames = localStorage.getItem('childNames');
    return storedChildNames ? JSON.parse(storedChildNames) : [];
}

    // Function to print child information
    function printChildInformation() {
        // Get form elements
        var childPhoto = document.getElementById("photo").files[0];
        var childName = document.getElementById("name").value;
        var childdob = document.getElementById("birthday").value;
        var childgender = document.querySelector('input[name="radio"]:checked').value;
        var childphone = document.getElementById("Phone").value;
        var childemail = document.getElementById("email").value;

        // Create a new window for printing
        var printWindow = window.open('', '_blank');
        var content = '<div style="border: 1px solid #000; padding: 10px;">';

        // Build the content to be printed
       // var content = '';

        // Display photo if available
        if (childPhoto) {
            var reader = new FileReader();
            reader.onload = function (e) {
                content += '<p><img src="' + e.target.result + '" alt="Child Photo" style="max-width: 200px;"></p>';

                content += '<p><strong> Child Name:</strong> ' + childName + '</p>';
                content += '<p><strong>DOB:</strong> ' + childdob + '</p>';
                content += '<p><strong>Gender:</strong> ' + childgender + '</p>';
                content += '<p><strong>Phone:</strong> ' + childphone + '</p>';
                content += '<p><strong>Email:</strong> ' + childemail + '</p>';

                printWindow.document.body.innerHTML = content;
                printWindow.print();
            };
            reader.readAsDataURL(childPhoto);
        } else {
            // If no photo is selected, print without the photo
            content += '<p><strong>Name:</strong> ' + childName + '</p>';
            content += '<p><strong>DOB:</strong> ' + childdob + '</p>';
            content += '<p><strong>Gender:</strong> ' + childgender + '</p>';
            content += '<p><strong>Phone:</strong> ' + childphone + '</p>';
            content += '<p><strong>Email:</strong> ' + childemail + '</p>';

            printWindow.document.body.innerHTML = content;
            var childPhotoElement = printWindow.document.getElementById('childPhoto');
            if (childPhotoElement.complete) {
                printWindow.print();
                printWindow.close();
                window.history.back();
            } else {
                childPhotoElement.onload = function () {
                    printWindow.print();
                    
                
                }
               
            }
        }
    }

    // Attach the submitForm function to the form's submit event
    document.getElementById('registrationForm').addEventListener('submit', submitForm);
form.reset
})();
