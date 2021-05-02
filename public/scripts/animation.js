const SideBar = {

  openClosed(){
    const widhtOpen = "13rem";
    const widhtClose = "3.5rem";
    const sideProprietary = document.getElementById('sidebar');
    const container = document.getElementById('container');
    const footer = document.getElementById('footer');

    const expandlist = document.getElementById('feat-show');
    const caret = document.getElementById('caret');
    const classAtive = (sideProprietary.classList == 'active')

    if(classAtive) {
      expandlist.classList.remove("active-ul");
      container.style.marginLeft = widhtClose;
      // footer.style.marginLeft = widhtClose;
      
    } else {
      expandlist.classList.toggle("active-ul");
      caret.classList.toggle("rotate");
      container.style.marginLeft = widhtOpen;
      // footer.style.marginLeft = widhtOpen;
    }
  },

  menu(){

    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('data-list').classList.toggle('list-item');

    SideBar.openClosed()

  }
}

const stepForm = {

  showTab(n) {
    // This function will display the specified tab of the form ...
    let x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
  
    if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
      document.getElementById("nextBtn").innerHTML = "Avançar";
    }
    // ... and run a function that displays the correct step indicator:
    stepForm.fixStepIndicator(n)
    
  },
  
  nextPrev(n) {
    // This function will figure out which tab to display
    let x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !stepForm.validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      document.getElementById("Form-wind").submit();
      return false;
    }
    // Otherwise, display the correct tab:
    stepForm.showTab(currentTab);
  },
  
  validateForm() {
    // This function deals with validation of the form fields
    let x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
    
    }
    return valid; // return the valid status
  },

  fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    let i, x = document.getElementsByClassName("step");
    // let z = document.getElementsByClassName("li-step::before");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
      // z[i].className = z[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
    // z[n].className += " active";
  }
}

var currentTab = 0; // Current tab is set to be the first tab (0)
stepForm.showTab(currentTab); // Display the current tab


