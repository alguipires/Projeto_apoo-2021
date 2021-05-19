(function () {
    let $id = function (id) {
        return document.getElementById(id);
    };


    console.log("restaurando");

    let relaPessoas = JSON.parse(localStorage.getItem("pessoas"));
    if (relaPessoas == null) {
        relaPessoas = [];
    }

    //listaCurriculos();

    (function listaCurriculos() {
        let retorno = "";

        if (relaPessoas.length > 0) {
            for (let i = 0; i < relaPessoas.length; i++) {
                let auxArrea = "";

                for (let j = 0; j < relaPessoas[i].areas.length; j++) {
                    auxArrea += relaPessoas[i].areas[j] + "; ";
                }

                retorno += `<div class="row section blue">
                <div id="relatorios-curriculo" class="container about"><div class="col s12 flow-text">
                <p>
                    Nome: <span id="span-name">${relaPessoas[i].nome}</span> Genero: <span id="span-genre">${relaPessoas[i].genero}</span>
                    Telefone: <span id="span-numero">${relaPessoas[i].telefone}</span> Cidade: <span id="span-city">${relaPessoas[i].cidade}</span>
                    E-mail: <span id="span-email">${relaPessoas[i].email}</span>
                </p>
                <p>
                    Área de interesse: <span id="span-areas">${auxArrea}</span>
                </p>
                <p>
                    Mensagem: <span id="span-msg">${relaPessoas[i].mensagem}</span>
                </p>
                </div></div></div>`;
            }
        } else {
            retorno = `<div class="row section blue">
            <div id="relatorios-curriculo" class="container about"><div class="col s12 flow-text">
            <p>Não há curriculos cadastrados</p></div></div></div>`;
        }
        console.log(retorno);
        console.log(typeof retorno);

        $('#tudo').append(retorno);
    })();
})();