/* ==========================================
   INICIALIZAÇÃO
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Esconde todas as sections
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
        section.style.display = "none";
    });

    // Mostra a section que estiver com class="active"
    const sectionInicial = document.querySelector("section.active");
    if (sectionInicial) {
        sectionInicial.style.display = "block";
    }
    carregarResumo();
});


/* ==========================================
   DADOS
========================================== */

// ESCALA HOME OFFICE (SEMANA COMPLETA)

const escalaHomeOffice = {
    1: {
        servidores: ["Hedes", "Vladimir"],
        apd: ["Carlos", "Farlei"]
    },
    2: {
        servidores: ["Philipe"],
        apd: ["Carlos"]
    },
    3: {
        servidores: ["Hedes", "Vladimir"],
        apd: ["Philipe", "Farlei"]
    },
    4: {
        servidores: ["Vladimir"],
        apd: ["Carlos"]
    },
    5: {
        servidores: ["Hedes", "Philipe"],
        apd: ["Farlei"]
    }
};      // Sexta


// FÉRIAS
const dadosFerias = [
    { nome: "Alexandre", inicio: "2026-07-20", fim: "2026-07-29" },
    { nome: "Alexandre", inicio: "2026-09-14", fim: "2026-09-23" },
    { nome: "Alexandre", inicio: "2026-11-10", fim: "2026-11-19" },
    { nome: "Hedes", inicio: "2026-07-06", fim: "2026-07-17" },
    { nome: "Vladimir", inicio: "2026-06-09", fim: "2026-06-18" },
    { nome: "Vladimir", inicio: "2026-11-03", fim: "2026-11-12" },
    { nome: "Philipe", inicio: "2026-08-05", fim: "2026-08-14" },
    { nome: "Philipe", inicio: "2027-01-04", fim: "2027-01-13" },
    { nome: "Farlei", inicio: "2026-07-22", fim: "2026-07-31" },
    { nome: "Farlei", inicio: "2026-09-08", fim: "2026-09-18" },
    { nome: "Carlos", inicio: "2026-05-04", fim: "2026-06-03" },


];

// ANIVERSÁRIOS
const dadosAniversarios = [
    { nome: "Walmir", dia: 15, mes: 1 },
    { nome: "Delson", dia: 17, mes: 1 },
    { nome: "Farlei", dia: 24, mes: 1 },
    { nome: "Marcia", dia: 8, mes: 2 },
    { nome: "Osvaldo", dia: 6, mes: 4 },
    { nome: "Rodrigo", dia: 7, mes: 4 },
    { nome: "Carlos Eduardo", dia: 22, mes: 4 },
    { nome: "Carlos Augusto", dia: 29, mes: 5 },
    { nome: "Fletcher", dia: 22, mes: 6 },
    { nome: "Washingthon", dia: 24, mes: 6 },
    { nome: "Alexandre", dia: 26, mes: 6 },
    { nome: "Vladimir", dia: 4, mes: 7 },
    { nome: "Hedes", dia: 26, mes: 8 },
    { nome: "Flávio", dia: 9, mes: 10 },
    { nome: "Marquinhos", dia: 25, mes: 10 },
    { nome: "Hedes", dia: 23, mes: 11 }
];


/* ==========================================
   CONTROLE DE SECTIONS
========================================== */

function showSection(id) {

    const sections = document.querySelectorAll("main section");

    sections.forEach(section => {
        section.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) {
        target.style.display = "block";
    }

    // Carrega dados conforme a aba
    if (id === "Home_Office") {
        carregarHomeOffice();
    }

    if (id === "Férias") {
        carregarFerias();
    }

    if (id === "Aniversariantes") {
        carregarAniversarios();
    }
}


/* ==========================================
   SUBMENU
========================================== */

function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    if (!submenu) return;
    submenu.classList.toggle("open");
}


/* ==========================================
   SIDEBAR
========================================== */

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
}


/* ==========================================
   HOME OFFICE (SEMANA COMPLETA)
========================================== */

function carregarHomeOffice() {

    const container = document.getElementById("listaHomeOffice");
    if (!container) return;

    container.innerHTML = "";

    const dias = {
        1: "Segunda-feira",
        2: "Terça-feira",
        3: "Quarta-feira",
        4: "Quinta-feira",
        5: "Sexta-feira"
    };

    for (let dia = 1; dia <= 5; dia++) {

        const dados = escalaHomeOffice[dia];

        if (dados) {
            container.innerHTML += `
                <li>
                    <strong>${dias[dia]}:</strong><br>
                    Servidores: ${dados.servidores.join(", ")}<br>
                    APD: ${dados.apd.join(", ")}
                </li>
            `;
        } else {
            container.innerHTML += `<li>${dias[dia]}: Não definido</li>`;
        }
    }
}



/* ==========================================
   FÉRIAS (MÊS ATUAL)
========================================== */

function carregarFerias() {

    const hoje = new Date();
    const mesAtual = hoje.getMonth();

    const lista = document.getElementById("listaFerias");
    if (!lista) return;

    lista.innerHTML = "";

    const filtrados = dadosFerias.filter(p => {
        const inicio = new Date(p.inicio);
        const fim = new Date(p.fim);
        return inicio.getMonth() === mesAtual || fim.getMonth() === mesAtual;
    });

    if (filtrados.length === 0) {
        lista.innerHTML = "<li>Ninguém de férias este mês.</li>";
        return;
    }

    filtrados.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nome} (${p.inicio} até ${p.fim})`;
        lista.appendChild(li);
    });
}


/* ==========================================
   ANIVERSÁRIOS (MÊS ATUAL)
========================================== */

function carregarAniversarios() {

    const mesAtual = new Date().getMonth() + 1;

    const lista = document.getElementById("listaAniversariantes");
    if (!lista) return;

    lista.innerHTML = "";

    const filtrados = dadosAniversarios.filter(p => p.mes === mesAtual);

    if (filtrados.length === 0) {
        lista.innerHTML = "<li>Sem aniversariantes este mês.</li>";
        return;
    }

    filtrados.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nome} - dia ${p.dia}`;
        lista.appendChild(li);
    });
}
const modal = document.getElementById("modalImagem");
const modalImg = document.getElementById("imgModal");
const fechar = document.querySelector(".fechar");

document.querySelectorAll(".imagem-click").forEach(img => {
    img.addEventListener("click", function () {
        modal.style.display = "block";
        modalImg.src = this.src;
    });
});

fechar.onclick = function () {
    modal.style.display = "none";
};

modal.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};
function atualizarAutomaticamente() {

    carregarHomeOffice();
    carregarFerias();
    carregarAniversarios();

    console.log("Dados atualizados automaticamente");
}

// Atualiza ao abrir
atualizarAutomaticamente();

// Atualiza a cada 1 hora (profissional)
setInterval(atualizarAutomaticamente, 60 * 60 * 1000);

function carregarResumo() {

    // HOME OFFICE
    const homeDiv = document.getElementById("homeOfficeResumo");
    const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];

    for (let i = 1; i <= 5; i++) {

        const dados = escalaHomeOffice[i];

        if (dados) {
            homeDiv.innerHTML += `
            <p>
                <strong>${dias[i - 1]}:</strong><br>
                Servidores: ${dados.servidores.join(", ")}<br>
                APD: ${dados.apd.join(", ")}
            </p>
        `;
        } else {
            homeDiv.innerHTML += `<p><strong>${dias[i - 1]}:</strong> Não definido</p>`;
        }
    }

    // FÉRIAS
    const feriasDiv = document.getElementById("feriasResumo");
    if (feriasDiv) {
        const mesAtual = new Date().getMonth();

        const filtrados = dadosFerias.filter(p => {
            const inicio = new Date(p.inicio);
            const fim = new Date(p.fim);
            return inicio.getMonth() === mesAtual || fim.getMonth() === mesAtual;
        });

        if (filtrados.length === 0) {
            feriasDiv.innerHTML = "<p>Ninguém de férias</p>";
        } else {
            feriasDiv.innerHTML = filtrados.map(p =>
                `<p>${p.nome}</p>`
            ).join("");
        }
    }

    // ANIVERSÁRIOS
    const anivDiv = document.getElementById("aniversariosResumo");
    if (anivDiv) {
        const mesAtual = new Date().getMonth() + 1;

        const filtrados = dadosAniversarios.filter(p => p.mes === mesAtual);

        if (filtrados.length === 0) {
            anivDiv.innerHTML = "<p>Nenhum</p>";
        } else {
            anivDiv.innerHTML = filtrados.map(p =>
                `<p>${p.nome} (${p.dia})</p>`
            ).join("");
        }
    }
}