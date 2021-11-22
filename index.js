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
        idInput.focus();
    }
})



class Item {
    constructor() {
        this.id = 0;
    }
}





function submit() {
    var numberRegex = new RegExp('[^0-9]');
    let tempId = addItem.querySelector('#id-form').value;
    if (tempId == '') {alert('Chưa nhập ID!!!'); return;}
    let tempIdList = getListNumberFromString(tempId);
    for (id in tempIdList) {
        console.log("Id: ",id);
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
        let alertt = `Thẻ "${item.id}" đã tồn tại.`
        alert(alertt);
        return;
    }
    itemList.push(item);
    var li = document.createElement('li');
    li.className = 'list-group-item'; 
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
    var orderedList = manageItem.getElementsByClassName('list-group-item');
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

var itemList = [];
var cloneItemList = [];

var manageItem = document.querySelector('.manage-item');
manageItem.querySelector('.item-list').addEventListener("change", updateItemList);

function createTrealet() {
    if (itemList.length == 0) {
        alert('Chưa có thẻ nào được thêm!!!'); 
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
        desc : general.querySelector('#description-form').value,
        items : itemList.map( (e) => {
            return e.id;
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

manageItem.querySelector('#create-trealet-button').addEventListener('click', () => {

    $('.modal fade').modal({
        show: true
    });

})

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function getListNumberFromString(str) { 
    let num = str.replace(/[^0-9]/g, ' '); 
    console.log(num);
    let i = 0;
    num = num.split('');
    while (i < num.length - 1) {
        console.log(num, "len: ", num.length);
        if (num[i] == ' ' && num[i+1] == ' ') {
            num.splice(i, 1);
            continue;
        }
        i++;
    }
    num = num.join('');
    num = num.split(' ');
    console.log(num);
    return num;
}