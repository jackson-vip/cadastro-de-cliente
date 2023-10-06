//***************************
// DEV-Jackson              *
// **************************
// SELEÇÃO DE ELEMENTOS *****

const inputNome = document.getElementById('nome');
const inputGenero = document.getElementById('genero');
const inputDate = document.getElementById('dataNascimento');
const inputNomePai = document.getElementById('nome-pai');
const inputNomeMae = document.getElementById('nome-mae');
const inputCpf = document.getElementById('cpf');
const inputCnh = document.getElementById('cnh');
const inputRg = document.getElementById('rg');
const inputOrgaoExp = document.getElementById('orgaoExp');
const inputcel1 = document.getElementById('cel-1');
const inputcel2 = document.getElementById('cel-2');
const inputEmail = document.getElementById('email');
const inputCEP = document.getElementById('cep');
const inputLougradoro = document.getElementById('lougradoro');
const inputNumero = document.getElementById('numero');
const inputBairro = document.getElementById('bairro');
const inputCidade = document.getElementById('cidade');
const inputUf = document.getElementById('uf');
const inputComplemento = document.getElementById('complemento');
const inputReferencia = document.getElementById('referencia');
const inputImagem = document.getElementById('imagem');
const imagemPreview = document.getElementById('imagem-preview');
const userImagem = document.getElementById('user-imagem');
const changeImagemButton = document.getElementById('change-imagem');

//***************************
//*** FUNÇÕES ***************

// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os não dígitos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    const digito1 = calcularDigitoVerificador(cpf, 9);
    const digito2 = calcularDigitoVerificador(cpf, 10);

    return cpf.charAt(9) == digito1 && cpf.charAt(10) == digito2;
};

function calcularDigitoVerificador(cpf, peso) {
    let soma = 0;

    for (let i = 0; i < peso; i++) {
        soma += parseInt(cpf.charAt(i)) * (peso + 1 - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
};

// Aplicar máscara ao CPF
function applyCPFFormat(inputField) {
    inputField.addEventListener('input', function (e) {
        let input = e.target;
        let value = input.value.replace(/\D/g, '');
        let formattedValue = '';
        const cpfMask = 'xxx.xxx.xxx-xx';

        for (let i = 0, j = 0; i < cpfMask.length && j < value.length; i++) {
            if (cpfMask[i] === 'x') {
                formattedValue += value[j];
                j++;
            } else {
                formattedValue += cpfMask[i];
            }
        }
        input.value = formattedValue;
    });
};
// Chamando a função
applyCPFFormat(inputCpf);
// ***
// Campo CNH (máscara)
function maskedCNH(inputField) {
    inputField.addEventListener('input', (e) => {
        const input = e.target;
        const value = input.value.replace(/\D/g, '');
        const cnhMask = 'xxxxxxxxxxx';
        let formattedValue = '';
        const warning = document.getElementById('warning-cnh');

        for (let i = 0, j = 0; i < cnhMask.length && j < value.length; i++) {
            if (cnhMask[i] === 'x') {
                formattedValue += value[j];
                j++;
            }
        }

        if (/^(\d)\1{10}$/.test(value)) {
            warning.innerHTML = '* CNH inválida';
            inputField.classList.add('input-focado');
            warning.style.color = '#e85d04';
        }
        input.value = formattedValue;
    });
};

inputCnh.addEventListener('focus', (e) => {
    const value = e.target;
    const str = value.value.replace(/\D/g, '');
    const warning = document.getElementById('warning-cnh');

    if (str.value == '' || /^(\d)\1{10}$/.test(str) || (str.length >= 1 && str.length <= 10)) {
        warning.innerHTML = '';
        value.classList.remove('input-focado');
    }
});

inputCnh.addEventListener('blur', (e) => {
    const value = e.target;
    const str = value.value.replace(/\D/g, '');
    const warning = document.getElementById('warning-cnh');

    if (/^(\d)\1{10}$/.test(str) || str.length >= 1 && str.length <= 10) {
        warning.innerHTML = '* CNH inválida';
        value.classList.add('input-focado');
        warning.style.color = '#e85d04';

    } else if (str.value == '' || str.value == null) {
        warning.innerHTML = '';
        value.classList.remove('input-focado');
    }
});
// Chamando a função (CNH)
maskedCNH(inputCnh);
// ***
// Campo RG (máscara) 
inputRg.addEventListener('input', function () {
    let value = inputRg.value;
    value = value.replace(/\D/g, '');

    if (value.length > 9) {
        value = value.substring(0, 9);
    }

    if (value.length === 7) {
        const valorFormatado = value.replace(/(\d{2})(\d{2})(\d{3})/, '$1.$2.$3');
        value = valorFormatado;
    } else if (value.length === 9) {
        const valorFormatado = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3');
        value = valorFormatado;
    }
    inputRg.value = value;
});

inputRg.addEventListener('fucus', function () {
    const warning = document.getElementById('warinig-rg');

    warning.innerHTML = '';
    inputRg.classList.remove('input-focado');

});
// ***
// Campo Celulares (máscara Cel-1 | Cel-2)
function applyMask(field) {
    field.addEventListener('input', function (e) {
        let input = e.target;
        let value = input.value.replace(/\D/g, '');
        let maskedValue = '';
        const mask = '(XX) XXXXX-XXXX';

        for (let i = 0, j = 0; i < mask.length && j < value.length; i++) {
            if (mask[i] === 'X') {
                maskedValue += value[j];
                j++;
            } else {
                maskedValue += mask[i];
            }
        }
        input.value = maskedValue;
    });

    field.addEventListener('blur', (e) => {
        let input = e.target;
        let value = input.value; 

        if (field.id === 'cel-1') {
            const warningg = document.getElementById('warning-cel1');

            if( value === '' ){
                warningg.innerHTML = '* Campo obrigatório';
                warningg.style.color = '#e85d04';
                input.classList.add('input-focado');
            }

        } else if (field.id === 'cel-2') {
            const warning = document.getElementById('warning-cel2');
            if( value === '' ){
                warning.innerHTML = '* Campo obrigatório';
                warning.style.color = '#e85d04';
                input.classList.add('input-focado');
            }
        }

    });

    field.addEventListener('focus', (e) => {
        let input = e.target;
        
        if (field.id === 'cel-1') {
            const warningg = document.getElementById('warning-cel1');
            
                warningg.innerHTML = '';
                input.classList.remove('input-focado');
         
        } else if (field.id === 'cel-2') {
            const warning = document.getElementById('warning-cel2');

                warning.innerHTML = '';
                input.classList.remove('input-focado');
        }
    });
}

// Chamando a função:
applyMask(inputcel1);
applyMask(inputcel2);
// ***
// Campo e-mail 
function validacaoEmail(field) {
    const warinig = document.getElementById('warning-email');
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    field.addEventListener('blur', (e) => {
        const input = e.target;
        const email = input.value;

        if (email === '' || !regex.test(email)) {
            warinig.innerHTML = '* Por favor, forneça e-mail válido.';
            input.classList.add('input-focado');
            warinig.style.color = '#e85d04';
        }
    });

    field.addEventListener('focus', (e) => {
        const input = e.target;

        warinig.innerHTML = '';
        input.classList.remove('input-focado');
    });
};
// Chamando a função
validacaoEmail(inputEmail);
// ***
// Limparar Formulário
function clearForm() {
    const formulario = document.getElementById('formCadUser');
    const elementos = formulario.elements;

    // Itera por todos os elementos e define seus valores como vazios
    for (let i = 0; i < elementos.length; i++) {
        const elemento = elementos[i];

        if (elemento.type === 'text' || elemento.type === 'tex  tarea' || elemento.type === 'tel' ||
            elemento.type === 'email' || elemento.type === 'date') {
            elemento.value = '';
        }
    }
    // Atualiza a página após limpar os campos
    window.location.reload();
}
// ***
// ToUpperCase 
function toUpperCase(str) {
    return str.replace(/\w\S*/g, function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
}
// ***

//***************************
//*** EVENTOS ***************

// Campo Nome
inputNome.addEventListener('input', function (e) {
    const field = e.target;
    const value = field.value.replace(/\s+/g, ' ');
    const str = value.replace(/[\d!-@#$%&*()_+[\]{};':"\\|,.<>/?]+/g, '');

    inputNome.value = toUpperCase(str);
});

inputNome.addEventListener('blur', function (e) {
    const field = e.target;
    const str = field.value;
    const warning = document.getElementById('warning-nome');

    if (str === '' || str.length < 7) {
        warning.innerHTML = '* Informe nome completo';
        inputNome.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
});

inputNome.addEventListener('focus', function () {
    const warning = document.getElementById('warning-nome');

    warning.innerHTML = '';
    inputNome.classList.remove('input-focado');

});
// ***
// Campo Gênero
inputGenero.addEventListener('blur', () => {
    const field = inputGenero.value;
    const warning = document.getElementById('warning-genero');
    
    if( field === ''){
        warning.innerHTML = '* Campo obrigatório';
        warning.style.color = '#e85d04';
        inputGenero.classList.add('input-focado');
    }
});

inputGenero.addEventListener('focus', () => {
    const warning = document.getElementById('warning-genero');

    warning.innerHTML = '';
    inputGenero.classList.remove('input-focado');
});
// ***
// Campo Data de Nascimento 
inputDate.addEventListener('input', function () {
    // const selectedDate = inputDate.value;
    const warning = document.getElementById('warning-dataNasc');

    warning.innerHTML = '';
    inputDate.classList.remove('input-focado');
});

inputDate.addEventListener('blur', function () {
    const selectedDate = inputDate.value;
    const warning = document.getElementById('warning-dataNasc');

    if (selectedDate === '') {
        warning.innerHTML = '* Campo obrigatório';
        inputDate.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
});

inputDate.addEventListener('focus', function () {
    const warning = document.getElementById('warning-dataNasc');

    warning.innerHTML = '';
    inputDate.classList.remove('input-focado');
});
// ***
// Campo Nome do Pai
inputNomePai.addEventListener('input', function (e) {
    const field = e.target;
    const value = field.value.replace(/\s+/g, ' ');
    const str = value.replace(/[\d!-@#$%&*()_+[\]{};':"\\|,.<>/?]+/g, '');

    inputNomePai.value = toUpperCase(str);
});

inputNomePai.addEventListener('blur', function (e) {
    const field = e.target;
    const str = field.value;
    const warning = document.getElementById('warning-pai');

    if (str === '' || str.length < 7) {
        warning.innerHTML = '* Infome nome completo (Pai)';
        inputNomePai.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
});

inputNomePai.addEventListener('focus', function () {
    const warning = document.getElementById('warning-pai');

    warning.innerHTML = '';
    inputNomePai.classList.remove('input-focado');
});
// ***
// Campo Nome da Mãe
inputNomeMae.addEventListener('input', function (e) {
    const field = e.target;
    const value = field.value.replace(/\s+/g, ' ');
    const str = value.replace(/[\d!-@#$%&*()_+[\]{};':"\\|,.<>/?]+/g, '');

    inputNomeMae.value = toUpperCase(str);
});

inputNomeMae.addEventListener('blur', function (e) {
    const field = e.target;
    const str = field.value;
    const warning = document.getElementById('warning-mae');

    if (str === '' || str.length < 7) {
        warning.innerHTML = '* Infome nome completo (Mãe)';
        inputNomeMae.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
});

inputNomeMae.addEventListener('focus', function () {
    const warning = document.getElementById('warning-mae');

    warning.innerHTML = '';
    inputNomeMae.classList.remove('input-focado');
});
// ***
// Quando o botão "Alterar Imagem" é clicado, aciona o clique no input de imagem oculto
changeImagemButton.addEventListener('click', function () {
    inputImagem.click();
});

// Quando o usuário seleciona uma imagem, exibe-a como uma prévia
inputImagem.addEventListener('change', function () {
    const file = inputImagem.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            userImagem.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Campo CPF 
inputCpf.addEventListener('blur', () => {
    let cpf = inputCpf.value;
    const warning = document.getElementById('warning-cpf');

    if (validarCPF(cpf)) {
        // Aqui você pode adicionar ações a serem executadas quando o CPF for válido
        warning.innerHTML = '';
        inputCpf.classList.remove('input-focado');

    } else {
        // Aqui você pode adicionar ações a serem executadas quando o CPF for inválido
        warning.innerHTML = '* CPF invávido';
        inputCpf.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
});

inputCpf.addEventListener('focus', function () {
    const warning = document.getElementById('warning-cpf');

    warning.innerHTML = '';
});
// ***
// Campo CEP (Máscara) 
inputCEP.addEventListener('input', function () {
    let value = inputCEP.value.replace(/\D/g, '');
    const maxLength = 8;

    if (value.length > maxLength) {
        value = value.slice(0, maxLength); // Limita o tamanho máximo do CEP   
    }

    if (value.length > 2) {
        value = value.slice(0, 2) + '.' + value.slice(2);
    }

    if (value.length > 6) {
        value = value.slice(0, 6) + '-' + value.slice(6);
    }
    inputCEP.value = value;
});

inputCEP.addEventListener('blur', function () {
    const value = inputCEP.value;
    const warning = document.getElementById('warning-cep');

    if (value.length < 10) {

        warning.innerHTML = '* Campo obrigatório';
        inputCEP.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
});

inputCEP.addEventListener('focus', function () {
    const value = inputCEP.value;
    const warning = document.getElementById('warning-cep');

    warning.innerHTML = '';
    inputCEP.classList.remove('input-focado');

});
// ***
// Campo Lougradoro
inputLougradoro.addEventListener('input', function () {
    let strRegex = inputLougradoro.value.replace(/\d+/g, '');
    const str = strRegex.replace(/\s+/g, ' ');
    const warning = document.getElementById('warning-lougradoro');

    if (str === '' || str.length < 4) {
        warning.innerHTML = '* Campo obrigratório';
        inputLougradoro.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
    inputLougradoro.value = toUpperCase(str);
});

inputLougradoro.addEventListener('blur', function () {
    const str = inputLougradoro.value;
    const warning = document.getElementById('warning-lougradoro');

    if (str === '' || str.length < 4) {
        warning.innerHTML = '* Campo obrigratório';
        inputLougradoro.classList.add('input-focado');
        warning.style.color = '#e85d04';
    } else {
        warning.innerHTML = '';
        inputLougradoro.classList.remove('input-focado');
    }
});

inputLougradoro.addEventListener('focus', function () {
    const str = inputLougradoro.value;
    const warning = document.getElementById('warning-lougradoro');

    if (str.length > 4) {
        warning.innerHTML = '';
        inputLougradoro.classList.remove('input-focado');
    }
});
// ***
// Campo Número 
inputNumero.addEventListener('input', function () {
    let strRegex = inputNumero.value.replace(/\D+/g, '');
    const str = strRegex.replace(/\s+/g, ' ').substring(0, 5);
    const warning = document.getElementById('warning-numero');

    if (str === '') {
        inputNumero.classList.add('input-focado');
        warning.style.color = '#e85d04';
    } else {
        warning.innerHTML = '';
        inputNumero.classList.remove('input-focado');
    }
    inputNumero.value = str;
});

inputNumero.addEventListener('blur', function () {
    let str = inputNumero.value;
    const warning = document.getElementById('warning-numero');

    if (str === '') {
        warning.innerHTML = '* Informe Nº';
        inputNumero.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
    inputNumero.value = str;
});

inputNumero.addEventListener('focus', function () {
    let str = inputNumero.value;
    const warning = document.getElementById('warning-numero');

    if (true) {
        warning.innerHTML = '';
        inputNumero.classList.remove('input-focado');
    }
    inputNumero.value = str;
});
// ***
// Campo Bairro 
inputBairro.addEventListener('input', function () {
    let strRegex = inputBairro.value.replace(/\d+/g, '');
    const str = strRegex.replace(/\s+/g, ' ');
    const warning = document.getElementById('warning-bairro');

    if (str === '' || str.length < 4) {
        warning.innerHTML = '* Campo obrigatório';
        inputCidade.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
    inputBairro.value = toUpperCase(str);
});

inputBairro.addEventListener('blur', function () {
    const str = inputBairro.value;
    const warning = document.getElementById('warning-bairro');

    if (str === '' || str.length < 4) {
        warning.innerHTML = '* Campo obrigratório';
        inputBairro.classList.add('input-focado');
        warning.style.color = '#e85d04';
    } else {
        warning.innerHTML = '';
        inputBairro.classList.remove('input-focado');
    }
});

inputBairro.addEventListener('focus', function () {
    const str = inputBairro.value;
    const warning = document.getElementById('warning-bairro');

    if (str.length > 4) {
        warning.innerHTML = '';
        inputLougradoro.classList.remove('input-focado');
    }
});
// ***
// Campo Cidade 
inputCidade.addEventListener('input', function () {
    let strRegex = inputCidade.value.replace(/\d+/g, '');
    const str = strRegex.replace(/\s+/g, ' ');
    const warning = document.getElementById('warning-cidade');

    if (str === '' || str.length < 4) {
        warning.innerHTML = '* Campo obrigratório';
        inputCidade.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
    inputCidade.value = toUpperCase(str);
});

inputCidade.addEventListener('blur', function () {
    const str = inputCidade.value;
    const warning = document.getElementById('warning-cidade');

    if (str === '' || str.length < 4) {
        warning.innerHTML = '* Campo obrigratório';
        inputCidade.classList.add('input-focado');
        warning.style.color = '#e85d04';
    }
});

inputCidade.addEventListener('focus', function () {
    const str = inputBairro.value;
    const warning = document.getElementById('warning-cidade');

    if (str.length > 4) {
        warning.innerHTML = '';
        inputCidade.classList.remove('input-focado');
    }
});
// ***
// Campo UF 
inputUf.addEventListener('blur', () => {
    const field = inputUf.value;
    const warning = document.getElementById('warning-uf');

    if (field === '') {
        warning.innerHTML = '* Campo obrigatório';
        warning.style.color = '#e85d04';
        inputUf.classList.add('input-cocado');
    }
});

inputUf.addEventListener('focus', () => {
    const warning = document.getElementById('warning-uf');

    warning.innerHTML = '';
    inputUf.classList.remove('input-focado');
});
// ***
// Campo Complemento
inputComplemento.addEventListener('input', function () {
    let field = inputComplemento.value.replace(/\s+/g, ' ');
    inputComplemento.value = toUpperCase(field);
});
// ***
// Campo Referência
inputReferencia.addEventListener('input', function () {
    let field = inputReferencia.value.replace(/\s+/g, ' ');
    inputReferencia.value = toUpperCase(field);
});
// ***