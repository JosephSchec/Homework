'use strict';

(function () {
    const socketIo = io();

    const loginPage = $('#login');
    loginPage.submit(e => {
        const allUsers = $('#listOfUsers');
        socketIo.on('allUsers', users => {
            users.forEach(user => {
                if (!document.getElementById(user)) {
                    allUsers.append(`<li id="${user}">${user}</li>`)
                }
            });
        });
        e.preventDefault();
        socketIo.emit('login', $('#name').val(), res => {

            if (res) {
                $('#err').text(res);
            }
            else {
                loginPage.slideUp();
                $('#messagesContainer').slideDown();
                $('#listOfUsersContainer').slideDown();

                const messageDiv = $('#messages');

                socketIo.on('message', (msg) => {
                    messageDiv.append(`<div>${msg.user}: ${msg.msg}</div>`)
                })
                socketIo.on('info', (msg) => {
                    messageDiv.append(`<div class='error'>${msg}</div>`)
                })



                const message = $('#message');
                //on input is jquery not eventEmmitter
                message.on('input', () => {
                    socketIo.emit('typing', true)
                });
                socketIo.on('typing', text => {
                    setTimeout(() => $('#isTyping').text(text), 1000);
                })
                $('#messageForm').submit(e => {
                    e.preventDefault();
                    socketIo.emit('message', message.val())
                    socketIo.emit('typing', false)

                    message.val('');
                })
            }

        });

    })



    //socketIo.emit('message','hey from client')
}());