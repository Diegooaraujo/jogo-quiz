const questions = [
    {
        perguntas: "Qual método cria um novo elemento HTML (tipo: 'me forja um <div> do nada')?",
        opcoes: ["createElement", "createNode", "setAttribute"],
        respCorreta: "createElement"
    },
    {
        perguntas: "Qual dessas opções seleciona o primeiro elemento que bate com um seletor CSS (a.k.a 'o primeiro que aparecer')?",
        opcoes: ["querySelector", "querySelectorAll", "getElementById"],
        respCorreta: "querySelector"
    },
    {
        perguntas: "Qual método seleciona um elemento pelo ID?",
        opcoes: ["querySelector", "getElementById", "addEventListener"],
        respCorreta: "getElementById"
    },
    {
        perguntas: "Qual evento detecta o clique do mouse?",
        opcoes: ["mouseover", "click", "mouseout"],
        respCorreta: "click"
    },
    {
        perguntas: "Qual método adiciona um novo elemento na árvore DOM?",
        opcoes: ["createTextNode", "appendChild", "setAttribute"],
        respCorreta: "appendChild"
    }
];
const questions2 = [
    {
        perguntas: "Qual método retorna uma lista de elementos com a mesma tag?",
       opcoes: ["getElementById", "getElementsByTagName", "querySelector"],
        respCorreta: "getElementsByTagName"
    },
    {
        perguntas: "Qual propriedade altera o conteúdo de texto de um elemento?",
       opcoes: ["innerHTML", "textContent", "className"],
        respCorreta: "textContent"
    },
    {
        perguntas: "Qual método adiciona uma classe a um elemento?",
       opcoes: ["setAttribute", "addClass", "classList.add"],
        respCorreta: "classList.add"
    },
    {
        perguntas: "Qual atributo define o tipo de um input?",
       opcoes: ["class", "type", "name"],
        respCorreta: "type"
    },
    {
        perguntas: "Qual método remove um nó filho de um elemento?",
        opcoes: ["removeChild", "deleteElement", "clearChild"],
        respCorreta: "removeChild"
    }
];
const questions3 = [
    {
        perguntas: "Qual palavra-chave cria uma função em JavaScript?",
       opcoes: ["function", "def", "func"],
        respCorreta: "function"
    },
    {
        perguntas: "Como se declara uma variável que pode mudar?",
       opcoes: ["const", "var", "define"],
        respCorreta: "var"
    },
    {
        perguntas: "Qual operador é usado para comparar valores e tipo?",
       opcoes: ["==", "=", "==="],
        respCorreta: "==="
    },
    {
        perguntas: "Qual tipo de dado representa verdadeiro ou falso?",
       opcoes: ["string", "boolean", "number"],
        respCorreta: "boolean"
    },
    {
        perguntas: "Qual método repete uma função para cada item de um array?",
        opcoes: ["map", "forEach", "filter"],
        respCorreta: "forEach"
    }
];
let questoesAtuais = [];
let numQuestao = 0;
let respCorretas = 0;
let respErradas = 0;



const container = document.querySelector("#quiz-container");



function mostrarQuestao(index, repositorio) {


    const questoesConteiner = document.getElementById("questoes");
    questoesConteiner.innerHTML = ""; // Limpa conteúdo anterior

    const q = repositorio[index];

    // Cria elemento da pergunta
    const questaoEl = document.createElement("div");
    questaoEl.className = "pergunta";
    const questaoText = document.createTextNode(q.perguntas);
    questaoEl.appendChild(questaoText);
    questoesConteiner.appendChild(questaoEl);

    // Cria as opções
    q.opcoes.forEach(optionText => {
        const opcao = document.createElement("div");
        opcao.className = "opcao";
        opcao.textContent = optionText;

        // Eventos mouseover e mouseout
        opcao.addEventListener("mouseover", () => {
            opcao.style.fontWeight = "bold";
        });
        opcao.addEventListener("mouseout", () => {
            opcao.style.fontWeight = "normal";
        });


        // Evento de click
        //verificar resposta 


        opcao.addEventListener("click", () => {
            const todasOpcoes = document.querySelectorAll(".opcao");
            todasOpcoes.forEach(opt => opt.style.pointerEvents = "none"); //desativar os cliques para as outras opções
            if (optionText === q.respCorreta) {
                opcao.classList.add("correct");
                respCorretas++;

            } else {
                opcao.classList.add("wrong");
                respErradas++
            }


            // Espera 1s para passar pra próxima
            trocarQuestao();

        });
        questoesConteiner.appendChild(opcao);
    });
}

function mensagemFinal() {
    const msg = document.createElement("div");
    msg.textContent = "Parabéns! Você completou o quiz!";
    msg.style.marginTop = "20px";
    msg.style.fontSize = "18px";
    msg.style.color = "green";

    const acertos = document.createElement("div")

    acertos.textContent = `você acertou ${respCorretas} de 5 perguntas`;


    const jogarNovamente = document.createElement("button");
    jogarNovamente.textContent = "Jogue novamente";
    jogarNovamente.addEventListener("click", () => {
        numQuestao = 0;
        respCorretas =0;
        respErradas =0;
        
        start()
        container.removeChild(acertos)
        container.removeChild(msg)
        container.removeChild(jogarNovamente)
    })

    const questionBox = document.getElementById("question-box");

    container.insertBefore(acertos, questionBox);
    container.insertBefore(msg, acertos); // insere antes da caixa de perguntas
    container.appendChild(jogarNovamente)
    conquista();
    // questionBox.innerHTML = ""; // limpa as perguntas
}
function trocarQuestao() {

    setTimeout(() => {
        numQuestao++;
        if (numQuestao < questoesAtuais.length) {
            mostrarQuestao(numQuestao, questoesAtuais);
        } else {
            mensagemFinal();
        }
    }, 1000);
}

// Inicia o quiz
// mostrarQuestao(numQuestao);
start()

function start() {
    const gift = document.querySelector(".gift")
    gift.innerHTML = "";
    const iniciar = document.querySelector(".inicio");
    iniciar.classList.remove("hide")
    container.classList.add("hide")
    const rep = document.getElementById("repositorios");
    const btn = document.querySelector(".btnEnviar")
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const repValor = rep.value
        
        iniciar.classList.add("hide")
        container.classList.remove("hide")
        if (repValor == "1") {
            questoesAtuais = questions
        }
        else if (repValor == "2") {
            questoesAtuais = questions2
        }
        else {
            questoesAtuais = questions3
        }
        mostrarQuestao(numQuestao, questoesAtuais)

    })
    
}

function conquista(){
     const gift = document.querySelector(".gift")
    if(respCorretas == 0 ){
       
        gift.innerHTML = `<h3>${nivel0[Math.floor(Math.random()*nivel0.length) ]}</h3>`;
       
    }else if(respCorretas == 1){
        gift.innerHTML = `<h3>${nivel1[Math.floor(Math.random()*nivel0.length)]}</h3>`;
    }
    else if(respCorretas == 2){
        gift.innerHTML = `<h3>${nivel2[Math.floor(Math.random()*nivel0.length)]}</h3>`;
    }
    else if(respCorretas == 3){
        gift.innerHTML = `<h3>${nivel3[Math.floor(Math.random()*nivel0.length)]}</h3>`;
    }
    else if(respCorretas == 4){
        gift.innerHTML = `<h3>${nivel4[Math.floor(Math.random()*nivel0.length)]}</h3>`;
    }
    else{
        gift.innerHTML = `<h3>${nivel5[Math.floor(Math.random()*nivel0.length)]}</h3>`;
    }




}
const nivel0 = [
    "Se o JavaScript fosse uma briga... você só teria apanhado.",
    "Você errou tudo. Nem o console.log te reconheceria.",
    "Pior que isso, só esquecer de fechar uma tag.",
    "Você programou como quem escreve com luva de boxe.",
    "Se fosse pra desenhar código com giz de cera... ainda ficava torto."
];
const nivel1 = [
    "Se fosse pra te dar uma nota, a sua seria DÓ. Bem desafinado no JS!",
    "Acertou uma... provavelmente sem querer.",
    "Você tá mais perdido que variável sem valor.",
    "Sabe aquele amigo que só atrapalha no trabalho em grupo? Então...",
    "Um acerto... foi bug ou sorte de principiante?"
];
const nivel2 = [
    "Quase lá! Só faltou saber metade do conteúdo…",
    "Dois acertos? Tá indo, mas ainda precisa de um empurrão (e um curso).",
    "Você tá na fase 'sei onde clica, mas não sei o que faz'.",
    "Acertou o suficiente pra parecer que tentou. Só parece.",
    "Dois acertos: já dá pra criar um 'Hello World' sem colar."
];
const nivel3 = [
    "Parabéns! Alguém sabe o básico. Só não vale parar por aqui, hein!",
    "Você já pode corrigir os bugs... dos outros iniciantes.",
    "Dá pra começar a conversar com o console sem passar vergonha.",
    "Você é tipo o console: erra às vezes, mas entrega o que pode.",
    "Sabe o suficiente pra se enrolar com confiança. Parabéns!"
];
const nivel4 = [
    "Faltou só um acerto pra virar referência nos grupos de dev.",
    "Você DOMina quase tudo! Faltou só aquele detalhe...",
    "Sua lógica tá afiada, só escorregou no final!",
    "Você tá a um passo de fazer app de verdade (sem copiar do Stack Overflow).",
    "Muito bom! Só faltou ler aquele último parágrafo da apostila."
];
const nivel5 = [
    "MITO! Se JavaScript fosse batalha, você era o chefão final.",
    "Você acertou tudo! Já pode corrigir os bugs do sistema da NASA (ou pelo menos fingir).",
    "Você DOMina tudo. Até o console ficou com inveja.",
    "Seu nível de acerto é mais raro que deploy sem bug na sexta-feira.",
    "Você é o tipo de dev que usa dark mode até no Excel. Respeito demais!",
    
];