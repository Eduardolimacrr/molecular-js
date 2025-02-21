// services/pedido.service.js
const { Service } = require("moleculer");
const mysql = require("mysql2");

module.exports = {
  name: "pedido", // Nome do serviço

  // Definição de ações do serviço
  actions: {
    // Ação para criar um pedido
    async criar(ctx) {
      const { nome_cliente, tipo_pao, tipo_carne, opcionais } = ctx.params;

      // Conexão com o banco de dados MySQL
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root", // Altere para seu usuário do MySQL
        password: "", // Altere para sua senha do MySQL
        database: "pedidos", // Nome do banco de dados
      });

      // Query para inserir o pedido no banco
      const query =
        "INSERT INTO pedidos (nome_cliente, tipo_pao, tipo_carne, opcionais) VALUES (?, ?, ?, ?)";

      try {
        const [results] = await connection.promise().execute(query, [
          nome_cliente,
          tipo_pao,
          tipo_carne,
          opcionais,
        ]);

        connection.end(); // Fecha a conexão após a operação

        // Retorna a resposta
        return {
          id: results.insertId,
          nome_cliente,
          tipo_pao,
          tipo_carne,
          opcionais,
        };
      } catch (err) {
        connection.end(); // Fecha a conexão em caso de erro
        throw new Error("Erro ao criar pedido: " + err.message);
      }
    },

    // Ação para listar todos os pedidos
    async listar() {
      // Conexão com o banco de dados MySQL
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root", // Altere para seu usuário do MySQL
        password: "", // Altere para sua senha do MySQL
        database: "pedidos", // Nome do banco de dados
      });

      try {
        const [results] = await connection.promise().query("SELECT * FROM pedidos");

        connection.end(); // Fecha a conexão após a operação

        return results;
      } catch (err) {
        connection.end(); // Fecha a conexão em caso de erro
        throw new Error("Erro ao listar pedidos: " + err.message);
      }
    },
  },
};

