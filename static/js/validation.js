var regExp = {
    username: /^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: /^[a-zA-Z]+$/,
    password: /^[a-zA-Z0-9]+$/
};

function getData(form) {
    var username = form.username.value,
        email,
        firstName,
        lastName,
        birthday,
        gender,
        password = form.password.value,
        confirm,
        resultArray;

    if (form == document.getElementById('formReg')) {
        email = form.email.value;
        firstName = form.firstName.value;
        lastName = form.lastName.value;
        birthday = form.birthday.value;
        gender = form.gender.value;
        confirm = form.confirm.value;
    }

    resultArray = {
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        gender: gender,
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
        email: regExp['email'].test(data['email']),
        firstName: regExp['name'].test(data['firstName']),
        lastName: regExp['name'].test(data['lastName']),
        // birthday: regExp['date'].test(data['birthday']),
        password: regExp['password'].test(data['password']),
        confirm: regExp['password'].test(data['confirm'])
    };

    message = {
        username: "username isn't correct",
        password: "password isn't correct",
        confirm: "passwords isn't equals"
    };

    var fieldUsername = document.getElementById("fieldUsername"),
        fieldEmail = document.getElementById("fieldEmail"),
        fieldFirstName = document.getElementById("fieldFirstName"),
        fieldLastName = document.getElementById("fieldLastName"),
        fieldBirthday = document.getElementById("fieldBirthday"),
        fieldGender = document.getElementById("fieldGender"),
        fieldPassword = document.getElementById("fieldPassword"),
        fieldConfirm = document.getElementById("fieldConfirm"),
        username = document.getElementById("username"),
        email = document.getElementById("email"),
        firstName = document.getElementById("firstName"),
        lastName = document.getElementById("lastName"),
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
        if (resultCheck['email']) {
            fieldEmail.className = "formFieldIsValid";
            status = true;
        } else if (data['email'] == "") {
            fieldEmail.className = "formFieldBlock";
        } else {
            fieldEmail.className = "formFieldIsNotValid";
            email.value = "";
            email.placeholder = message['email'];
            status = false;
        }

        if (resultCheck['firstName']) {
            fieldFirstName.className = "formFieldIsValid";
            status = true;
        } else if (data['firstName'] == "") {
            fieldFirstName.className = "formFieldBlock";
        } else {
            fieldFirstName.className = "formFieldIsNotValid";
            firstName.value = "";
            firstName.placeholder = message['firstName'];
            status = false;
        }

        if (resultCheck['lastName']) {
            fieldLastName.className = "formFieldIsValid";
            status = true;
        } else if (data['lastName'] == "") {
            fieldLastName.className = "formFieldBlock";
        } else {
            fieldLastName.className = "formFieldIsNotValid";
            lastName.value = "";
            lastName.placeholder = message['lastName'];
            status = false;
        }

        if (data['birthday'] == "") {
            fieldBirthday.className = "formFieldIsNotValid";
            status = false;
        } else {
            fieldBirthday.className = "formFieldIsValid";
            status = true;
        }

        if (data['gender'] == "") {
            fieldGender.className = "formFieldIsNotValid";
            status = false;
        } else {
            fieldGender.className = "formFieldIsValid";
            status = true;
        }

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
        email: data['email'],
        firstName: data['firstName'],
        lastName: data['lastName'],
        birthday: data['birthday'],
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