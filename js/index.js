const items = document.querySelectorAll(".card__check, .expand");
const menu = document.querySelector(".navbar");


const observer = new IntersectionObserver((entries, obs)=> {
    entries.forEach(entry => {
        if(entry.isIntersecting && !menu.querySelector("#navbar__check").checked) {
            entry.target.open = true;
            obs.unobserve(entry.target);
            //entry.target.open = !entry.target.open;
        }
    })
}, {
    thereshold: 1,
    rootMargin: "-50%"
});

items.forEach(i => {
    observer.observe(i);
});

const form = document.getElementById("contact__form");
const invalidMessages = {
    REQUIRED_FIELD_MISSING: "No se proporcionó valor a campo requerido",
    REQUIRED_FIELD_EMPTY: "Valor de campo requerido inválido",
    TYPE_EMAIL: "La dirección de correo enviada es inválida"
} 

async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
        alert("Gracias por tu tiempo\nNos pondremos en contacto enseguída!");
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert("Errores detectados:\n" + data["errors"].map(el => {
            return invalidMessages[el.code] ?? "Error no identificado, intentar más tarde";
          }).join("\n"));
        } else {
          alert("Hubo un problema al enviar tu formulario, intenta más tarde");
        }
      })
    }
  }).catch(() => {
    alert("Hubo un problema al enviar tu formulario, intenta más tarde");
  });
}
form.addEventListener("submit", handleSubmit)