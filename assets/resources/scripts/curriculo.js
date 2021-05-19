(function () {

    let $id = function (id) {
        return document.getElementById(id);
    };

    //ao carregar o dom
    window.onload = function () {

        $('#input-name').focus();

        (function () {
            $("#btn-submit").addClass("disabled");
        })();

        $id('form-curriculo').addEventListener("submit", function (e) {
            console.log(e);
            e.preventDefault();
        });

    };

    //validação
    $id('input-name').addEventListener("invalid", function (event) {
        if ($id('input-name').validity.patternMismatch) {
            $id('input-name').setCustomValidity("Por favor, insira um nome com inicial maiúscula e sem a inclusão de números.");
        } else {
            $id('input-name').setCustomValidity("");
        }
    });

    $id('input-city').addEventListener("blur", function (event) {
        if ($id('input-city').validity.patternMismatch) {
            $id('input-city').setCustomValidity("Por favor, insira um nome com inicial maiúscula e sem a inclusão de números.");
        } else {
            $id('input-city').setCustomValidity("");
        }
    });

    $id('input-telefone').addEventListener("invalid", function (event) {
        if ($id('input-telefone').validity.patternMismatch) {
            $id('input-telefone').setCustomValidity("Por favor, insira um numero com 9 digitos apos o DDD");
        } else {
            $id('input-telefone').setCustomValidity("");
        }
    });

    $id('input-textarea').addEventListener("blur", () => {
        if (validaCamposAll()) {
            $("#btn-submit").removeClass("disabled");
        } else {
            if (!validaCamposAll()) {
                window.setTimeout(() => {
                    window.alert("Verefique o formulario novamente pois a campos invalidos!");
                }, 1200);
            }
        }
    });

    $id('form-curriculo').addEventListener("submit", function (event) {
        if (validaCamposAll()) {
            cadastra();
        }
    });

    //VAR GLOBAL
    let arrayRelatorio = [];

    //VALIDAÇÃO
    let validaGenero = function () {
        let elems = document.getElementsByName('gender-group');
        for (i in elems) {
            if (elems[i].checked) {
                return true;
            }
        }
        //alert('O genero não foi selecionado, favor selecione um!');
        return false;
    };

    function validaAreas() {
        let elems = document.getElementsByName('interest-group');
        for (i in elems) {
            if (elems[i].checked) {
                return true;
            }
        }
        //alert('Nenhuma area foi selecionada, favor selecione uma!');
        return false;
    };

    function validaCamposAll() {
        let aux = null;

        aux = validaAreas();
        aux = validaGenero();

        if ($id('input-name').value == "") {
            aux = false;
        }
        if ($id('input-telefone').value == "") {
            aux = false;
        }
        if ($id('input-city').value == "") {
            aux = false;
        }
        if ($id('input-email').value == "") {
            aux = false;
        }
        if ($id('input-textarea').value == "") {
            aux = false;
        }

        return aux;
    };

    //METODOS
    function restauraArrayObjetos() {
        console.log("restaurando");
        arrayRelatorio = new Array();
        arrayRelatorio = JSON.parse(localStorage.getItem("pessoas"));
        console.log(typeof arrayRelatorio);
        if (arrayRelatorio == null) { // Caso não haja conteúdo, iniciamos um vetor vazio
            arrayRelatorio = [];
        }
    };

    function armazenaArrayObjetos(array) {
        console.log("armazenando");
        localStorage.setItem("pessoas", JSON.stringify(array));
        console.log("armazenado com sucesso");
    };

    function cadastra() {
        restauraArrayObjetos();
        arrayRelatorio.push(criaObjeto());
        armazenaArrayObjetos(arrayRelatorio);
        console.log(arrayRelatorio);
        fimCadastro();
    };

    function fimCadastro() {
        window.alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
    };

    function getAreas() {
        let areas = [];
        let elems = document.getElementsByName('interest-group');
        let cont = 0;

        for (i in elems) {
            if (elems[i].checked) {
                areas[cont] = elems[i].value;
                cont++;
            }
        }
        return areas;
    };

    function getGenero() {
        if ($id('input-gender-masculine').checked) {
            return "Masculino";
        }
        if ($id('input-gender-feminine').checked) {
            return "Feminino";
        }
    };

    //VERIFICAR
    function criaObjeto() {
        let nome = $id('input-name').value;
        let genero = getGenero();
        let telefone = $id('input-telefone').value;
        let cidade = $id('input-city').value;
        let email = $id('input-email').value;
        let areas = getAreas();
        let mensagem = $id('input-textarea').value;
        let pessoaObj = new Pessoa(nome, genero, telefone, cidade, email, areas, mensagem);

        return pessoaObj;
    };

    //CLASSES OBJETOS
    class Pessoa {
        constructor(nome, genero, telefone, cidade, email, areas, mensagem) {
            this.nome = nome;
            this.genero = genero;
            this.telefone = telefone;
            this.cidade = cidade;
            this.email = email;
            this.areas = areas;
            this.mensagem = mensagem;
        };
    }

})();