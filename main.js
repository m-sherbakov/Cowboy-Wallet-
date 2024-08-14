document.addEventListener('DOMContentLoaded', function() {
    const createWalletElement = document.getElementById('createWallet');
    const walletOptionElement = document.getElementById('walletOption');
    const backButtonElement = document.getElementById('backButton');
    const rpcInputSection = document.getElementById('rpcInputSection');
    const sendButtonSection = document.getElementById('sendButtonSection');
    const transactionInputsSection = document.getElementById('transactionInputsSection');
    const privateKeySection = document.getElementById('privateKeySection'); // Добавляем переменную
    const confirmButton = document.getElementById('confirmButton'); // Добавляем переменную
    const generateKeysContainer = document.getElementById('generateKeysContainer');
    const keyContainer = document.getElementById('keyContainer');
    const sendButton = document.getElementById('sendButton');

    // Обработчик клика на "Create Wallet"
    createWalletElement.addEventListener('click', function() {
        createWalletElement.classList.add('slide-out-left');
        walletOptionElement.classList.add('slide-out-left');

        setTimeout(function() {
            generateKeysContainer.classList.add('show');
            backButtonElement.style.display = 'block'; // Показать кнопку Back
        }, 1000);
    });

    // Обработчик клика на "I have a Wallet"
    walletOptionElement.addEventListener('click', function() {
        createWalletElement.classList.add('slide-out-left');
        walletOptionElement.classList.add('slide-out-left');

        setTimeout(function() {
            rpcInputSection.classList.add('show'); // Показать RPC Input Section
            sendButtonSection.classList.add('show'); // Показать Send Button Section
            backButtonElement.style.display = 'block'; // Показать кнопку Back
        }, 1000);
    });

    // Обработчик клика на "Send"
    sendButton.addEventListener('click', function() {
        rpcInputSection.classList.remove('show'); // Скрыть RPC Input Section
        sendButtonSection.classList.remove('show'); // Скрыть Send Button Section
        transactionInputsSection.classList.add('show'); // Показать поля для ввода транзакции
    });

    // Обработчик клика на "Confirm"
    confirmButton.addEventListener('click', function() {
        console.log("Confirm button clicked");
        transactionInputsSection.classList.remove('show'); // Скрыть поля для ввода транзакции
        privateKeySection.classList.add('show'); // Показать поле ввода приватного ключа
    });

    // Обработчик клика на "Back"
    backButtonElement.addEventListener('click', function() {
        generateKeysContainer.classList.remove('show');
        transactionStatus.style.display = 'none';
        statusImage.src = ''; // Сбрасываем изображение статуса
        statusMessage.textContent = ''; // Сбрасываем текст статуса
        rpcInputSection.classList.remove('show');
        sendButtonSection.classList.remove('show');
        transactionInputsSection.classList.remove('show');
        privateKeySection.classList.remove('show');
        keyContainer.classList.remove('show');
        backButtonElement.style.display = 'none';
        createWalletElement.classList.remove('slide-out-left');
        walletOptionElement.classList.remove('slide-out-left');
    });
});

    // Генерация ключей и отображение их в контейнерах
    generateKeysContainer.addEventListener('click', function() {
        // Генерация ключей (пример с использованием ethers.js)
        const wallet = ethers.Wallet.createRandom();
        const privateKey = wallet.privateKey;
        const publicKey = wallet.publicKey;
        const address = wallet.address;

        // Заполнение текстом элементов
        document.getElementById('privateKey').textContent = privateKey;
        document.getElementById('publicKey').textContent = publicKey;
        document.getElementById('address').textContent = address;

        // Показ контейнера с ключами
        keyContainer.classList.add('show');
    });

    document.getElementById('closeSidebarButton').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('show');
    });
    
    document.getElementById('toggleSidebarButton').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('show');
    });
    
    document.getElementById('closeSidebarButton').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('show');
    });
    
    document.getElementById('checkBalanceButton').addEventListener('click', async function() {
        const rpcUrl = document.getElementById('rpcUrlBalance').value;
        const address = document.getElementById('addressBalance').value;
    
        try {
            const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
            const balance = await provider.getBalance(address);
            document.getElementById('balanceOutput').textContent = `Balance: ${ethers.utils.formatEther(balance)} TOKENS`;
        } catch (error) {
            console.error('Error fetching balance:', error);
            document.getElementById('balanceOutput').textContent = 'Error fetching balance';
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Другие переменные
        const signButton = document.getElementById('signButton');
        const privateKeyInput = document.getElementById('privateKeyInput');
        const transactionStatus = document.getElementById('transactionStatus');
        const statusImage = document.getElementById('statusImage');
        const statusMessage = document.getElementById('statusMessage');
    
        signButton.addEventListener('click', async function() {
            console.log("Sign button clicked");
        
            const privateKey = privateKeyInput.value;
            const recipient = document.getElementById('recipientAddress').value;
            const amount = document.getElementById('amount').value;
            const gasLimit = document.getElementById('gasLimit').value;
            const gasPrice = document.getElementById('gasPrice').value;
            const rpcUrl = document.getElementById('rpcUrlInput').value;
        
            console.log("Values collected:", { privateKey, recipient, amount, gasLimit, gasPrice, rpcUrl });
        
            try {
                console.log("Creating provider with RPC URL:", rpcUrl);
                const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
                const wallet = new ethers.Wallet(privateKey, provider);
        
                console.log("Creating transaction...");
                const transaction = {
                    to: recipient,
                    value: ethers.utils.parseEther(amount),
                    gasLimit: ethers.utils.hexlify(parseInt(gasLimit)),
                    gasPrice: ethers.utils.hexlify(parseInt(gasPrice))
                };
        
                console.log("Sending transaction:", transaction);
                const tx = await wallet.sendTransaction(transaction);
                console.log("Transaction sent:", tx);
        
                await tx.wait(); // Ожидание подтверждения транзакции
                console.log("Transaction confirmed");
        
                statusImage.src = "image/fire.gif";
                statusMessage.textContent = "Successfully";
            } catch (error) {
                console.error('Transaction failed:', error);
                statusImage.src = "image/x.gif";
                statusMessage.textContent = "Error";
            }
        
            privateKeySection.classList.remove('show');
            transactionStatus.style.display = 'flex';
        });
    });
// Функция для копирования текста в буфер обмена
function copyToClipboard(elementId) {
    const textToCopy = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
    });
}