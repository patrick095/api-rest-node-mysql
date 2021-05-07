# api-rest-node-mysql
api-rest-node 

# frameworks utilizados:
- express.js
- socket.io 
- Sequelize (ORM)

# Banco de dados:
- Postgres (ambiente de desenvolvimento)
- SQLite (ambiente de testes)

# Testes:
- Jest
- socket.io-client
- supertest


# Rotas da API:

### GET('/products') - Retorna um objeto com os 10 primeiros produtos cadastrados no bando de dados.
- Exemplo:

- {
docs:[{id, title, description, url, createdAt, updatedAt},...],
page:'1',
productInfo: {totalPages,totalProducts}
}

### GET('/products?page=1') - Retorna os 10 primeiros produtos cadastrados no bando de dados, cada page retorna 10 produtos.
- Exemplo:
- { 
docs:[{id, title, description, url, createdAt, updatedAt},...],
page:'1',
productInfo: {totalPages,totalProducts} 
}

### GET('/products/1) - Retorna um objeto com os dados do produto com o id 1, onde o 1 é o id do produto.
- Exemplo:
- { id, title, description, url, createdAt, updatedAt }

### POST('/products') - Rota usada para cadastrar um novo produto, retorna o produto criado.
- Exemplo de produto para ser enviado:
- { title, description, url }
- Exemplo de produto recebido como resposta:
- { id, title, description, url, createdAt, updatedAt }

### PUT('/products/1') - Rota usada para moduficar um produto, onde o 1 é o id do produto, retorna o número de rows (produtos) modificados.
- Exemplo de produto para ser enviado:
- { id, title, description, url }
- Exemplo de resposta:
- [ 1 ]

### DELETE('/products/1') - Rota usada para apagar um produto, onde o 1 é o id do produto, retorna o número de rows (produtos) apagados.
- Exemplo de resposta:
1


# Chat da API usando socket.io-client:

### Ao conectar receberá as mensagens salvas através desse listen:
socket.on('wellcome', res => console.log(res));
- Exemplo de mensagem recebida:
- {
        id: 1,
        msgs: [ { msg: 'hello', author: 'test', time: 1620401187746 } ],
        createdAt: '2021-05-07T14:55:00.532Z',
        updatedAt: '2021-05-07T14:55:00.532Z'
      }

### Para enviar mensagens deverá usar o emit 'sendMsg':
- Exemplo: 
- socket.emit('sendMsg', 'mensagem teste');

### Para ouvir quando alguém enviar uma mensagem usar o listen 'newMensages':
socket.on('newMensages', res => console.log(res));
- Exemplo de mensagem recebida:
- {
        id: 1,
        msgs: [ { msg: 'hello', author: 'test', time: 1620401187746 },
                { msg: 'hello2', author: 'test', time: 1620401387946 }],
        createdAt: '2021-05-07T14:55:00.532Z',
        updatedAt: '2021-05-07T14:55:00.532Z'
      }

# Frontend React criado para consumir essa API

[My-first-ReactApp](https://github.com/patrick095/My-First-ReactApp)
