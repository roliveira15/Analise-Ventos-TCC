const SideBar = {

  open(){
    const siderProprietary = document.getElementById('sidebar');
    const expandlist = document.getElementById('feat-show');
    const caret = document.getElementById('caret');
    const classAtive = (siderProprietary.classList == 'active')

    if(classAtive) {
      expandlist.classList.remove("active-ul");
  

    } else {
      expandlist.classList.toggle("active-ul");
      caret.classList.toggle("rotate");
    }
    let mywidth = document.get('sidebar').style.width
    // div.style.width =  widthSidebar - siderProprietary.width 
    console.log(mywidth )
  },

  menu(){
    // const expandlist  = document.getElementById('feat-show');
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('data-list').classList.toggle('list-item');

    SideBar.open()
  }

}