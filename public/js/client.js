window.onload = function () {
    const buttons = document.getElementsByClassName('savedConnectionDeleteButton');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (e) {
            var form = document.createElement('form');
            form.setAttribute('method', 'post');
            form.setAttribute('action', '../user/deleteClicked/' + buttons[i].getAttribute("data-ref"));
            form.style.display = 'hidden';
            var hiddenField = document.createElement("input"); //To verify request came from our own browser view
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "connectionId");
            hiddenField.setAttribute("value", buttons[i].getAttribute("data-ref"));  //We'll get this value only from our view
            form.appendChild(hiddenField);
            document.body.appendChild(form);
            form.submit();
        });
    }

    const allConnectionsInputs = document.querySelectorAll('.allConnections');
    const connectionYesBtn = document.getElementById('connectionYesBtn');
    const connectionNoBtn = document.getElementById('connectionNoBtn');
    const connectionMaybeBtn = document.getElementById('connectionMaybeBtn');
    const deleteConnectionYesBtn = document.getElementById('deleteConnectionYesBtn');

    connectionYesBtn.addEventListener('click', function (e) {
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', '../connections/going-yes/' + connectionYesBtn.getAttribute("data-ref"));
        form.style.display = 'hidden';
        var hiddenField = document.createElement("input"); //To verify request came from our own browser view
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "connectionId");
        hiddenField.setAttribute("value", connectionYesBtn.getAttribute("data-ref")); //We'll get this value only from our view
        for (let i = 0; i < allConnectionsInputs.length; i++) {
            form.appendChild(allConnectionsInputs[i]);
        }
        form.appendChild(hiddenField);
        document.body.appendChild(form);
        form.submit();
    });
    connectionNoBtn.addEventListener('click', function (e) {
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', '../connections/going-no/' + connectionYesBtn.getAttribute("data-ref"));
        form.style.display = 'hidden';
        var hiddenField = document.createElement("input"); //To verify request came from our own browser view
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "connectionId");
        hiddenField.setAttribute("value", connectionYesBtn.getAttribute("data-ref"));  //We'll get this value only from our view
        form.appendChild(hiddenField);
        for (let i = 0; i < allConnectionsInputs.length; i++) {
            form.appendChild(allConnectionsInputs[i]);
        }
        document.body.appendChild(form);
        form.submit();
    });
    connectionMaybeBtn.addEventListener('click', function (e) {
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', '../connections/going-maybe/' + connectionYesBtn.getAttribute("data-ref"));
        form.style.display = 'hidden';
        var hiddenField = document.createElement("input"); //To verify request came from our own browser view
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "connectionId");
        hiddenField.setAttribute("value", connectionYesBtn.getAttribute("data-ref"));  //We'll get this value only from our view
        form.appendChild(hiddenField);
        for (let i = 0; i < allConnectionsInputs.length; i++) {
            form.appendChild(allConnectionsInputs[i]);
        }
        document.body.appendChild(form);
        form.submit();
    });

    deleteConnectionYesBtn.addEventListener('click', function (e) {
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', '../connections/delete-connection/' + deleteConnectionYesBtn.getAttribute("data-ref"));
        form.style.display = 'hidden';
        var hiddenConnectionField = document.createElement("input"); //To verify request came from our own browser view
        hiddenConnectionField.setAttribute("type", "hidden");
        hiddenConnectionField.setAttribute("name", "connectionId");
        hiddenConnectionField.setAttribute("value", deleteConnectionYesBtn.getAttribute("data-ref"));  //We'll get this value only from our view
        form.appendChild(hiddenConnectionField);
        for (let i = 0; i < allConnectionsInputs.length; i++) {
            form.appendChild(allConnectionsInputs[i]);
        }
        document.body.appendChild(form);
        form.submit();
    });


};


