/* ==========================================
   INICIALIZAÇÃO
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Esconde todas as sections
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
        section.style.display = "none";
    });

    // Mostra a section inicial
    const sectionInicial = document.querySelector("section.active");
    if (sectionInicial) {
        sectionInicial.style.display = "block";
    }

    carregarResumo();
    atualizarAutomaticamente();
    gerarPeriodoSemana();

    /* ==========================================
       MODAL IMAGEM (AGORA SEGURO)
    ========================================== */

    const modal = document.getElementById("modalImagem");
    const modalImg = document.getElementById("imgModal");
    const fechar = document.querySelector(".fechar");

    document.querySelectorAll(".imagem-click").forEach(img => {
        img.addEventListener("click", function () {
            if (modal && modalImg) {
                modal.style.display = "block";
                modalImg.src = this.src;
            }
        });
    });

    if (fechar) {
        fechar.onclick = function () {
            modal.style.display = "none";
        };
    }

    if (modal) {
        modal.onclick = function (e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        };
    }

});


/* ==========================================
   DADOS
========================================== */

const escalaHomeOffice = {
    1: { servidores: ["Hedes", "Vladimir"], apd: ["Carlos"] },
    2: { servidores: ["Philipe"], apd: ["Farlei"] },
    3: { servidores: ["Hedes", "Vladimir", "Philipe"], apd: ["Carlos", "Farlei"] },
    4: { servidores: ["Vladimir"], apd: ["Carlos"] },
    5: { servidores: ["Hedes", "Philipe"], apd: ["Farlei"] }
};

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
    { nome: "Carlos", inicio: "2026-05-04", fim: "2026-06-03" }
];

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

    try {

        document.querySelectorAll("main section").forEach(section => {
            section.style.display = "none";
            section.classList.remove("active");
        });

        const target = document.getElementById(id);

        if (!target) {
            console.error("Section não encontrada:", id);
            return;
        }

        target.style.display = "block";
        target.classList.add("active");

    } catch (error) {
        console.error("Erro ao trocar section:", error);
    }
}


/* ==========================================
   SUBMENU
========================================== */

function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    if (submenu) submenu.classList.toggle("open");
}


/* ==========================================
   SIDEBAR
========================================== */

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("collapsed");
}


/* ==========================================
   HOME OFFICE
========================================== */

function carregarHomeOffice() {

    const container = document.getElementById("listaHomeOffice");
    if (!container) return;

    container.innerHTML = "";

    const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

    for (let i = 1; i <= 5; i++) {
        const dados = escalaHomeOffice[i];

        container.innerHTML += `
            <li>
                <strong>${dias[i - 1]}:</strong><br>
                <b>Servidores:</b> ${dados?.servidores.join(", ") || "—"}<br>
                <b>APD:</b> ${dados?.apd.join(", ") || "—"}
            </li>
        `;
    }
}


/* ==========================================
   FÉRIAS
========================================== */

function carregarFerias() {

    const lista = document.getElementById("listaFerias");
    if (!lista) return;

    lista.innerHTML = "";

    const mesAtual = new Date().getMonth();

    const filtrados = dadosFerias.filter(p => {
        const inicio = new Date(p.inicio);
        const fim = new Date(p.fim);
        return inicio.getMonth() === mesAtual || fim.getMonth() === mesAtual;
    });

    if (!filtrados.length) {
        lista.innerHTML = "<li>Ninguém de férias este mês.</li>";
        return;
    }

    filtrados.forEach(p => {
        lista.innerHTML += `<li>${p.nome} (${p.inicio} até ${p.fim})</li>`;
    });
}


/* ==========================================
   ANIVERSÁRIOS
========================================== */

function carregarAniversarios() {

    const lista = document.getElementById("listaAniversariantes");
    if (!lista) return;

    lista.innerHTML = "";

    const mesAtual = new Date().getMonth() + 1;

    const filtrados = dadosAniversarios.filter(p => p.mes === mesAtual);

    if (!filtrados.length) {
        lista.innerHTML = "<li>Sem aniversariantes este mês.</li>";
        return;
    }

    filtrados.forEach(p => {
        lista.innerHTML += `<li>${p.nome} - dia ${p.dia}</li>`;
    });
}


/* ==========================================
   ATUALIZAÇÃO AUTOMÁTICA
========================================== */

function atualizarAutomaticamente() {
    carregarHomeOffice();
    carregarFerias();
    carregarAniversarios();
}

// Atualiza a cada 1h
setInterval(atualizarAutomaticamente, 60 * 60 * 1000);


/* ==========================================
   RESUMO (HOME)
========================================== */

function carregarResumo() {

    const homeDiv = document.getElementById("homeOfficeResumo");
    const feriasDiv = document.getElementById("feriasResumo");
    const anivDiv = document.getElementById("aniversariosResumo");

    if (!homeDiv || !feriasDiv || !anivDiv) return;

    homeDiv.innerHTML = "";
    feriasDiv.innerHTML = "";
    anivDiv.innerHTML = "";

    const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];

    for (let i = 1; i <= 5; i++) {
        const dados = escalaHomeOffice[i];

        homeDiv.innerHTML += `
        <p>
        <strong>${dias[i - 1]}:</strong><br>
        <b>Servidores:</b> ${dados?.servidores.join(", ") || "—"}<br>
        <b>APD:</b> ${dados?.apd.join(", ") || "—"}
        </p>
        `;
    }

    const mesAtual = new Date().getMonth();

    const ferias = dadosFerias.filter(p => {
        const inicio = new Date(p.inicio);
        const fim = new Date(p.fim);
        return inicio.getMonth() === mesAtual || fim.getMonth() === mesAtual;

        function formatarData(data) {
            return data.toLocaleDateString("pt-BR");
        }

        function obterSemanaAtual() {
            const hoje = new Date();

            const diaSemana = hoje.getDay();
            const diff = hoje.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);

            const segunda = new Date(hoje.setDate(diff));
            const sexta = new Date(segunda);
            sexta.setDate(segunda.getDate() + 4);

            return {
                inicio: formatarData(segunda),
                fim: formatarData(sexta)
            };
        }
        

    });

    feriasDiv.innerHTML = ferias.length
        ? ferias.map(p => `<p>${p.nome}</p>`).join("")
        : "<p>Ninguém de férias</p>";

    const aniversarios = dadosAniversarios.filter(p => p.mes === mesAtual + 1);

    anivDiv.innerHTML = aniversarios.length
        ? aniversarios.map(p => `<p>${p.nome} (${p.dia})</p>`).join("")
        : "<p>Nenhum</p>";
}

function gerarPeriodoSemana() {

    const hoje = new Date();

    const diaSemana = hoje.getDay(); // 0 (Dom) a 6 (Sáb)
    const diffSegunda = (diaSemana === 0 ? -6 : 1 - diaSemana);

    const segunda = new Date(hoje);
    segunda.setDate(hoje.getDate() + diffSegunda);

    const sexta = new Date(segunda);
    sexta.setDate(segunda.getDate() + 4);

    const formatar = (data) => {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const periodo = `(${formatar(segunda)} a ${formatar(sexta)})`;

    const div = document.getElementById("periodoEscala");
    if (div) div.innerHTML = `<strong>${periodo}</strong>`;
}