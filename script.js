document.addEventListener("DOMContentLoaded", function () {
    listarUsuarios();


    // Criar novo usuário
    document.getElementById("criarUsuarioForm").addEventListener("submit", function (event) {
        event.preventDefault();
        criarUsuario();
    });
});

function listarUsuarios() {
    // Lógica para listar usuários
    fetch("https://api-bank-3fim.onrender.com/api/usuarios")
        .then(response => response.json())
        .then(data => {
            const listaUsuarios = document.getElementById("listaUsuarios");
            listaUsuarios.innerHTML = "<h2>Lista de Usuários</h2>";

            if (data.length > 0) {
                data.forEach(usuario => {
                    const usuarioDiv = document.createElement("div");
                    usuarioDiv.innerHTML = `<p>ID: ${usuario.id}, Nome: ${usuario.nome}, CPF: ${usuario.cpf}, Saldo: ${usuario.saldo}, Ativo: ${usuario.ativo}</p>`;
                    listaUsuarios.appendChild(usuarioDiv);
                });
            } else {
                listaUsuarios.innerHTML += "<p>Nenhum usuário encontrado.</p>";
            }
        })
        .catch(error => console.error("Erro ao listar usuários:", error));
}
function criarUsuario() {
    // Lógica para criar novo usuário
    const form = document.getElementById("criarUsuarioForm");
    const nome = form.elements.nome.value;
    const dataNascimento = form.elements.dataNascimento.value;
    const telefone = form.elements.telefone.value;
    const cpf = form.elements.cpf.value;
    const endereco = form.elements.endereco.value;
    const saldo = form.elements.saldo.value;
    const ativo = form.elements.ativo.checked;

    const novoUsuario = {
        nome: nome,
        dataNascimento: dataNascimento,
        telefone: telefone,
        cpf: cpf,
        endereco: endereco,
        saldo: saldo,
        ativo: ativo
    };

    fetch("https://api-bank-3fim.onrender.com/api/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoUsuario)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao criar usuário: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displaySuccessMessage(`Novo usuário criado com sucesso. ID: ${data.id}`);
            form.reset();
        })
        .catch(error => {
            displayErrorMessage(`Erro ao criar usuário: ${error.message}`);
        });
}

// Função para exibir mensagem de sucesso
function displaySuccessMessage(message) {
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = message;
    successMessage.style.color = "green";
}

// Função para exibir mensagem de erro
function displayErrorMessage(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
}

function consultarSaldo() {
    const usuarioId = document.getElementById('usuarioId').value;

    fetch(`https://api-bank-3fim.onrender.com/api/saldo?usuarioId=${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            const saldoResultado = document.getElementById('saldoResultado');
            saldoResultado.textContent = `Saldo do usuário: ${data.saldo}`;
        })
        .catch(error => {
            console.error('Erro ao consultar saldo:', error);
            alert('Erro ao consultar saldo. Verifique o console para mais detalhes.');
        });
}

// Transferência
document.getElementById("transferenciaForm").addEventListener("submit", function (event) {
    event.preventDefault();
    realizarTransferencia();
});

// Validar Compra
document.getElementById("validarCompraForm").addEventListener("submit", function (event) {
    event.preventDefault();
    validarCompra();
});

// Inativar Usuário
document.getElementById("inativarUsuarioForm").addEventListener("submit", function (event) {
    event.preventDefault();
    inativarUsuario();
});

// Buscar Usuário por CPF ou ID
document.getElementById("findUserForm").addEventListener("submit", function (event) {
    event.preventDefault();
    buscarUsuario();
});

function buscarUsuario() {
    const userIdentifier = document.getElementById('userIdentifier').value;

    // Validar se o identificador é um número ou CPF válido
    if (isNaN(userIdentifier) && !validateCPF(userIdentifier)) {
        displayErrorMessage('CPF ou ID inválido.');
        return;
    }

    fetch(`https://api-bank-3fim.onrender.com/api/usuarios/${userIdentifier}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar usuário: ${response.status}`);
            }
            return response.json();
        })
        .then(user => {
            const userDetails = document.getElementById('userDetails');
            userDetails.innerHTML = '';

            if (user) {
                userDetails.innerHTML = `<p>ID: ${user.id}, Nome: ${user.nome}, Saldo: ${user.saldo}, Ativo: ${user.ativo ? 'Sim' : 'Não'}</p>`;
            } else {
                userDetails.innerHTML = '<p>Usuário não encontrado.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar usuário:', error);
            displayErrorMessage('Erro ao buscar usuário. Verifique o console para mais detalhes.');
        });
}

// Alterar Status do Usuário
document.getElementById("alterarStatusForm").addEventListener("submit", function (event) {
    event.preventDefault();
    alterarStatusUsuario();
});

// Página Inicial
document.getElementById("paginaInicialBtn").addEventListener("click", function () {
    // Lógica para retornar à página inicial
    window.location.href = "index.html";
});



