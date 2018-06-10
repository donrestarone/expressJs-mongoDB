document.addEventListener("DOMContentLoaded", function(){
    var updateButton = document.getElementsByClassName('update');
    var deleteButton = document.getElementsByClassName('delete');
    for(var i=0; i < updateButton.length; i++) {
        updateButton[i].addEventListener('click', function(e){
            var targetElement = event.target || event.srcElement;
            var ul = targetElement.parentElement.children
            console.log(ul)
        });
    }
    for(var i=0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', function(e){
            console.log()
        });
    }
    
})
    

