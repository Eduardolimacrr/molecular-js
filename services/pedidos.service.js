const { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker();

broker.createService({
  name: "pedidos",
  actions: {
    novoPedido(ctx) {
      const pedido = ctx.params;

      console.log("Dados do pedido recebidos:");
      console.log("Pão:", pedido.pao);
      console.log("Carne:", pedido.carne);
      console.log("Opcionais:", pedido.opcionais);
      console.log("Observações:", pedido.observacoes);

      // Aqui você salvaria o pedido no banco de dados ou faria qualquer outra ação necessária

      return { status: "Pedido recebido com sucesso!", pedidoRecebido: pedido };
    }
  }
});

broker.start();