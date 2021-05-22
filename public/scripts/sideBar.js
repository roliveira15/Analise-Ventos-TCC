const SideBar = {


  openClosed(){
    const widhtOpen = "13rem";
    const widhtClose = "3.5rem";
    const sideProprietary = document.getElementById('sidebar');
    const container = document.getElementById('container');
    const modal = document.getElementById('modal-wrapper');

    const expandlist = document.getElementById('feat-show');
    const caret = document.getElementById('caret');
    const classAtive = (sideProprietary.classList == 'active')

    if(classAtive) {
      expandlist.classList.remove("active-ul");
      container.style.marginLeft = widhtClose;
      modal.style.marginLeft = widhtClose;
      
    } else {
      expandlist.classList.toggle("active-ul");
      caret.classList.toggle("rotate");
      container.style.marginLeft = widhtOpen;
      modal.style.marginLeft = widhtOpen;
    }
  },

  menu(){

    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('data-list').classList.toggle('list-item');

    SideBar.openClosed()
  }
}


