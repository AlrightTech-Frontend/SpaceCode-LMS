document.addEventListener('DOMContentLoaded', function() {
    const childrenSelect = document.getElementById('select-kid');
    const kids = ['Child 1', 'Child 2']; // Names of the default children

    // Check if local storage has the parent's children
    if (!localStorage.getItem('parentChildren')) {
        // If local storage is empty, save the default children's names
        localStorage.setItem('parentChildren', JSON.stringify(kids));
        displayKids(kids);
    } else {
        // Retrieve children's names from local storage
        const storedKids = JSON.parse(localStorage.getItem('parentChildren'));
        displayKids(storedKids);
    }

    // Check for a newly registered child and add to the select element
    const storedChildName = localStorage.getItem("childName");
    if (storedChildName) {
        const option = document.createElement("option");
        option.value = storedChildName;
        option.textContent = storedChildName;
        childrenSelect.appendChild(option);
    }
});

function displayKids(kidsArray) {
    const selectKid = document.getElementById('select-kid');
    const kidImages = document.querySelectorAll('.kid-images img');

    selectKid.innerHTML = ""; // Clear previous options before adding new ones

    kidsArray.forEach((kid, index) => {
        const option = document.createElement('option');
        option.value = `kid${index + 1}`;
        option.textContent = kid;
        selectKid.appendChild(option);

        if (kidImages[index]) {
            kidImages[index].setAttribute('src', `images/${kid.toLowerCase()}.png`);
            kidImages[index].setAttribute('alt', kid);
        }
    });
}