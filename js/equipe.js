/* =====================================================================
   BOIPEBA: ALÉM DO POSTAL — quem faz (página "Sobre nós", endereço #sobre)
   ---------------------------------------------------------------------
   nome       → nome completo.
   papel      → o que a pessoa faz no projeto (uma linha).
   cor        → "azul" | "verde" | "amarelo" | "vermelho"
   selo       → um dos selos: "aratu" | "barco" | "caju" | "casa" |
                "coqueiro" | "farol" | "hibisco" | "igreja" | "palafita" | "tambor"
   foto       → caminho da foto (ex.: "img/equipe/aline.jpg").
                Vazio ("") = mostra o ícone de pessoa no lugar.
   quemSou    → quem a pessoa é.
   porque     → por que quis fazer o projeto.
   contatos   → deixe vazio ("") o que não for usar; o item some da página.
                instagram: só o usuário, sem @ (ex.: "alinee.pinheiroo")
                email:     endereço completo
                linkedin:  link completo do perfil
                portfolio: link completo (Behance, site pessoal etc.)
   provisorio → true mostra o aviso "texto provisório" no cartão.
   ===================================================================== */

window.EQUIPE = [
  {
    nome: "Aline Pinheiro",
    papel: "Direção de Arte",
    cor: "vermelho",
    selo: "hibisco",
    foto: "img/equipe/aline.jpg",
    quemSou:
      "Apaixonada por gatos e tudo o que houver design e estética. Tenho 20 anos, sou de São Paulo capital e, pela ironia do destino, tenho o sonho de um dia “rest in peace” em uma fazenda texana.",
    porque:
      "Entre as milhares de funções do design, uma delas é manter memórias vivas através do visual e da comunicação. A cultura de Boipeba vai além das praias paradisíacas e dos coqueiros, e nesse trabalho, através do turismo, mostramos uma pequena parte de uma cultura enorme.",
    contatos: { instagram: "alinee.pinheiroo", email: "iamalinemoura@gmail.com", linkedin: "", portfolio: "" },
    provisorio: false
  },
  {
    nome: "Henrique Mendelini",
    papel: "Web Design",
    cor: "azul",
    selo: "barco",
    foto: "img/equipe/henrique.jpg",
    quemSou:
      "Nascido e criado em Guarulhos, sou um cara criativo, bem-humorado, que curte uma tecnologia e também contar histórias. Design e videogame me deixam boas horas em frente a uma tela.",
    porque:
      "Me interessa muito a ideia de comentar sobre um lugar com tanta identidade cultural quanto Boipeba-BA. Além disso, a conexão com o lugar através de um dos membros do projeto foi um bônus muito agradável.",
    contatos: { instagram: "henriq_mendelini", email: "henriquemendelini@gmail.com", linkedin: "", portfolio: "" },
    provisorio: false
  },
  {
    nome: "Pedro Moura",
    papel: "Pesquisa",
    cor: "verde",
    selo: "coqueiro",
    foto: "img/equipe/pedro.jpg",
    quemSou:
      "Nascido em São Paulo, mas de família baiana, carrego a honra de ter o sangue da Ilha de Boipeba. Sinto-me bem na praia e amo viajar. Tenho o sonho de conhecer o mundo e diferentes lugares e culturas.",
    porque:
      "Minha família, por parte paterna, é nativa da ilha de gerações atrás. Tive o privilégio de conhecer as histórias e a cultura nativa por meio dos meus parentes e gostaria de compartilhar esse conhecimento com meus amigos e conhecidos.",
    contatos: { instagram: "_.pedromouraa", email: "pmoura1312@gmail.com", linkedin: "", portfolio: "" },
    provisorio: false
  }
];
