var addItem = document.querySelector('.add-item');
addItem.querySelector('#add-button').addEventListener("click", submit);


var idInput = document.getElementById('id-form');
idInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById('add-button').click();
    }
})

var authorInput = document.getElementById('author-form');
authorInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        titleInput.focus();
    }
})


var titleInput = document.getElementById('title-form');
titleInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        topicTitleInput.focus();

    }
})

var topicTitleInput = document.getElementById('topic-title-form');
topicTitleInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        topicDescInput.focus();
    }
})
var topicDescInput = document.getElementById('topic-desc-form');
topicDescInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        idInput.focus();
        topicCreate.click();
    }
})

var myTopic = {
    title: '',
    desc: '',
    items: []
}

var topicCreate = document.getElementById('topic-create-button');
topicCreate.addEventListener('click', createTopic);
function createTopic() {
    let title = manageItem.querySelector(".badge");

    let tempTopicTitle = topicTitleInput.value;
    if (title.innerHTML != "Quản lý thẻ") {alert('Hãy hoàn tất chủ đề đã thêm!!!'); return;}

    if (tempTopicTitle == '') {alert('Chưa nhập chủ đề!!!'); return;}
    for (let i in topicList) {
        if (topicList[i].title == tempTopicTitle) {alert(`Chủ đề ${tempTopicTitle} đã tồn tại!!!`); return;}
    }

    title.innerHTML = tempTopicTitle;
    myTopic.title = topicTitleInput.value;
    myTopic.desc = topicDescInput.value;
    topicTitleInput.value = '';
    topicDescInput.value = '';
}


var topicList = [];

var topicAdd = document.getElementById('add-topic-button');
topicAdd.addEventListener('click', addTopic);
function addTopic() {
    addTopicToList();
}

function addTopicToList() {
    if (itemList.length == 0) {alert('Chưa có thẻ nào được thêm!!!'); return;}
    topic = {
        title: myTopic.title,
        desc: myTopic.desc,
        items: itemList.map(e => e.id)
    }
    topicList.push(topic);
    itemList = [];
    clearItemList();

    console.log(topicList);
    manageItem.querySelector(".badge").innerHTML = "Quản lý thẻ";
    var li = document.createElement('li');
    li.className = 'list-group-item topic-li'; 
    li.innerHTML = `<div class="topic-card">
    <i class="fas fa-arrows-alt"></i>
    <span class = "badge text-dark topic-id">${topic.title}</span>
    <button class="btn btn-danger btn-sm" type="button" class="delete" onclick="deleteTopicFromList(this)">Xoá</button>   
    </div>`;
    document.querySelector('.topic-list-group').appendChild(li);
    updateTopicList(); 
}


function updateTopicList() {
    let cloneTopicList = [];
    var orderedList = document.getElementsByClassName('topic-li');
    for (var i = 0; i < orderedList.length; i++) {
        var tempTitle = orderedList[i].querySelector(".topic-id").innerHTML;
        console.log(tempTitle);
        for (j in topicList) {
            if (topicList[j].title == tempTitle) {
                cloneTopicList.push(topicList[j]);
                break;
            }
        }
    }
    topicList = cloneTopicList;
}

function deleteTopicFromList(e) {
    cloneTopicList = [...topicList];
    topicList = cloneTopicList.filter( function(topic) {
        return topic.title != e.parentElement.querySelector('#topic-id').innerHTML;
    })
    e.parentElement.parentElement.remove();
    updateTopicList();
}

/*Xy ly item them vao */
class Item {
    constructor() {
        this.id = 0;
    }
}

function submit() {
    let tempId = addItem.querySelector('#id-form').value;
    if (manageItem.querySelector(".badge").innerHTML == "Quản lý thẻ") {alert('Chưa có chủ đề!!!'); return;}
    if (tempId == '') {alert('Chưa nhập ID!!!'); return;}
    let tempIdList = getListNumberFromString(tempId);
    for (id in tempIdList) {
        tempItem = new Item();
        tempItem.id = parseInt(tempIdList[id]);
        addItemToList(tempItem);
    } 
    idInput.value = '';
}

function addItemToList(item) {
    if (itemList.some((i) => {
        return i.id == item.id;
    })) {
        alert(`Thẻ "${item.id}" đã tồn tại.`);
        return;
    }
    itemList.push(item);
    var li = document.createElement('li');
    li.className = 'list-group-item item-li'; 
    li.innerHTML = `<div class="item-card">
    <i class="fas fa-arrows-alt"></i>
    <span class = "badge text-dark" id="item-id">${item.id}</span>
    <button class="btn btn-danger btn-sm" type="button" id="delete" onclick="deleteItemFromList(this)">Xoá</button>   
    </div>`;
    manageItem.querySelector('.list-group').appendChild(li);
    updateItemList(); 
}


function updateItemList() {
    itemsClone = [];
    var orderedList = manageItem.getElementsByClassName('item-li');
    console.log(orderedList);
    for (var i = 0; i < orderedList.length; i++) {
        var tempId = orderedList[i].querySelector("#item-id").innerHTML;
        tempId = parseInt(tempId);
        for (j in itemList) {
            if (itemList[j].id == tempId) {
                itemsClone.push(itemList[j]);
                break;
            }
        }
    }
    itemList = itemsClone;
}

function deleteItemFromList(e) {
    cloneItemList = [...itemList];
    itemList = cloneItemList.filter( function(item) {
        return item.id != e.parentElement.querySelector('#item-id').innerHTML;
    })
    e.parentElement.parentElement.remove();
    updateItemList();
}

function clearItemList() {
    let ul = document.querySelector('.item-list ul');
    while(ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

var itemList = [];
var cloneItemList = [];

var manageItem = document.querySelector('.manage-item');
manageItem.querySelector('.item-list').addEventListener("change", updateItemList);

function createTrealet() {
    updateTopicList();
    console.log(topicList);
    if (topicList.length == 0) {
        alert('Chưa có chủ đề nào được thêm!!!'); 
        return;
    }
    let general = document.querySelector('.general');
    let _author = general.querySelector('#author-form').value;
    if (_author == '') {alert('Chưa nhập tên tác giả!!!'); return;}
    let _title = general.querySelector('#title-form').value;
    if (_title == '') {alert('Chưa nhập tên kịch bản!!!'); return;}
    
    let trealet = {
        exec: "streamline",
        title : _title,
        author : _author,
        desc : '',
        topic : topicList.map( (e) => {
            return e;
        })
    }
    const jsonData = {
        trealet: trealet
    }
    
    let temp = document.querySelector('#download-title-form').value;
    temp = temp == '' ? "Kịch bản của tôi" : temp;
    console.log(temp);
    download(JSON.stringify(jsonData), temp + ".trealet", "application/json");

}


function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function getListNumberFromString(str) { 
    let num = str.replace(/[^0-9]/g, ' '); 
    let i = 0;
    num = num.split('');
    while (i < num.length - 1) {
        if (num[i] == ' ' && num[i+1] == ' ') {
            num.splice(i, 1);
            continue;
        }
        i++;
    }
    num = num.join('');
    num = num.split(' ');
    return num;
}