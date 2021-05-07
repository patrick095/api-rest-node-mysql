const { chat } = require('../models')

module.exports = {
    async io(io){
        io.on('connection', async socket =>{
            console.log(socket.id);
            var dbMsgs = await chat.findOne();
            if (dbMsgs === null) {
                const createMsg = await chat.create({msgs: []})
                dbMsgs = createMsg.dataValues
            }

            //Método para converter as mensagens na db em array 
            if (dbMsgs.msgs.length === 0) {
                dbMsgs.msgs = [];
            }
            else {
                dbMsgs.msgs.map((msg,i) =>{
                    dbMsgs.msgs.splice(i,1, JSON.parse(msg));
                })
            }

            //ao entrar vai receber todas as mensagens que já estão salvas
            socket.emit('wellcome', dbMsgs);

            socket.on('update', ()=>{
                socket.emit('wellcome', dbMsgs);
            })

            socket.on('sendMsg',async msg =>{
                const dbMsgs = await chat.findOne();
                var msgs = [...dbMsgs.dataValues.msgs];
                if (dbMsgs.dataValues.msgs.length === 0) {
                    msgs = []
                }
                else {
                    msgs.map((msg,i) =>{
                        msgs.splice(i,1, JSON.parse(msg));
                    })
                }
                const olderMsgs = {...dbMsgs.dataValues, msgs };
                //comando para apagar as mensagens
                if (msg.msg === '/delAllMsg') {
                    olderMsgs.msgs = []
                    const newMsgs = await chat.update({msgs: olderMsgs.msgs}, {
                        where: {
                            id: 1
                        }
                    })
                    return io.emit('newMensages', olderMsgs)
                }
                else if (msg.msg === '/ajuda') {
                    olderMsgs.msgs = [
                        {msg:'Para ajuda digite "/ajuda"', author: 'Sistema'},
                        {msg:'Para apagar seu nome digite "/delName"', author: 'Sistema'},
                        {msg:'Para apagar todas as mensagens digite "/delAllMsg"', author: 'Sistema'},
                    ]
                    return io.emit('newMensages', olderMsgs)
                }
                if (!msg.author) {
                    return socket.emit('alert',"Por favor, insira seu nome")
                }
                olderMsgs.msgs.push(msg);
                const updatedMsgs = await chat.update({msgs: olderMsgs.msgs}, {
                    where: {
                        id: 1
                    }
                })
                io.emit('newMensages', olderMsgs)
            })
        })
    }
}