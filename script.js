const addBtn = document.getElementById("add");
const inputText = document.getElementById("input");
const edit_img = document.getElementById("edit-img");
const delete_img = document.getElementById("remove-img");
const task_checkbox = document.getElementById("task_check");


function edit_show(){
    console.log("edit show")
    document.getElementById("edit-img").src = "./img/editG.gif";
    
}
function edit_hide(){
    console.log("edit hide")
    document.getElementById("edit-img").src = "./img/edit.png";
}
function delete_show(){
    console.log("remove show")
    document.getElementById("remove-img").src = "./img/deleteG.gif";
    
}
function delete_hide(){
    console.log("remove hide")
    document.getElementById("remove-img").src = "./img/delete.png";
}
// check box
// function check_boxFun(check_id){
//     console.log("check_id")
//     // const task_div = document.getElementById("task_check").checked;
//     if(task){

//         document.getElementById("task_check").checked = false;
//         document.getElementById("input_value_id"+check_id).style.textDecorationLine = "none";
//         document.getElementById("input_value_id"+check_id).style.color = "black";
//     }else{
//         document.getElementById("task_check").checked = true;
//         document.getElementById("input_value_id"+check_id).style.textDecorationLine = "line-through";
//         document.getElementById("input_value_id"+check_id).style.color = "green";
//     }
    
// }
// set data in local storage
function setDataDb(stringifyValue){
    localStorage.setItem("items",JSON.stringify(stringifyValue));
}

var id = 0;
var task = false;

addBtn.addEventListener("click", () => {
  console.log(inputText.value, "click");
  const obj = { 
                "task":false,               
                "value":inputText.value
              }
  if(localStorage.getItem("items")){
    const items = JSON.parse(localStorage.getItem("items"));
    items.push(obj);
    setDataDb(items);
  }else{
    setDataDb([obj]);
  }
              
  id++;
  getDataLocalStorage();
  
});
const getDataLocalStorage = () => {
   const list_div = document.getElementById("list");
   list_div.innerHTML = "" ;
   const getItemDb = localStorage.getItem("items");
   if(getItemDb){
    const items = JSON.parse(getItemDb);
    // loop 
    items.forEach((element,index) => {
        
 
  const ListDiv = `
    <div class="list-item" id="div_id_${index}">
    <div class="div">
    <!--   <input type="checkbox" name="" ${element.task?"checked":""} id="task_check${index}" onchange="check_boxFun(${index})" />
    -->
    </div>
    <div class="list-face">
      <img src="./img/happyC.gif" id="face-img" alt="edit" />
    </div>
    <div class="list-text" id="input_value_id${index}">${element.value}</div>
    <div class="list-edit" onClick="edit(${index},'${element.value}')"
    onmouseenter="edit_show()" onmouseleave="edit_hide()"
    >
      <img src="./img/edit.png" id="edit-img" class="edit_delete_img" alt="edit" />
    </div>
    <div class="list-remove" onClick="remove(${index})"
    onmouseenter="delete_show()" onmouseleave="delete_hide()"
    >
      <img src="./img/delete.png" id="remove-img"class="edit_delete_img" alt="Remove" />
    </div>
  </div>`;
  list_div.innerHTML += ListDiv ;
    });
}
  inputText.value = "";
};
function edit(id, value) {
  console.log(id, "edit");
  inputText.value = value;
  remove(id);
}
function remove(id) {
  document.getElementById(`div_id_${id}`).remove();
  const items = JSON.parse(localStorage.getItem("items"));
  items.splice(id,1);
  setDataDb(items);
//   getDataLocalStorage();
  console.log(id, "remove");
}

// first time show data 
getDataLocalStorage();