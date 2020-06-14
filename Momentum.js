// ==================시계 ==================
const clock = document.querySelector(".js-clock"),
            clockH1= clock.querySelector("h1");

//==================이름 저장 ================
const nameForm = document.querySelector('.js-name');
const nameInput = nameForm.querySelector('input');
const nameH2 = document.querySelector('.showName');
const NAME = "name";
const SHOWING = "showIng";

//==================todolist 작성=============
const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.toDoList');
const LIST_LS = "doingList"
let listArr =[];
//시간 보여주는 함수
function setClock(){
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    clockH1.innerHTML=`${hours<10? `0${hours}`:hours} : ${
        minutes<10? `0${minutes}`:minutes} : ${
            seconds <10?`0${seconds}`:seconds}`;
}
//폼을 표시하고 값을 넣는 이벤트를 확인하는 함수
function showForm(){
    nameForm.classList.add(SHOWING);
    nameForm.addEventListener("submit",nameSubmit);
}
//form을 지우고 Welcome text를 띄우는 함수
function showName(text){
    nameForm.classList.remove(SHOWING);
    nameH2.classList.add(SHOWING);
    nameH2.innerText = `Welcome ${text}!`;
}
//로컬스토리지에 저장하는 함수
function saveName(text){
    localStorage.setItem(NAME,text);
}
//사용자가 input에 값을 입력하고 전송하면 데이터를 받는 함수
function nameSubmit(event){
    event.preventDefault();
    const currentUser = nameInput.value;
    showName(currentUser);
    saveName(currentUser);
}
//로컬스토리지에 값이 있는지 확인하고 값이 있으면 호출하고 값이 없으면 form 표시하는 함수
function loadName(){
    const nameCheck = localStorage.getItem(NAME);
    if(nameCheck===null){
        showForm();
    }else{
        showName(nameCheck);
    }
}
function saveList(){
    localStorage.setItem(LIST_LS,JSON.stringify(listArr));
}
function delBtnFn(event){
    const btn = event.target;
    const ul = btn.parentNode;
    toDoList.removeChild(ul);
    const cleanList = listArr.filter(function(listA){
        return listA.id!==parseInt(ul.id);
    });
    listArr = cleanList;
    saveList();
}
function makeToDo(text){
    const ul =document.createElement('ul');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    const newId = listArr.length+1;
    delBtn.innerText="❌";
    span.innerText=text;
    delBtn.addEventListener("click",delBtnFn);
    ul.appendChild(delBtn);
    ul.id = newId
    ul.appendChild(span);
    toDoList.appendChild(ul);
    const dataObj={
        text :text,
        id:newId
    }
    listArr.push(dataObj);
    saveList();
}
function loadList(){
    const listCheck = localStorage.getItem(LIST_LS);
    if(listCheck!==null){
        const parseData = JSON.parse(listCheck);
        parseData.forEach(function(list){
            makeToDo(list.text);
        });
    }
}
function handleList(e){
    e.preventDefault();
    const currentData = toDoInput.value;
    makeToDo(currentData);
    toDoInput.value="";
}
function init(){
    setClock();
    setInterval(setClock,1000);
    loadName();
    loadList();
    toDoForm.addEventListener('submit',handleList)
}
init();