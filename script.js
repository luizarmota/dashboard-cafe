const pedidos = [
  { id: 1, produto: "Capuccino", valor: 12, status: "entregue" },
  { id: 2, produto: "Latte", valor: 10, status: "pronto" },
  { id: 3, produto: "Chá Verde", valor: 8, status: "em preparo" },
  { id: 4, produto: "Smoothie", valor: 15, status: "entregue" },
  { id: 5, produto: "Capuccino", valor: 12, status: "em preparo" },
  { id: 6, produto: "Chá Verde", valor: 8, status: "pronto" },
  { id: 7, produto: "Capuccino", valor: 12, status: "entregue" },
  {id: 8, produto: "Latte", valor: 10, status: "entregue" }
];
// Pegamos o elemento onde vamos colocar os cards
const painel = document.getElementById("painel-info");

// 🔢 TOTAL DE PEDIDOS
const totalPedidos = pedidos.length;

// 💰 RECEITA TOTAL
const receitaTotal = pedidos.reduce((soma, pedido) => soma + pedido.valor, 0);

// 🌟 PRODUTO MAIS PEDIDO
const contagem = {};
pedidos.forEach(p => {
  contagem[p.produto] = (contagem[p.produto] || 0) + 1;
});

const produtoMaisPedido = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0][0];

// Criar e mostrar os cards
painel.innerHTML = `
  <div class="info-card">
    <h3>Total de Pedidos</h3>
    <p>${totalPedidos}</p>
  </div>
  <div class="info-card">
    <h3>Receita do Dia</h3>
    <p>R$ ${receitaTotal.toFixed(2)}</p>
  </div>
  <div class="info-card">
    <h3>Mais Pedido</h3>
    <p>${produtoMaisPedido}</p>
  </div>
`;
const containerPedidos = document.getElementById("lista-pedidos");
const botoesStatus = document.querySelectorAll("#botoes-status button");

// Função para mostrar os pedidos na tela
function mostrarPedidos(lista) {
  containerPedidos.innerHTML = "";

  // Atualiza o contador acima da lista
  const contador = document.getElementById("contador");
  contador.innerText = `Mostrando ${lista.length} pedido(s)`;

  lista.forEach(pedido => {
    const card = document.createElement("div");
    card.classList.add("pedido-card");

    // Adiciona classe com base no status pra aplicar cor
    const statusFormatado = pedido.status.toLowerCase().replace(" ", "-");

    card.innerHTML = `
      <strong>Pedido #${pedido.id}</strong><br>
      Produto: ${pedido.produto}<br>
      Valor: R$ ${pedido.valor.toFixed(2)}<br>
      Status: <em class="${statusFormatado}">${pedido.status}</em>
    `;

    containerPedidos.appendChild(card);
  });
}

// Inicialmente mostra todos os pedidos
mostrarPedidos(pedidos);

// Ativa o filtro por clique nos botões
botoesStatus.forEach(botao => {
  botao.addEventListener("click", () => {
    const status = botao.dataset.status;

    // Remove a classe .ativo de todos os botões
    botoesStatus.forEach(btn => btn.classList.remove("ativo"));

    // Adiciona a classe .ativo no botão clicado
    botao.classList.add("ativo");

    //  Aplica o filtro
    if (status === "todos") {
      mostrarPedidos(pedidos);
    } else {
      const filtrados = pedidos.filter(p => p.status === status);
      mostrarPedidos(filtrados);
    }
  });
});
