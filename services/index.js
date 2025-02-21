// index.js (ou arquivo principal do seu servidor)
const { ServiceBroker } = require("moleculer");
const ApiService = require("moleculer-web");
const broker = new ServiceBroker();


broker.createService(require("./pedidos.service.js"));

// Crie o serviço de API usando o moleculer-web
broker.createService({
  name: "api", // Adicione um nome para o serviço API
  mixins: [ApiService],
  settings: {
    port: 3001, // Mude para outra porta, por exemplo, 3001
    routes: [
      {
        aliases: {
          "POST /pedido/criar": "pedido.criar"
        }
      }
    ]
  }
});

// Crie o serviço de pedidos

// Inicie o broker
broker.start();