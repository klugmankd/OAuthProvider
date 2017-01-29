var regExp = {
    username: /^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$/,
    password: /^[a-zA-Z0-9]+$/,
    confirm: /^[a-zA-Z0-9]+$/
};

function getData(form) {
    var username = form.username.value,
        password = form.password.value,
        confirm,
        resultArray;

    if (form == document.getElementById('formReg')) {
        confirm = form.confirm.value;
    }

    resultArray = {
        username: username,
        password: password,
        confirm: confirm
    };

    return resultArray;
}

function validate(form) {
    var data = getData(form),
        resultCheck,
        message,
        status = false,
        resultData;

    resultCheck = {
        username: regExp['username'].test(data['username']),
        password: regExp['password'].test(data['password']),
        confirm: regExp['confirm'].test(data['confirm'])
    };

    message = {
        username: "username isn't correct",
        password: "password isn't correct",
        confirm: "passwords isn't equals"
    };

    var fieldUsername = document.getElementById("fieldUsername"),
        fieldPassword = document.getElementById("fieldPassword"),
        fieldConfirm = document.getElementById("fieldConfirm"),
        username = document.getElementById("username"),
        password = document.getElementById("password"),
        confirm = document.getElementById("confirm");

    if (resultCheck['username']) {
        fieldUsername.className = "formFieldIsValid";
        status = true;
    } else if (data['username'] == "") {
        fieldUsername.className = "formFieldBlock";
    } else {
        fieldUsername.className = "formFieldIsNotValid";
        username.value = "";
        username.placeholder = message['username'];
        status = false;
    }

    if (resultCheck['password']) {
        fieldPassword.className = "formFieldIsValid";
        status = true;
    } else if (data['password'] == "") {
        fieldPassword.className = "formFieldBlock";
    } else {
        fieldPassword.className = "formFieldIsNotValid";
        password.value = "";
        password.placeholder = message['password'];
        status = false;
    }

    if (form == document.getElementById('formReg')) {
        if (resultCheck['confirm'] && confirmPassword(data['password'], data['confirm'])) {
            fieldConfirm.className = "formFieldIsValid";
            status = true;
        } else if (data['confirm'] == "") {
            fieldConfirm.className = "formFieldBlock";
        } else {
            fieldConfirm.className = "formFieldIsNotValid";
            confirm.value = "";
            confirm.placeholder = message['confirm'];
            status = false;
        }
    }

    resultData = {
        status: status,
        username: data['username'],
        password: data['password']
    };

    return resultData;
}

function confirmPassword(password, confirm) {
    return password == confirm;
}

function sendForm(form) {
    var data = validate(form);

    if (data['status']) {
        alert("form was sending");
    } else alert("form is not valid");

    // must be ajax query
}