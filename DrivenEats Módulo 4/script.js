let comidaSelecionada = null;
let bebidaSelecionada = null;
let sobremesaSelecionada = null;

function selecionarComida(elemento) {
   if (comidaSelecionada !== null) {
       comidaSelecionada.classList.remove("borda");
   }
   elemento.classList.add("borda");
   comidaSelecionada = elemento;

   fecharPedido();
}

function selecionarBebida(elemento) {
   if (bebidaSelecionada !== null) {
       bebidaSelecionada.classList.remove("borda");
   }
   elemento.classList.add("borda");
   bebidaSelecionada = elemento;

   fecharPedido();
}

function selecionarSobremesa(elemento) {
   if (sobremesaSelecionada !== null) {
       sobremesaSelecionada.classList.remove("borda");
   }
   elemento.classList.add("borda");
   sobremesaSelecionada = elemento;

   fecharPedido();
}

function fecharPedido() {
   const botao = document.querySelector('button');

   if (comidaSelecionada !== null && bebidaSelecionada !== null && sobremesaSelecionada !== null) {
       botao.classList.remove("desabilitado");
       botao.classList.add("habilitado");
       botao.innerHTML = 'Fechar pedido';
       botao.onclick = finalizado;
   } else {
       botao.classList.remove("habilitado");
       botao.classList.add("desabilitado");
   }
}

function finalizado() {
   const precoComida = Number(comidaSelecionada.querySelector('h3').innerHTML.replace('R$', '').replace(',', '.'));
   const precoBebida = Number(bebidaSelecionada.querySelector('h3').innerHTML.replace('R$', '').replace(',', '.'));
   const precoSobremesa = Number(sobremesaSelecionada.querySelector('h3').innerHTML.replace('R$', '').replace(',', '.'));

   const total = precoComida + precoBebida + precoSobremesa;

   const detalhes = document.querySelector('#detalhes');
   detalhes.innerHTML =
       `${obterdetalhes(comidaSelecionada)}<br>
        ${obterdetalhes(bebidaSelecionada)}<br>
        ${obterdetalhes(sobremesaSelecionada)}<br>`;

   const totalPedido = document.querySelector("#total");
   totalPedido.innerHTML = `<strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong>`;

   document.querySelector("#confirmacao").classList.remove("escondido");
}

function obterdetalhes(item) {
   const nome = item.querySelector('h1').innerHTML; // Mudança para pegar o h1
   const preco = item.querySelector('h3').innerHTML.replace('R$', ''); // Mudança para pegar o h3

   return `<div class="detalhe-nome">${nome} - <strong class="detalhe-preco">R$ ${preco}</strong></div>`;
}

function cancelar() {
   document.querySelector("#confirmacao").classList.add("escondido");
}

function confirmarPedido() {
    const phoneNumber = "5521965110324";

    const pratoSelecionado = comidaSelecionada.querySelector('h1').innerHTML;
    const bebidaSelecionado = bebidaSelecionada.querySelector('h1').innerHTML;
    const sobremesaSelecionado = sobremesaSelecionada.querySelector('h1').innerHTML;

    const precoComida = Number(comidaSelecionada.querySelector('h3').innerHTML.replace('R$', '').replace(',', '.'));
    const precoBebida = Number(bebidaSelecionada.querySelector('h3').innerHTML.replace('R$', '').replace(',', '.'));
    const precoSobremesa = Number(sobremesaSelecionada.querySelector('h3').innerHTML.replace('R$', '').replace(',', '.'));

    const total = precoComida + precoBebida + precoSobremesa;

    const mensagem = `Olá, gostaria de fazer o pedido:\n- Prato: ${pratoSelecionado}\n- Bebida: ${bebidaSelecionado}\n- Sobremesa: ${sobremesaSelecionado}\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensagem)}`;

    window.open(whatsappLink, "_blank");
}