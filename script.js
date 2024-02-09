const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Formulário SantiClinic preenchido pelo cliente: <br>Nome: ${fullName.value}<br> Email: ${email.value}<br> Telefone: ${phone.value}<br> Whatsapp: ${subject.value}<br> Motivo: ${message.value}</br>`;

    Email.send({
        SecureToken: "bcc48c3d-8e1a-41c2-a501-f6cee34b775b",
        To : 'santiskin.pt@gmail.com',
        From : "santiskin.pt@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK") {
            Swal.fire({
                title: "Obrigado!",
                text: "Formulário enviado com sucesso!",
                icon: "success"
              });
        }
      }
    );
}

function validateEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
        return false;
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
        return true;
    }
}

function validateInputs() {
    const inputs = [fullName, email, phone, subject, message];
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.classList.add("error");
            input.parentElement.classList.add("error");
            isValid = false;
        } else {
            input.classList.remove("error");
            input.parentElement.classList.remove("error");
        }
    });

    return isValid;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateInputs() && validateEmail()) {
        sendEmail();
        form.reset();
    }
});

email.addEventListener("blur", validateEmail);
