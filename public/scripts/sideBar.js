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


