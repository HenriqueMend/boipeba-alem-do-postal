/* =====================================================================
   BOIPEBA: ALÉM DO POSTAL — acervo de histórias
   ---------------------------------------------------------------------
   Cada item da lista abaixo é um postal / uma história.
   Para publicar uma nova história, copie um bloco { ... } e preencha.

   slug        → endereço da página. É o que vai no QR Code do postal.
                 Ex.: slug "povos-originarios" → endereço-do-site/#povos-originarios
                 Use só letras sem acento, números e hífens.
                 (Não use "inicio", "album", "projeto", "linha" nem "sobre".)
   numero      → número do postal (aparece como "Nº 01").
   publicada   → true = aparece no álbum e abre a página.
                 false = aparece como "em breve" (postal lacrado).
   provisorio  → true mostra o selo "conteúdo provisório" na página.
   titulo      → título da história.
   subtitulo   → uma linha de apoio abaixo do título.
   tema        → categoria usada no filtro do álbum.
   local       → povoado / lugar onde a história acontece.
   cor         → "azul" | "verde" | "amarelo" | "vermelho"
   selo        → "aratu" | "barco" | "caju" | "casa" | "coqueiro" |
                 "farol" | "hibisco" | "igreja" | "palafita" | "tambor"
   capa        → foto principal.
   resumo      → texto curto, aparece no "verso do postal".
   quemConta   → quem conta / assina a história.
   corpo       → lista de blocos do texto, na ordem:
                   { tipo: "paragrafo", texto: "..." }
                   { tipo: "citacao",   texto: "...", autor: "..." }
                   { tipo: "foto",      src: "img/...", legenda: "..." }
                   { tipo: "intertitulo", texto: "..." }
                 Se ficar vazio, a página mostra um texto-modelo.
   galeria     → lista de fotos extras: { src, legenda }
   creditos    → { texto, fotos, entrevista } — o que ficar vazio some.
   ===================================================================== */

(function () {
  var PESQUISA = "Pesquisa histórica — Boipeba: Além do Postal";
  var CREDITOS = { texto: "Pesquisa do grupo Boipeba: Além do Postal", fotos: "Acervo do projeto" };

  /* legendas das fotos do acervo */
  var F = {
    aratu:    { src: "img/foto-aratu.jpg",      legenda: "Aratu, o caranguejo avermelhado dos manguezais" },
    barco:    { src: "img/foto-barco.jpg",      legenda: "Barco de pesca parado na maré" },
    caju:     { src: "img/foto-caju.jpg",       legenda: "Caju no pé" },
    casa:     { src: "img/foto-casa-praia.jpg", legenda: "Casa à beira-mar, com barcos ao fundo" },
    coqueiral:{ src: "img/foto-coqueiral.jpg",  legenda: "Coqueiral na beira da praia" },
    folhas:   { src: "img/foto-hibisco.jpg",    legenda: "Folhagem sob a luz da tarde" },
    igreja:   { src: "img/foto-igreja.jpg",     legenda: "Igreja de arquitetura colonial" },
    palafita: { src: "img/foto-palafita.jpg",   legenda: "Casa de palafita sobre a água" },
    palha:    { src: "img/foto-palha.jpg",      legenda: "Trançado de palha, saber passado entre gerações" },
    sombra:   { src: "img/foto-sombra.jpg",     legenda: "Barco e cadeira à sombra das árvores" }
  };
  function foto(f) { return { tipo: "foto", src: f.src, legenda: f.legenda }; }
  function p(t) { return { tipo: "paragrafo", texto: t }; }
  function h(t) { return { tipo: "intertitulo", texto: t }; }
  function q(t) { return { tipo: "citacao", texto: t, autor: PESQUISA }; }

  window.HISTORIAS = [
    {
      slug: "povos-originarios",
      numero: 1,
      publicada: true,
      titulo: "M'boi pewa",
      subtitulo: "Os povos originários e a origem do nome Boipeba",
      tema: "História",
      local: "Ilha de Boipeba, BA",
      cor: "verde",
      selo: "coqueiro",
      capa: F.coqueiral.src,
      resumo:
        "Muito antes dos colonizadores, a ilha já era habitada por povos indígenas, como os Tupinambás. Deles veio também o nome: Boipeba, do tupi m'boi pewa, a “cobra chata” — como eram chamadas as tartarugas marinhas da região.",
      quemConta: "Pesquisa do grupo",
      corpo: [
        p("Muito antes da chegada dos colonizadores portugueses, o território onde hoje está a Ilha de Boipeba já era habitado por povos indígenas. Entre os grupos presentes na região estavam os Tupinambás, que ocupavam parte significativa do litoral brasileiro."),
        p("Essas populações mantinham uma relação direta com a natureza e desenvolviam atividades fundamentais para a sobrevivência, como pesca, caça, coleta de frutos e agricultura. O cultivo da mandioca tinha grande importância na alimentação, sendo usado na produção de farinha e de outros alimentos."),
        p("Mas a relação dos povos originários com o território ia além da sobrevivência."),
        q("O mar, os rios, os manguezais e as florestas eram espaços de convivência, alimentação, conhecimento e organização social."),
        h("Uma cobra chata?"),
        p("O próprio nome Boipeba tem origem indígena. Derivado da expressão tupi m'boi pewa, seu significado é associado a “cobra chata”, uma referência às tartarugas marinhas encontradas na região."),
        foto(F.aratu),
        p("Essa origem revela a influência dos povos indígenas na construção da identidade e da memória da ilha — uma marca que segue viva no próprio nome do lugar.")
      ],
      galeria: [F.palafita, F.caju, F.barco],
      creditos: CREDITOS
    },
    {
      slug: "colonizacao",
      numero: 2,
      publicada: true,
      titulo: "Capitanias e jesuítas",
      subtitulo: "A chegada dos portugueses e o processo de colonização",
      tema: "História",
      local: "Ilha de Boipeba, BA",
      cor: "azul",
      selo: "farol",
      capa: F.barco.src,
      resumo:
        "A partir do século XVI, a chegada dos portugueses transformou a região. Boipeba passou a integrar a Capitania de Ilhéus e, em 1563, uma grande sesmaria doada aos jesuítas — com mudanças profundas na vida dos povos indígenas.",
      quemConta: "Pesquisa do grupo",
      corpo: [
        p("A partir do século XVI, a chegada dos portugueses transformou profundamente a organização dos territórios brasileiros, incluindo a região de Boipeba."),
        h("1534 — as Capitanias"),
        p("Em 1534, Portugal implantou o sistema de Capitanias Hereditárias, dividindo o território colonial em grandes áreas administradas por donatários. A região de Boipeba passou a integrar a Capitania de Ilhéus, onde aconteceram diferentes iniciativas de ocupação e exploração do território."),
        h("1563 — as Doze Léguas"),
        p("Em 1563, durante o governo de Mem de Sá, uma extensa área conhecida como Sesmaria das Doze Léguas foi doada ao Colégio dos Jesuítas da Bahia. Ela abrangia terras entre o Rio de Contas e a região de Boipeba. Os religiosos estabeleceram ali atividades de catequização e ocupação, dando origem à aldeia e residência jesuítica de Boipeba."),
        q("As populações indígenas passaram a enfrentar a imposição da religião cristã, a reorganização de seus territórios e os conflitos da expansão colonial."),
        p("A ocupação portuguesa também foi marcada por conflitos entre diferentes grupos indígenas e colonizadores. Epidemias, violência e disputas territoriais contribuíram para transformar a composição da população da região."),
        foto(F.casa)
      ],
      galeria: [F.coqueiral, F.igreja, F.palafita],
      creditos: CREDITOS
    },
    {
      slug: "vila-de-boipeba",
      numero: 3,
      publicada: true,
      titulo: "Vila de Santo Antônio",
      subtitulo: "A formação da vila e a Igreja Matriz do Divino Espírito Santo",
      tema: "História",
      local: "Velha Boipeba, BA",
      cor: "amarelo",
      selo: "igreja",
      capa: F.igreja.src,
      resumo:
        "Em 1616, Boipeba se consolidou como Vila de Santo Antônio de Boipeba. Desse tempo ficou um dos seus maiores marcos: a Igreja Matriz do Divino Espírito Santo, em Velha Boipeba.",
      quemConta: "Pesquisa do grupo",
      corpo: [
        p("Durante os séculos XVI e XVII, a ocupação da região foi se consolidando. Em 1565, foram determinadas iniciativas para a criação de vilas em Boipeba, Cairu e Camamu. Mas os conflitos territoriais e as dificuldades de ocupação fizeram com que a organização administrativa de Boipeba só se efetivasse no início do século XVII."),
        p("Em 1616, Boipeba foi consolidada como Vila de Santo Antônio de Boipeba, tornando-se um importante núcleo de ocupação da região. No mesmo período desenvolveu-se a organização religiosa local, com a criação da Freguesia do Divino Espírito Santo de Boipeba."),
        h("Farinha que abastecia a Bahia"),
        p("A vila passou a ter um papel importante no abastecimento de outras localidades da Bahia, principalmente com a produção agrícola, a farinha de mandioca e outros gêneros alimentícios. A localização estratégica da ilha também favorecia a circulação de pessoas e mercadorias."),
        h("A Igreja Matriz"),
        p("Um dos principais registros materiais desse período é a Igreja Matriz do Divino Espírito Santo, em Velha Boipeba. Considerada um dos monumentos históricos mais importantes da ilha, sua construção remonta ao início do século XVII, com ampliações feitas depois, especialmente no século XIX."),
        q("A igreja representa não apenas a influência religiosa portuguesa, mas também um marco da formação histórica e urbana da comunidade."),
        foto(F.sombra)
      ],
      galeria: [F.casa, F.caju, F.coqueiral],
      creditos: CREDITOS
    },
    {
      slug: "heranca-africana",
      numero: 4,
      publicada: true,
      titulo: "Herança africana",
      subtitulo: "A influência africana e a formação cultural da comunidade",
      tema: "Cultura",
      local: "Ilha de Boipeba, BA",
      cor: "amarelo",
      selo: "casa",
      capa: F.sombra.src,
      resumo:
        "A história de Boipeba também foi construída por africanos e afro-brasileiros. Essa ancestralidade vive nas tradições, na música, na comida, na organização comunitária e na comunidade quilombola de Monte Alegre.",
      quemConta: "Pesquisa do grupo",
      corpo: [
        p("A formação histórica de Boipeba também precisa ser compreendida a partir da presença e da contribuição das populações africanas e afro-brasileiras."),
        p("Assim como em outras regiões do litoral baiano, a colonização portuguesa esteve ligada à escravização de africanos e de seus descendentes, que participaram da formação econômica, social e cultural do território."),
        p("Ao longo das gerações, diferentes conhecimentos, práticas e manifestações culturais ajudaram a construir a identidade local. A ancestralidade africana está presente nas tradições religiosas, nas expressões populares, na musicalidade, na alimentação e nas formas de organização comunitária."),
        h("Monte Alegre"),
        p("Um exemplo importante dessa presença é a comunidade quilombola de Monte Alegre, na Ilha de Boipeba. Sua existência representa a continuidade da história e da resistência das populações negras, além da preservação de vínculos culturais e territoriais transmitidos entre gerações."),
        q("Boipeba não é formada apenas por suas paisagens naturais, mas por diferentes povos e culturas que construíram sua identidade ao longo do tempo."),
        foto(F.casa)
      ],
      galeria: [F.palafita, F.caju, F.folhas],
      creditos: CREDITOS
    },
    {
      slug: "tempo-da-mare",
      numero: 5,
      publicada: true,
      titulo: "O tempo da maré",
      subtitulo: "Pesca, mariscagem, mangue e mandioca: o modo de vida tradicional",
      tema: "Território",
      local: "Ilha de Boipeba, BA",
      cor: "vermelho",
      selo: "aratu",
      capa: F.aratu.src,
      resumo:
        "Por gerações, a vida na ilha seguiu o ritmo da natureza: pesca artesanal, mariscagem, agricultura familiar e o saber de ler as marés — conhecimentos que continuam presentes em Boipeba.",
      quemConta: "Pesquisa do grupo",
      corpo: [
        p("Historicamente, a vida em Boipeba esteve profundamente ligada aos recursos naturais da ilha. A pesca artesanal, a mariscagem, a agricultura familiar e o extrativismo foram algumas das principais atividades das comunidades locais."),
        p("O mar sempre foi uma importante fonte de alimento e sustento. A pesca era feita com conhecimentos transmitidos entre gerações: saber os períodos certos para cada atividade, entender o comportamento das marés e conhecer as espécies marinhas."),
        foto(F.barco),
        h("Mangue e mandioca"),
        p("Os manguezais também tiveram um papel essencial na vida dos moradores, oferecendo alimento e contribuindo para o equilíbrio ambiental da região."),
        p("A agricultura, especialmente o cultivo da mandioca, também teve grande importância. A produção de farinha, além de atividade econômica e alimentar, preservou conhecimentos tradicionais sobre o preparo e o aproveitamento dos recursos naturais."),
        q("Mesmo com as transformações ao longo dos anos, muitas dessas atividades continuam presentes na realidade de Boipeba.")
      ],
      galeria: [F.palha, F.palafita, F.sombra],
      creditos: CREDITOS
    },
    {
      slug: "festas-populares",
      numero: 6,
      publicada: true,
      titulo: "Festas da ilha",
      subtitulo: "Divino Espírito Santo, Iemanjá, Bumba Meu Boi e Zambiapunga",
      tema: "Cultura",
      local: "Ilha de Boipeba, BA",
      cor: "azul",
      selo: "tambor",
      capa: F.caju.src,
      resumo:
        "A cultura de Boipeba nasce do encontro de muitos povos. Nas festas — do Divino a Iemanjá, do Bumba Meu Boi à Zambiapunga — a ilha guarda sua memória e passa adiante o que sabe.",
      quemConta: "Pesquisa do grupo",
      corpo: [
        p("A cultura de Boipeba é resultado da influência de diferentes povos e tradições que participaram da formação histórica da ilha. Suas manifestações culturais são formas de preservar a memória coletiva, fortalecer os vínculos comunitários e transmitir conhecimentos entre gerações."),
        p("Entre as manifestações tradicionais da ilha, destacam-se a Festa do Divino Espírito Santo, a Festa de Iemanjá, o Bumba Meu Boi e a Zambiapunga."),
        h("Festa do Divino Espírito Santo"),
        p("Tem relação histórica com a formação religiosa da comunidade e remonta ao período colonial. Sua celebração reúne fé, devoção e convivência comunitária."),
        h("Bumba Meu Boi"),
        p("Manifestação popular que combina música, dança, personagens e encenações — uma expressão importante da cultura brasileira e das tradições locais."),
        h("Zambiapunga"),
        p("Presente em municípios do Baixo Sul da Bahia, a Zambiapunga é marcada por grupos que percorrem as comunidades usando máscaras, instrumentos de percussão e vestimentas características."),
        q("Essas tradições mostram a riqueza cultural da região e a importância de preservar o que representa a memória e a identidade de seus habitantes.")
      ],
      galeria: [F.igreja, F.folhas, F.palha],
      creditos: CREDITOS
    },
    {
      slug: "chegada-do-turismo",
      numero: 7,
      publicada: true,
      titulo: "Ilha aberta",
      subtitulo: "A transformação de Boipeba e a chegada do turismo",
      tema: "Território",
      local: "Ilha de Boipeba, BA",
      cor: "verde",
      selo: "barco",
      capa: F.casa.src,
      resumo:
        "Por muito tempo, chegar a Boipeba era difícil — e a ilha manteve seu jeito próprio. O turismo trouxe oportunidades, mas também desafios para o território e para quem vive nele.",
      quemConta: "Pesquisa do grupo",
      corpo: [
        p("Durante muito tempo, o acesso à Ilha de Boipeba foi dificultado pela localização e pelas limitações de transporte. Isso ajudou a comunidade a manter características próprias, com a economia ligada principalmente à pesca, à agricultura e ao extrativismo."),
        p("Com o passar dos anos, a ilha começou a receber cada vez mais visitantes, atraídos pelas paisagens, pelas praias, pela tranquilidade e pela cultura. O turismo passou a ocupar um espaço cada vez maior na economia local, movimentando hospedagem, alimentação, transporte e serviços."),
        h("Oportunidades e desafios"),
        p("Esse processo trouxe novas oportunidades econômicas, mas também mudou a organização social e territorial da ilha. O crescimento do turismo passou a representar desafios ligados à preservação ambiental, à especulação imobiliária, à valorização dos territórios tradicionais e à continuidade dos modos de vida das comunidades locais."),
        q("A ilha possui uma história que continua sendo construída por seus moradores, que preservam conhecimentos, tradições e relações com o território."),
        p("Essas questões mostram a importância de compreender Boipeba para além da sua imagem turística — e é exatamente esse o convite destes postais."),
        foto(F.coqueiral)
      ],
      galeria: [F.barco, F.sombra, F.palafita],
      creditos: CREDITOS
    },
    {
      slug: "memoria-viva",
      numero: 8,
      publicada: true,
      titulo: "Memória viva",
      subtitulo: "Por que preservar a história de Boipeba",
      tema: "Memória",
      local: "Ilha de Boipeba, BA",
      cor: "vermelho",
      selo: "hibisco",
      capa: F.palafita.src,
      resumo:
        "Origens indígenas, colonização portuguesa, ancestralidade africana e saberes tradicionais: a história de Boipeba é patrimônio. Reconhecê-la é valorizar as pessoas que a construíram — e que seguem construindo.",
      quemConta: "Pesquisa do grupo",
      corpo: [
        p("A história de Boipeba é um patrimônio cultural que precisa ser reconhecido e valorizado. Suas origens indígenas, a influência da colonização portuguesa, a ancestralidade africana e os conhecimentos das comunidades tradicionais formam um conjunto de elementos fundamentais para compreender sua identidade."),
        p("Preservar essa memória significa reconhecer a importância das pessoas que construíram a história da ilha e das tradições que continuam presentes no seu cotidiano."),
        q("Uma visão que ultrapasse as paisagens e os pontos turísticos: a história, os costumes e os valores que fazem parte da identidade local."),
        p("Em um cenário de crescimento do turismo, torna-se ainda mais importante apresentar aos visitantes essa outra visão da ilha. O reconhecimento das comunidades tradicionais e de suas histórias também fortalece o sentimento de pertencimento e a valorização do patrimônio cultural."),
        foto(F.palha),
        p("É para isso que estes cartões-postais existem: para que cada visitante leve da ilha um pouco mais do que a paisagem.")
      ],
      galeria: [F.aratu, F.igreja, F.coqueiral],
      creditos: CREDITOS
    }
  ];

  /* Linha do tempo da página inicial — cada marco leva a um postal */
  window.LINHA_DO_TEMPO = [
    { ano: "Antes de 1500", texto: "Povos indígenas, como os Tupinambás, habitam a região. Do tupi vem o nome: m'boi pewa.", slug: "povos-originarios" },
    { ano: "1534", texto: "Capitanias Hereditárias: Boipeba passa a integrar a Capitania de Ilhéus.", slug: "colonizacao" },
    { ano: "1563", texto: "A Sesmaria das Doze Léguas é doada ao Colégio dos Jesuítas da Bahia.", slug: "colonizacao" },
    { ano: "1565", texto: "São determinadas iniciativas para criar vilas em Boipeba, Cairu e Camamu.", slug: "vila-de-boipeba" },
    { ano: "1616", texto: "Nasce a Vila de Santo Antônio de Boipeba e a Freguesia do Divino Espírito Santo.", slug: "vila-de-boipeba" },
    { ano: "Século XIX", texto: "A Igreja Matriz do Divino Espírito Santo, em Velha Boipeba, ganha ampliações.", slug: "vila-de-boipeba" },
    { ano: "Hoje", texto: "O turismo cresce — e com ele o desafio de preservar o território e os modos de vida.", slug: "chegada-do-turismo" }
  ];
})();
