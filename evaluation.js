document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission

        const courseSelect = document.getElementById('course');
        const selectedCourse = courseSelect.options[courseSelect.selectedIndex].text;

        const ratingInputs = document.getElementsByName('rate');
        let userRating = '';
        for (const ratingInput of ratingInputs) {
            if (ratingInput.checked) {
                userRating = ratingInput.value;
                break;
            }
        }

        if (selectedCourse === '' || userRating === '') {
            alert('Please select a course and provide a rating.');
        } else {
            alert(`Thank you for your feedback! Your rating for course ${selectedCourse} is ${userRating}.`);
            // Optionally, you can submit the form here using AJAX or perform other actions
        }
    });
});