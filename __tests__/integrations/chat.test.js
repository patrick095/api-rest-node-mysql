const Client = require("socket.io-client");
const app = require("../../src/app");

describe("my awesome project", () => {
    let io, clientSocket, port;
  beforeAll((done) => {
    server = require('http').createServer(app);
    io = require('socket.io')(server, {
        cors: { 
            origin: "*" , 
            methods: [ "GET" , "POST" ]
        } 
    });
    server.listen(()=>{
        port = server.address().port;
        clientSocket = new Client(`http://localhost:${port}`);
        require('../../src/controllers/chatController').io(io);
        clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    // clientSocket.close();
  });

  it("should receive a msg", (done) => {
    clientSocket.on("wellcome", (newMsgs) => {
      expect(newMsgs).toHaveProperty('id', 1);
      done();
    });
  });

  it('should receive a "hello" mensage',(done) => {
      clientSocket.emit("sendMsg", {msg: "hello", author: "test"});
      clientSocket.on("newMensages", newMsgs => {
          expect(newMsgs.msgs[0].msg).toContain("hello");
          done();
      });
  });
});