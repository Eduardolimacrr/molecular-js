const mysql = require("mysql2");

module.exports = {
  name: "pedido",

  created() {
    this.connection = mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "Eduardoleads7",
      database: "pedidos",
    });

    this.connection.promise().connect()
      .then(() => {
        console.log("Conectado ao banco de dados");
      })
      .catch((err) => {
        console.error("Erro ao conectar com o MySQL:", err);
        process.exit(1);
      });
  },

  actions: {
    async criar(ctx) {
      const { nome, pao, carne, opcionais } = ctx.params;

      console.log("Dados recebidos:", { nome, carne, pao, opcionais });


      const query =
        "INSERT INTO pedidos (nome, pao, carne, opcionais, status) VALUES (?, ?, ?, ?, ?)";

      try {
        const [results] = await this.connection.promise().execute(query, [
          nome,
          pao,
          carne,
          opcionais,
          'Solicitado',
        ]);

        return {
          id: results.insertId,
          nome,
          pao,
          carne,
          opcionais,
          status: 'Solicitado',
        };
      } catch (err) {
        console.error("Erro ao criar pedido:", err);
        throw new Error("Erro ao criar pedido: " + err.message);
      }
    },

    async listar() {
      const query = "SELECT * FROM pedidos";

      try {
        const [results] = await this.connection.promise().query(query);
        return results;
      } catch (err) {
        console.error("Erro ao listar pedidos:", err);
        throw new Error("Erro ao listar pedidos: " + err.message);
      }
    },

    async delete(ctx) {
      const { id } = ctx.params;

      const query = "DELETE FROM pedidos WHERE id = ?";

      try {
        await this.connection.promise().execute(query, [id]);
        return { message: "Pedido deletado com sucesso" };
      } catch (err) {
        console.error("Erro ao deletar pedido:", err);
        throw new Error("Erro ao deletar pedido: " + err.message);
      }
    },

    async update(ctx) {
      const { id, status } = ctx.params;

      const query = "UPDATE pedidos SET status = ? WHERE id = ?";

      try {
        await this.connection.promise().execute(query, [status, id]);
        return { message: "Status atualizado com sucesso" };
      } catch (err) {
        console.error("Erro ao atualizar pedido:", err);
        throw new Error("Erro ao atualizar pedido: " + err.message);
      }
    },
  },
};