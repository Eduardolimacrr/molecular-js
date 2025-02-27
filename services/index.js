const { ServiceBroker } = require("moleculer");
const ApiService = require("moleculer-web");

const broker = new ServiceBroker();

// Crie o serviço de pedidos
broker.createService(require("./pedidos.service.js"));

// Crie o serviço de API usando o moleculer-web com CORS configurado corretamente
broker.createService({
  name: "api",
  mixins: [ApiService],
  settings: {
    port: 3001,
    cors: {
      origin: "http://localhost:8080", // Permitir apenas o frontend local
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      exposedHeaders: [],
      credentials: true,
      maxAge: 3600
    },
    routes: [
      {
        cors: true, // Habilita CORS diretamente na rota
        path: "/api", // Adicione um path base para todas as rotas da API
        aliases: {
          "POST /pedido/criar": "pedido.criar",
          "GET /pedido/listar": "pedido.listar",
          "DELETE /pedido/:id": "pedido.delete",  // Rota para deletar
          "PUT /pedido/:id": "pedido.update"     // Rota para atualizar status
        }
      }
    ],
    created() {
      console.log("Serviço API (moleculer-web) inicializado!");
    }
  }
});

// Inicie o broker
broker.start().then(() => {
  console.log("Servidor Moleculer rodando na porta 3001");
});