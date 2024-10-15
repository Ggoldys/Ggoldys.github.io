function openChat()
{
    var chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.remove('d-none'); 
    chatWindow.classList.add('d-block'); 

    var overlay = document.getElementById('overlay')
    overlay.classList.remove('d-none'); 
    overlay.classList.add('d-block'); 
}

function closeChat()
{
    var chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.remove('d-block'); 
    chatWindow.classList.add('d-none');  

    var overlay = document.getElementById('overlay')
    overlay.classList.remove('d-block'); 
    overlay.classList.add('d-none'); 
}

function getTime()
{
    var currentdate = new Date(); 
    var hours = String(currentdate.getHours()).padStart(2, '0');
    var minutes = String(currentdate.getMinutes()).padStart(2, '0'); 
    var datetime = hours + ":" + minutes;
    return datetime;
}

function GetMsgs()
{
    var msgs = localStorage.getItem('chat')
    if (msgs === null) {
        msgs = []; 
    } else {
        try {
            msgs = JSON.parse(msgs);
            if (!Array.isArray(msgs)) {
                throw new Error("Parsed msgs is not an array");
            }
        } catch (error) {
            console.error("Error parsing msgs from localStorage:", error);
            msgs = []; 
        }
    }
    return msgs
}

function createMsgUser(msg) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'd-flex flex-row justify-content-end mb-2';
    messageDiv.innerHTML = `
        <div>
            <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${msg['text']}</p>
            <p class="small me-3 mb-1 rounded-3 text-muted d-flex justify-content-end">${msg['time']}</p>
        </div>
        <img src="img/avatar2.png" alt="avatar 1" style="width: 45px; height: 100%;">
    `;
    return messageDiv;
}

function createMsgBot(msg) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'd-flex flex-row justify-content-start mb-2';
    messageDiv.innerHTML = `
        <img src="img/avatar_bot.png" alt="avatar 1" style="width: 45px; height: 100%;">
        <div>
            <p class="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">${msg['text']}</p>
            <p class="small ms-3 mb-1 rounded-3 text-muted d-flex">${msg['time']}</p>
        </div>
    `;
    return messageDiv;
}

function createMsgs(msg)
{
    if(msg['type']==='user')
    {
        return createMsgUser(msg)
    }
    if(msg['type']==='bot')
    {
        return createMsgBot(msg)
    }
}

function upd_chat()
{
    var messageContainer = document.getElementById('messageContainer');
    
    var msgs = GetMsgs()
    msgs.forEach(msg => {
        var msgEl = createMsgs(msg);
        messageContainer.appendChild(msgEl);
    });
}

function clearChat()
{
    localStorage.removeItem("chat")
    var messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = '';
}

function getAnswer(msg)
{
    msg = msg.toLowerCase()
    switch (true) {
        case msg.includes('телефон') || msg.includes('мобильник') || msg.includes('смартфон'):
            answers = ['Телефон можно приобрести по данной ссылке - <a href="index.html?ctg=smartphones" style="color: blue;">перейти</a>'];
            break;
        case msg.includes('ноутбук') || msg.includes('комп') || msg.includes('пк'):
            answers = ['Ноутбук можно приобрести по данной ссылке - <a href="index.html?ctg=laptop" style="color: blue;">перейти</a>'];
            break;
        case msg.includes('книга') || msg.includes('книги'):
            answers = ['Книги можно приобрести по данной ссылке - <a href="index.html?ctg=books" style="color: blue;">перейти</a>'];
            break;
        case msg.includes('позвоните') || msg.includes('наберите') || msg.includes('оператор'):
            answers = ['Здравствуйте, сообщите свой номер, мы Вам перезвоним', 'Здравствуйте, сообщите свой номер, оператор Вас наберет'];
            break;
        case msg.includes('доставка') || msg.includes('как заказать'):
            answers = ['Доставка осуществляется по всему региону. Вы можете сделать заказ через наш сайт, и мы свяжемся с вами для подтверждения.'];
            break;
        case msg==='привет' || msg==='здравтсвуйте' :
            answers = ['Здравствуйте', 'Здравствуйте, чем могу помочь?', 'Приветствую в нашем магазине, мы всегда готовы помочь'];
            break;
        default:
            answers = ['Мы Вас не понимаем', 'Опишите проблему другими словами']
            break;
    }
    var answer = answers[Math.floor(Math.random()*answers.length)];
    return answer;
}

function sendMsg_bot(msg)
{
    var answer = getAnswer(msg)

    var messageContainer = document.getElementById('messageContainer');
    var msgEl = {
        "text": answer,
        "time": getTime(),
        "type": "bot"
    } 
    const messageDiv = createMsgBot(msgEl);
    messageContainer.appendChild(messageDiv);
    messageInput.value = ''; 
    messageContainer.scrollTop = messageContainer.scrollHeight; 

    var msgs = GetMsgs()
    msgs.push(msgEl)
    localStorage.setItem('chat', JSON.stringify(msgs));
}

function sendMsg()
{
    var messageInput = document.getElementById('messageInput');
    var messageContainer = document.getElementById('messageContainer');

    var messageText = messageInput.value.trim();
    
    if (messageText) {
        var msgEl = {
            "text": messageText,
            "time": getTime(),
            "type": "user"
        } 
        const messageDiv = createMsgUser(msgEl);
        messageContainer.appendChild(messageDiv);
        messageInput.value = ''; 
        
        var msgs = GetMsgs()
        msgs.push(msgEl)
        localStorage.setItem('chat', JSON.stringify(msgs));

        sendMsg_bot(messageText)
    }
}

upd_chat()