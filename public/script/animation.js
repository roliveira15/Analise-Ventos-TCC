const SideBar = {

  open(){
    const button = document.getElementById('feat-show');
    button.classList.toggle("active-ul");

    const caret = document.getElementById('caret');
    caret.classList.toggle("rotate");
  
  },

  menu(ref){
    document.getElementById('id-sidebar').classList.toggle('active');
  }

}