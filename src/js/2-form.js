const formElement = document.querySelector('.feedback-form');
let formData = { email: '', message: '' };
const LS_KEY = 'feedback-form-state';

formElement.addEventListener('input', onDataform);
document.addEventListener('DOMContentLoaded', renderPage);
formElement.addEventListener('submit', onSubForm);

function onDataform() {
  const { email, message } = newForm(formElement);

  formData = {
    email: email,
    message: message,
  };

  const json = JSON.stringify(formData);
  localStorage.setItem(LS_KEY, json);
}

function renderPage() {
  const lsData = localStorage.getItem(LS_KEY);
  const result = JSON.parse(lsData);

  if (result === null) {
    return;
  }

  const formEle = formElement.elements;

  try {
    for (const key in result) {
      formEle[key].value = result[key];
    }
  } catch (error) {
    console.log(error);
  }
}

function onSubForm(event) {
  event.preventDefault();
  const { email, message } = newForm(formElement);

  formData = {
    email: email,
    message: message,
  };

  for (const key in formData) {
    if (formData[key] === '') {
      return alert('Fill please all fields');
    }
  }

  console.log(formData);

  localStorage.removeItem(LS_KEY);
  event.target.reset();
}

function newForm(formElem) {
  const newForm = new FormData(formElem);
  const email = newForm.get('email').trim();
  const message = newForm.get('message').trim();

  return { email, message };
}
