document.addEventListener("DOMContentLoaded", function() {
    var storedChildNames = getStoredChildNames();
    var kidsList = document.querySelector(".mykids");

    storedChildNames.forEach(function(name) {
        var trimmedName = name.trim();

        // Check if the trimmed name is not empty
        if (trimmedName !== "") {
            var listItem = document.createElement("li");
            listItem.className = "kid";

            var h5 = document.createElement("h5");
            h5.textContent = trimmedName;
            listItem.appendChild(h5);

            kidsList.appendChild(listItem);
        }
    });
});