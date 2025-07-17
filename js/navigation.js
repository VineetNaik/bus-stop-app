// Script to allow toggling between tabs 
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


//Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//function to refresh
function refreshArrivals() {
    fetchArrivals("490004404N", "arrivals1");
    fetchArrivals("490004404S", "arrivals2");

    document.getElementById("time-update").textContent = "Last updated at: " + new Date().toLocaleTimeString();
    
    const container = document.getElementById("drop1");
    const selectedOption = container.options[container.selectedIndex];
    if (selectedOption && selectedOption.value) {
        fetchArrivals(selectedOption.value, "arrivals3");
    }


}

//run on click button
document.getElementById('refresh-button').addEventListener("click", refreshArrivals);

//run on window opening
window.addEventListener("DOMContentLoaded", refreshArrivals)