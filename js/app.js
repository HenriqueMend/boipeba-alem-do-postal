/* BOIPEBA: Além do Postal — navegação e montagem das páginas
   Endereços:
     #inicio  (ou vazio) → página inicial
     #album / #projeto   → página inicial, rolando até a seção
     #<slug>             → página da história (destino do QR Code)
*/
(function () {
  "use strict";

  var HISTORIAS = (window.HISTORIAS || []).slice().sort(function (a, b) { return a.numero - b.numero; });
  var app = document.getElementById("app");
  var SITE = "BOIPEBA: Além do Postal";
  var SECOES = { album: 1, projeto: 1, linha: 1 };
  var SELOS = ["aratu", "barco", "caju", "casa", "coqueiro", "farol", "hibisco", "igreja", "palafita", "tambor"];
  var GIROS = [-1.6, 1.2, -0.6, 1.8, -1.2, 0.8, -1.8, 1.4, -0.4];
  var estado = { filtro: "Todos", vista: null };
  var uid = 0;

  /* ---------- utilidades ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function num(n) { return "Nº " + (n < 10 ? "0" + n : n); }
  function giro(i) { return GIROS[i % GIROS.length] + "deg"; }
  function selo(nome, extra) {
    if (SELOS.indexOf(nome) < 0) nome = "casa";
    return '<span class="selo ' + (extra || "") + '" style="-webkit-mask-image:url(img/selos/' + nome + '.png);mask-image:url(img/selos/' + nome + '.png)" aria-hidden="true"></span>';
  }
  function publicadas() { return HISTORIAS.filter(function (h) { return h.publicada; }); }

  /* carimbo postal em SVG, com textura de tinta */
  function carimbo(o) {
    var id = "c" + (++uid);
    var largura = o.ondas ? 380 : 200;
    var ondas = "";
    if (o.ondas) {
      for (var k = 0; k < 5; k++) {
        var y = 52 + k * 24;
        ondas += '<path d="M205 ' + y + ' q 21 -11 42 0 t 42 0 t 42 0 t 42 0" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>';
      }
    }
    return (
      '<svg viewBox="0 0 ' + largura + ' 200" aria-hidden="true">' +
        '<defs>' +
          '<filter id="' + id + 'f" x="-10%" y="-10%" width="120%" height="120%">' +
            '<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="' + (uid * 7) + '" result="r"/>' +
            '<feDisplacementMap in="SourceGraphic" in2="r" scale="4" result="d"/>' +
            '<feTurbulence type="fractalNoise" baseFrequency=".45" numOctaves="2" seed="' + (uid * 3) + '" result="m"/>' +
            '<feColorMatrix in="m" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.75" result="mm"/>' +
            '<feComposite in="d" in2="mm" operator="in"/>' +
          '</filter>' +
          '<path id="' + id + 't" d="M26 100 a74 74 0 1 1 148 0"/>' +
          '<path id="' + id + 'b" d="M16 100 a84 84 0 0 0 168 0"/>' +
        '</defs>' +
        '<g filter="url(#' + id + 'f)">' +
          '<circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" stroke-width="5"/>' +
          '<circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" stroke-width="3"/>' +
          '<text font-size="15" fill="currentColor"><textPath href="#' + id + 't" startOffset="50%" text-anchor="middle">' + esc(o.topo) + '</textPath></text>' +
          '<text font-size="15" fill="currentColor"><textPath href="#' + id + 'b" startOffset="50%" text-anchor="middle">' + esc(o.base) + '</textPath></text>' +
          '<text x="100" y="' + (o.linha2 ? 96 : 110) + '" font-size="' + (o.linha2 ? 26 : 34) + '" text-anchor="middle" fill="currentColor">' + esc(o.centro) + '</text>' +
          (o.linha2 ? '<text x="100" y="124" font-size="17" text-anchor="middle" fill="currentColor">' + esc(o.linha2) + '</text>' : "") +
          ondas +
        '</g>' +
      '</svg>'
    );
  }

  /* ---------- cartão do álbum ---------- */
  function cartao(h, i) {
    var tema = "t-" + (h.cor || "azul");
    if (!h.publicada) {
      return (
        '<div class="postal postal--lacrado ' + tema + '" style="--rot:' + giro(i) + '" aria-label="' + esc(num(h.numero)) + ', em breve">' +
          '<div class="postal__selo serrilha">' +
            '<div class="postal__foto"><div>' + selo(h.selo) + '<br><span class="lacre">Em breve</span></div>' +
              '<span class="postal__num">' + num(h.numero) + '</span></div>' +
            '<div class="postal__info"><div><h3>A caminho</h3><p>' + esc(h.tema || "Nova história") + '</p></div></div>' +
          '</div>' +
        '</div>'
      );
    }
    return (
      '<a class="postal ' + tema + '" href="#' + esc(h.slug) + '" style="--rot:' + giro(i) + '">' +
        '<div class="postal__selo serrilha">' +
          '<div class="postal__foto">' +
            '<img src="' + esc(h.capa) + '" alt="">' +
            '<span class="postal__num">' + num(h.numero) + '</span>' +
          '</div>' +
          '<div class="postal__info">' +
            '<div><h3>' + esc(h.titulo) + '</h3><p>' + esc(h.tema) + '</p></div>' +
            selo(h.selo) +
          '</div>' +
        '</div>' +
        '<div class="postal__carimbo carimbo">' + carimbo({ topo: "ILHA DE BOIPEBA", base: "ALÉM DO POSTAL", centro: num(h.numero), linha2: "2026", ondas: true }) + '</div>' +
      '</a>'
    );
  }

  /* =========================================================
     PÁGINA INICIAL
     ========================================================= */
  function paginaInicial() {
    var temas = ["Todos"];
    HISTORIAS.forEach(function (h) { if (h.tema && temas.indexOf(h.tema) < 0) temas.push(h.tema); });
    var pub = publicadas().length;
    var breve = HISTORIAS.length - pub;
    var fitaItens = [["M'boi pewa", "coqueiro"], ["Tupinambás", "farol"], ["Mandioca", "caju"], ["Mariscagem", "aratu"], ["Velha Boipeba", "igreja"], ["Monte Alegre", "casa"], ["Zambiapunga", "tambor"], ["Bumba Meu Boi", "hibisco"], ["Iemanjá", "barco"], ["Palafitas", "palafita"]];
    var fita = fitaItens.map(function (f) { return '<span class="fita__item">' + esc(f[0]) + " " + selo(f[1]) + "</span>"; }).join("");

    app.innerHTML =
      '<div class="view">' +
      /* hero */
      '<section class="hero" aria-label="Apresentação">' +
        '<div class="hero__foto"><img src="img/foto-casa-praia.jpg" alt="Casa de parede branca e janela azul na beira da praia de Boipeba, com barcos ao fundo"></div>' +
        '<div class="hero__conteudo">' +
          '<h1 class="hero__titulo">' +
            '<span class="boi"><span>Boi</span><span>pe</span><span>ba</span>' +
              '<span class="hero__selo hero__selo--1">' + selo("barco") + '</span>' +
              '<span class="hero__selo hero__selo--2">' + selo("casa") + '</span>' +
            '</span>' +
            '<span class="alem">Além do<br>postal</span>' +
          '</h1>' +
          '<div class="hero__lado">' +
            '<div class="hero__carimbo carimbo">' + carimbo({ topo: "BOIPEBA · BAHIA · BRASIL", base: "HISTÓRIAS DE UM POVO", centro: "2026" }) + '</div>' +
            '<div>' +
              '<p class="hero__frase">Cada cartão-postal guarda uma história da ilha. Escaneie, leia, escute quem vive aqui.</p>' +
              '<a class="botao" href="#album">Ver as histórias ↓</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +
      /* fita */
      '<div class="fita" aria-hidden="true"><div class="fita__trilho">' + fita + fita + '</div></div>' +
      /* projeto */
      '<section class="projeto" id="projeto">' +
        '<div class="envelope">' +
          '<div class="projeto__grid">' +
            '<div><p class="rotulo">O projeto</p><h2 class="display">Mais que <em>paisagem</em>: gente.</h2></div>' +
            '<div class="projeto__texto">' +
              '<p>Boipeba: Além do Postal busca valorizar a cultura, as tradições e o cotidiano da Ilha de Boipeba, mostrando histórias que vão além das paisagens turísticas.</p>' +
              '<p>A proposta é ressignificar os cartões-postais, transformando-os em peças que representam a identidade e as vivências da população local. Cada postal tem um QR Code que leva a uma história — e aqui ela continua.</p>' +
            '</div>' +
          '</div>' +
          '<ol class="passos">' +
            passo("t-azul", "-1.4deg", "hibisco", "Encontre um postal") +
            passo("t-verde", "1deg", "farol", "Escaneie o QR Code") +
            passo("t-vermelho", "-0.6deg", "aratu", "Conheça a história") +
          '</ol>' +
        '</div>' +
      '</section>' +
      /* álbum */
      '<section class="album" id="album">' +
        '<div class="envelope">' +
          '<div class="album__cab">' +
            '<div><p class="rotulo">Coleção</p><h2 class="display">Álbum de <span>histórias</span></h2>' +
              '<p class="album__conta">' + pad(pub) + ' postais publicados' + (breve ? " · " + pad(breve) + " a caminho" : "") + '</p></div>' +
            '<div class="filtros" role="group" aria-label="Filtrar por tema">' +
              temas.map(function (t) { return '<button class="filtro" type="button" data-filtro="' + esc(t) + '" aria-pressed="' + (t === estado.filtro) + '">' + esc(t) + "</button>"; }).join("") +
            '</div>' +
          '</div>' +
          '<div class="grade" id="grade"></div>' +
        '</div>' +
      '</section>' +
      linhaDoTempo() +
      '</div>';

    desenhaGrade();
    document.title = SITE;
  }
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function linhaDoTempo() {
    var marcos = window.LINHA_DO_TEMPO || [];
    if (!marcos.length) return "";
    var porSlug = {};
    HISTORIAS.forEach(function (h) { porSlug[h.slug] = h; });
    return (
      '<section class="linha" id="linha">' +
        '<div class="envelope">' +
          '<div class="linha__cab">' +
            '<div><p class="rotulo">Linha do tempo</p><h2 class="display">Uma ilha antes do postal</h2></div>' +
            '<p class="linha__intro">Antes de virar destino turístico, Boipeba já tinha uma longa história: povos indígenas, colonização portuguesa, influência africana e modos de vida ligados ao mar e à terra. Toque num marco para abrir o postal.</p>' +
          '</div>' +
        '</div>' +
        '<ol class="linha__trilho">' +
          marcos.map(function (m, i) {
            var h = porSlug[m.slug];
            var tema = "t-" + ((h && h.cor) || "azul");
            var inner =
              '<span class="marco__ponto" aria-hidden="true"></span>' +
              '<span class="marco__selo serrilha">' +
                '<span class="marco__ano">' + esc(m.ano) + '</span>' +
                '<span class="marco__texto">' + esc(m.texto) + '</span>' +
                (h && h.publicada ? '<span class="marco__link">Postal ' + num(h.numero) + ' →</span>' : '') +
              '</span>';
            return '<li class="marco ' + tema + '" style="--rot:' + giro(i + 2) + '">' +
              (h && h.publicada ? '<a href="#' + esc(h.slug) + '">' + inner + '</a>' : inner) + '</li>';
          }).join("") +
        '</ol>' +
      '</section>'
    );
  }
  function passo(cor, rot, s, titulo) {
    return '<li class="passo ' + cor + ' serrilha" style="--rot:' + rot + '"><div class="passo__miolo">' + selo(s) +
      '<span class="passo__num"></span><h3>' + esc(titulo) + '</h3></div></li>';
  }
  function desenhaGrade() {
    var grade = document.getElementById("grade");
    if (!grade) return;
    var lista = HISTORIAS.filter(function (h) { return estado.filtro === "Todos" || h.tema === estado.filtro; });
    grade.innerHTML = lista.length
      ? lista.map(cartao).join("")
      : '<p class="grade__vazio">Nenhum postal com esse tema ainda.</p>';
    document.querySelectorAll(".filtro").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-filtro") === estado.filtro ? "true" : "false");
    });
  }

  /* =========================================================
     PÁGINA DA HISTÓRIA
     ========================================================= */
  function corpoModelo(h) {
    var foto = (h.galeria && h.galeria[0]) || { src: h.capa };
    return [
      { tipo: "paragrafo", texto: "Este é um texto provisório. Aqui vai entrar o início da história: quem é a pessoa que conta, onde ela vive e o que esse lugar guarda. O primeiro parágrafo ganha uma letra capitular na cor do postal." },
      { tipo: "paragrafo", texto: "No segundo parágrafo a narrativa se desenvolve. O texto usa a fonte de máquina de escrever, que remete à escrita dos cartões-postais, numa coluna confortável para ler no celular — afinal, é por ele que a maioria das pessoas vai chegar aqui, escaneando o QR Code." },
      { tipo: "citacao", texto: "Aqui entra uma fala marcante de quem conta a história.", autor: h.quemConta || "Nome de quem conta" },
      { tipo: "paragrafo", texto: "Depois da citação, o texto continua. É possível intercalar parágrafos, intertítulos, falas em destaque e fotografias, na ordem que a história pedir." },
      { tipo: "foto", src: foto.src, legenda: "Fotografias podem entrar no meio do texto, com legenda." },
      { tipo: "intertitulo", texto: "Um intertítulo" },
      { tipo: "paragrafo", texto: "Um intertítulo ajuda a dividir histórias mais longas em partes. Ao final, a página mostra a galeria de fotos, os créditos e outros postais para continuar a viagem pela ilha." }
    ];
  }
  function bloco(b, i) {
    switch (b.tipo) {
      case "citacao":
        return '<figure class="citacao"><blockquote><p>' + esc(b.texto) + "</p>" + (b.autor ? "<cite>— " + esc(b.autor) + "</cite>" : "") + "</blockquote></figure>";
      case "foto":
        return '<figure class="foto-texto" style="--rot:' + (i % 2 ? "1deg" : "-1.2deg") + '"><div class="serrilha"><img src="' + esc(b.src) + '" alt="' + esc(b.legenda || "") + '" loading="lazy" data-lupa data-legenda="' + esc(b.legenda || "") + '"></div>' +
          (b.legenda ? "<figcaption>" + esc(b.legenda) + "</figcaption>" : "") + "</figure>";
      case "intertitulo":
        return "<h2>" + esc(b.texto) + "</h2>";
      default:
        return "<p>" + esc(b.texto) + "</p>";
    }
  }
  function credito(rotulo, valor) {
    return valor ? '<div><p class="rotulo">' + esc(rotulo) + "</p><p>" + esc(valor) + "</p></div>" : "";
  }

  function paginaHistoria(h) {
    var tema = "t-" + (h.cor || "azul");
    var corpo = (h.corpo && h.corpo.length ? h.corpo : corpoModelo(h)).map(bloco).join("");
    var galeria = h.galeria || [];
    var c = h.creditos || {};
    var outras = publicadas().filter(function (x) { return x.slug !== h.slug; });
    var idx = HISTORIAS.indexOf(h);
    outras = outras.slice(idx).concat(outras.slice(0, idx)).slice(0, 3);

    app.innerHTML =
      '<article class="view ' + tema + '">' +
        '<header class="hist-hero">' +
          selo(h.selo, "hist-hero__selo-fundo") +
          '<div class="envelope hist-hero__grid">' +
            '<div>' +
              '<a class="voltar" href="#album">← Álbum de histórias</a>' +
              '<div class="hist-hero__meta"><span class="etiqueta etiqueta--cheia">Postal ' + num(h.numero) + '</span><span class="etiqueta">' + esc(h.tema) + "</span></div>" +
              '<h1 class="display">' + esc(h.titulo) + "</h1>" +
              (h.subtitulo ? '<p class="hist-hero__sub">' + esc(h.subtitulo) + "</p>" : "") +
            "</div>" +
            '<div class="hist-hero__foto">' +
              '<div class="serrilha"><img src="' + esc(h.capa) + '" alt="' + esc(h.titulo) + '" data-lupa data-legenda="' + esc(h.titulo) + '"></div>' +
              '<div class="carimbo">' + carimbo({ topo: "ILHA DE BOIPEBA", base: "ALÉM DO POSTAL", centro: num(h.numero), linha2: "2026" }) + "</div>" +
            "</div>" +
          "</div>" +
        "</header>" +

        '<section class="verso envelope" aria-label="Verso do postal">' +
          '<div class="verso__cartao">' +
            '<div class="verso__msg">' +
              '<p class="rotulo">Verso do postal</p>' +
              '<p class="resumo">' + esc(h.resumo) + "</p>" +
              '<p class="verso__assina">— ' + esc(h.quemConta || "") + ' <span>· ' + esc(h.local || "Ilha de Boipeba") + "</span></p>" +
            "</div>" +
            '<div class="verso__lado">' +
              '<div class="verso__topo">' +
                '<div class="carimbo">' + carimbo({ topo: "BOIPEBA · BA", base: "CAIRU · BAHIA", centro: num(h.numero) }) + "</div>" +
                '<div class="verso__selo serrilha"><div class="verso__selo-miolo">' + selo(h.selo) + "</div></div>" +
              "</div>" +
              '<ul class="endereco">' +
                "<li><small>Para</small>Você, que encontrou este postal</li>" +
                "<li>Ilha de Boipeba</li>" +
                "<li>Cairu — Bahia — Brasil</li>" +
              "</ul>" +
              (h.provisorio ? '<span class="provisorio">Conteúdo provisório</span>' : "") +
            "</div>" +
          "</div>" +
        "</section>" +

        '<div class="texto">' + corpo + "</div>" +

        (galeria.length
          ? '<section class="galeria-secao envelope" aria-label="Galeria de fotos"><h2 class="display">Mais retratos</h2><div class="galeria">' +
              galeria.map(function (g, i) {
                return '<figure style="--rot:' + giro(i + h.numero) + '"><button type="button" data-lupa-btn data-src="' + esc(g.src) + '" data-legenda="' + esc(g.legenda || "") + '" aria-label="Ampliar foto"><div class="serrilha"><img src="' + esc(g.src) + '" alt="' + esc(g.legenda || "") + '" loading="lazy"></div></button>' +
                  (g.legenda ? "<figcaption>" + esc(g.legenda) + "</figcaption>" : "") + "</figure>";
              }).join("") +
            "</div></section>"
          : "") +

        '<section class="creditos" aria-label="Créditos"><div class="creditos__caixa">' +
          credito("Postal", num(h.numero)) + credito("Quem conta", h.quemConta) + credito("Texto", c.texto) + credito("Fotografia", c.fotos) + credito("Entrevista", c.entrevista) +
        "</div></section>" +

        (outras.length
          ? '<section class="continue"><div class="envelope"><div class="continue__cab"><h2 class="display">Continue a viagem</h2><a class="botao" href="#album">Ver o álbum</a></div>' +
              '<div class="grade">' + outras.map(function (o, i) { return cartao(o, i + 1); }).join("") + "</div></div></section>"
          : "") +
      "</article>";

    document.title = h.titulo + " — " + SITE;
  }

  function paginaAviso(h) {
    var lacrada = !!h;
    var tema = "t-" + ((h && h.cor) || "vermelho");
    app.innerHTML =
      '<section class="view aviso ' + tema + '"><div class="aviso__cartao">' +
        selo(lacrada ? h.selo : "farol") +
        '<h1 class="display">' + (lacrada ? "Postal a caminho" : "Postal extraviado") + "</h1>" +
        "<p>" + (lacrada
          ? "A história do postal " + num(h.numero) + " ainda está sendo escrita. Volte em breve — enquanto isso, conheça as outras histórias da ilha."
          : "Não encontramos a história deste endereço. Talvez o postal tenha se perdido no caminho.") + "</p>" +
        '<a class="botao" href="#album">Ir para o álbum</a>' +
      "</div></section>";
    document.title = (lacrada ? "Em breve" : "Não encontrado") + " — " + SITE;
  }

  /* =========================================================
     SOBRE NÓS — os remetentes
     ========================================================= */
  var ICONE_PESSOA =
    '<svg class="pessoa" viewBox="0 0 120 150" aria-hidden="true">' +
      '<circle cx="60" cy="50" r="25" fill="currentColor"/>' +
      '<path d="M12 142c3-34 22-54 48-54s45 20 48 54z" fill="currentColor"/>' +
    '</svg>';

  function iniciais(nome) {
    var partes = nome.split(/\s+/).filter(Boolean);
    return (partes[0][0] + (partes.length > 1 ? partes[partes.length - 1][0] : "")).toUpperCase();
  }
  function contato(rotulo, texto, href, provisorio) {
    if (!texto) return "";
    var valor = href
      ? '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(texto) + "</a>"
      : esc(texto);
    return "<li><small>" + esc(rotulo) + "</small>" + valor + "</li>";
  }
  function remetente(p, i) {
    var c = p.contatos || {};
    var tema = "t-" + (p.cor || "azul");
    var foto = p.foto
      ? '<img src="' + esc(p.foto) + '" alt="Foto de ' + esc(p.nome) + '">'
      : '<div class="remetente__vazio">' + ICONE_PESSOA + '<span>Foto em breve</span></div>';
    var contatos =
      contato("Instagram", c.instagram ? "@" + c.instagram.replace(/^@/, "") : "", c.instagram ? "https://instagram.com/" + c.instagram.replace(/^@/, "") : "", p.provisorio) +
      contato("E-mail", c.email, c.email ? "mailto:" + c.email : "", p.provisorio) +
      contato("LinkedIn", c.linkedin ? c.linkedin.replace(/^https?:\/\/(www\.)?/, "") : "", c.linkedin, p.provisorio) +
      contato("Portfólio", c.portfolio ? c.portfolio.replace(/^https?:\/\/(www\.)?/, "") : "", c.portfolio, p.provisorio);

    return (
      '<article class="remetente ' + tema + (i % 2 ? " remetente--inverso" : "") + '">' +
        '<div class="remetente__retrato">' +
          '<div class="remetente__selo serrilha"><div class="remetente__foto">' + foto +
            '<span class="postal__num">Remetente ' + num(i + 1) + "</span>" +
          "</div></div>" +
          '<div class="carimbo">' + carimbo({ topo: "REMETENTE · BOIPEBA", base: "ALÉM DO POSTAL", centro: iniciais(p.nome), linha2: "2026" }) + "</div>" +
        "</div>" +
        '<div class="remetente__verso">' +
          '<div class="remetente__cab">' +
            "<div>" +
              '<p class="rotulo">De</p>' +
              '<h2 class="display">' + esc(p.nome) + "</h2>" +
              '<p class="remetente__papel">' + esc(p.papel) + "</p>" +
            "</div>" +
            '<span class="remetente__minisselo serrilha">' + selo(p.selo) + "</span>" +
          "</div>" +
          '<div class="remetente__textos">' +
            '<div><p class="rotulo">Quem sou</p><p>' + esc(p.quemSou) + "</p></div>" +
            '<div><p class="rotulo">Por que Boipeba</p><p>' + esc(p.porque) + "</p></div>" +
          "</div>" +
          (contatos ? '<div class="remetente__contato"><p class="rotulo">Onde me encontrar</p><ul class="endereco">' + contatos + "</ul></div>" : "") +
          (p.provisorio ? '<span class="provisorio">Texto provisório</span>' : "") +
        "</div>" +
      "</article>"
    );
  }

  function paginaSobre() {
    var equipe = window.EQUIPE || [];
    app.innerHTML =
      '<div class="view pagina-sobre">' +
        '<header class="sobre-hero t-azul">' +
          selo("casa", "hist-hero__selo-fundo") +
          '<div class="envelope">' +
            '<p class="rotulo">Sobre nós</p>' +
            '<h1 class="display">Os<br>remetentes</h1>' +
            '<p class="sobre-hero__texto">Todo postal tem quem escreve. Estes são os três que juntaram fotografias, conversas e memórias da ilha para que cada cartão levasse uma história — e não só uma paisagem.</p>' +
          "</div>" +
        "</header>" +
        '<section class="remetentes envelope" aria-label="Integrantes do grupo">' +
          equipe.map(remetente).join("") +
        "</section>" +
        '<section class="origem">' +
          '<div class="envelope origem__grid">' +
            '<div><p class="rotulo">Onde nasceu</p><h2 class="display">Um projeto de sala de aula que quis ir até a ilha.</h2></div>' +
            '<div class="origem__info">' +
              '<p><strong>Design Disruptivo</strong><br>Prof. Tabatha · Senac · 2026</p>' +
              '<p>Boipeba: Além do Postal ressignifica os cartões-postais como peças que representam a identidade e as vivências de quem vive na Ilha de Boipeba.</p>' +
              '<a class="botao" href="#album">Ver as histórias</a>' +
            "</div>" +
          "</div>" +
        "</section>" +
      "</div>";
    document.title = "Sobre nós — " + SITE;
  }

  /* =========================================================
     ROTAS
     ========================================================= */
  function rota() {
    var alvo = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!alvo || alvo === "inicio" || SECOES[alvo]) {
      if (estado.vista !== "inicio") { paginaInicial(); estado.vista = "inicio"; }
      if (SECOES[alvo]) rolarPara(alvo); else window.scrollTo(0, 0);
      return;
    }
    if (alvo === "sobre") {
      estado.vista = "sobre";
      paginaSobre();
      ajustaTitulos();
      window.scrollTo(0, 0);
      app.focus({ preventScroll: true });
      return;
    }
    var h = HISTORIAS.filter(function (x) { return x.slug === alvo; })[0];
    estado.vista = alvo;
    if (h && h.publicada) paginaHistoria(h);
    else paginaAviso(h || null);
    ajustaTitulos();
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }
  function rolarPara(id) {
    requestAnimationFrame(function () {
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* títulos grandes: diminui a fonte até nenhuma palavra estourar a coluna */
  function ajustaTitulos() {
    document.querySelectorAll(".hist-hero h1, .sobre-hero h1").forEach(function (el) {
      el.style.fontSize = "";
      var tam = parseFloat(getComputedStyle(el).fontSize);
      var guarda = 0;
      while (el.scrollWidth > el.clientWidth + 1 && tam > 24 && guarda++ < 40) {
        tam -= 3;
        el.style.fontSize = tam + "px";
      }
    });
  }
  var esperaAjuste;
  window.addEventListener("resize", function () { clearTimeout(esperaAjuste); esperaAjuste = setTimeout(ajustaTitulos, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustaTitulos);

  /* cliques */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#']");
    if (a) {
      var dest = a.getAttribute("href").slice(1);
      if (a.hasAttribute("data-home")) dest = "inicio";
      if (a.hasAttribute("data-scroll")) dest = a.getAttribute("data-scroll");
      if (("#" + dest) === location.hash || (dest === "inicio" && !location.hash)) {
        e.preventDefault();
        if (SECOES[dest] && estado.vista === "inicio") rolarPara(dest);
        else if (dest === "inicio") window.scrollTo({ top: 0, behavior: "smooth" });
        else rota();
        return;
      }
      if (a.hasAttribute("data-home") || a.hasAttribute("data-scroll")) { e.preventDefault(); location.hash = dest; }
      return;
    }
    var f = e.target.closest("[data-filtro]");
    if (f) { estado.filtro = f.getAttribute("data-filtro"); desenhaGrade(); return; }

    var lb = e.target.closest("[data-lupa-btn]");
    if (lb) { abreLupa(lb.getAttribute("data-src"), lb.getAttribute("data-legenda"), lb); return; }
    var li = e.target.closest("img[data-lupa]");
    if (li) { abreLupa(li.getAttribute("src"), li.getAttribute("data-legenda"), li); }
  });

  /* lupa */
  var lupa = document.getElementById("lupa");
  var lupaOrigem = null;
  function abreLupa(src, legenda, origem) {
    lupaOrigem = origem;
    lupa.querySelector("img").src = src;
    lupa.querySelector("img").alt = legenda || "";
    lupa.querySelector("figcaption").textContent = legenda || "";
    lupa.hidden = false;
    lupa.querySelector(".lupa__fechar").focus();
  }
  function fechaLupa() {
    lupa.hidden = true;
    if (lupaOrigem && lupaOrigem.focus) lupaOrigem.focus();
  }
  lupa.addEventListener("click", function (e) { if (e.target === lupa || e.target.closest(".lupa__fechar")) fechaLupa(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lupa.hidden) fechaLupa(); });

  /* rodapé */
  document.getElementById("rodape-selos").innerHTML = SELOS.map(function (s) { return selo(s); }).join("");

  window.addEventListener("hashchange", rota);
  rota();
})();
