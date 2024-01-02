var Name=document.getElementById("BookMark");
var url=document.getElementById("url");
var create=document.getElementById("submit");




var sites=[];
if(localStorage.webSites != null){
    sites=JSON.parse(localStorage.webSites);

}else{
    sites=[];
}

create.onclick=function create(){
    var site={
        Name:Name.value,
        url:url.value
    }
    sites.push(site);

    localStorage.setItem( 'webSites ' ,JSON.stringify(sites));
    readData();
}
// add to table 
function readData(){
    var table ='';
    for(var i =0;i<sites.length;i++){
        table+=`
        <tr>
        <td>${i}</td>
        <td>${sites[i].Name}</td>
        <td><button onclick='visit()'>Visit</button></td>
        <td onclick='Delete(${i})'><button>Delete</button></td>
        </tr> `
    }
    tableBody.innerHTML=table;
}
function Delete(i){
   
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
       
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: " #3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            sites.splice(i,1)
            localStorage.webSites=JSON.stringify(sites);
            readData();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
}
function visit(){
   var websiteURL=url.value;
   if(websiteURL.trim() != ''){
    window.open(websiteURL, '_blank');

   }else{
    alert('enter url')
   }
}