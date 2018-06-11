document.addEventListener("DOMContentLoaded", function(){
    var updateButton = document.getElementsByClassName('update');
    var deleteButton = document.getElementsByClassName('delete');
    var submitButton = document.getElementById('submitButton');
    var textField = document.querySelector('textarea');
    var dueTime = document.getElementsByName('duetime');
    var inputForm = document.querySelector('form');

    var previousDescription 
    for (var i=0; i < updateButton.length; i++) {
        updateButton[i].addEventListener('click', function(e){
            submitButton.innerText = 'update';
            submitButton.classList.add('update');
            // console.log(submitButton.class)
            var targetElement = event.target || event.srcElement;
            var ul = targetElement.parentElement.children
            previousDescription = ul[0].innerText
            textField.value = previousDescription
        });
        deleteButton[i].addEventListener('click', function(e){
            var targetElement = event.target || event.srcElement;
            var ul = targetElement.parentElement.children
            previousDescription = ul[0].innerText
            console.log(previousDescription)
            fetch('/todos', {
                method: 'delete',
                headers: {'content-Type': 'application/json'},
                body: JSON.stringify({
                    'description': previousDescription,
                })
            }).then(res => {
                if (res.ok) return res.json();
            }).then(data => {
                console.log(data)
            });
            location.reload();
        });
    }
    
    submitButton.addEventListener('click', function(e){
        if (submitButton.className === 'update' || submitButton.innerText === 'update') {
            e.preventDefault;
            
            console.log('updateing');
            console.log(previousDescription)
            var newDescription = textField.value;
            // var dataObject  = {'description': previousDescription, 'newDescription': newDescription, 'duetime': dueTime.value}
            
            fetch('/todos', {
                method: 'put',
                headers: {'content-Type': 'application/json'},
                body: JSON.stringify({
                    'description': previousDescription,
                    'newDescription': newDescription,
                    'duetime': dueTime.value
                })
            }).then(res => {
                if (res.ok) return res.json();
            }).then(data => {
                console.log(data)
            });
            location.reload();
            
        }   
    });
})
    

