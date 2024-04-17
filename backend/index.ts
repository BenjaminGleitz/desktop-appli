import {Server} from 'socket.io';

function main() {
    const io = new Server({
        cors: {
            origin: '*',
        }
    });

    // écoute connections entrantes
    io.on('connection', (socket) => {
        console.log('New connection: ', socket.id);

        // écoute messages entrants sur la connexion
        socket.on("message", (message) => {
            console.log("received message: ", message);

            // émet le message à tous les clients connectés
            io.emit("message", message);
        });
    });

    io.listen(3000);

    console.log('Server started on port 3000');
}

main();
