
const email = document.getelementbyid('email');
const password = document.getelementbyid('password');
const form = document.getelementbyid('form');



form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}



const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();



    if (emailValue === '') {
        setError(email, 'Vui lòng nhập trường này!');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Email không đúng định dạng!');
    } else {
        setSuccess(email);
    }


    if (passwordValue === '') {
        setError(password, 'Vui lòng nhập trường này!');
    } else if (passwordValue.length < 6) {
        setError(password, 'Mật khẩu phải nhỏ hơn 6 ký tự!')
    } else {
        setSuccess(password);
    }


};
