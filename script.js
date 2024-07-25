const bank = [];
const addButton = document.querySelector(".add-account");
const container = document.querySelector('.container');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');
const accountForm = document.querySelector('.account-form');

class Account {

    constructor(accountNumber, name, balance, type){
        this.accountNumber = accountNumber;
        this.name = name;
        this.balance = parseFloat(balance); // Ensure balance is a number
        this.type = type;
    }

    get accountNum(){
        return this.accountNumber;
    }

    get accountName(){
        return this.name;
    }

    get accountBalance(){
        return this.balance;
    }

    get accountType(){
        return this.type;
    }

    deposit(amount){
        this.balance += parseFloat(amount); // Ensure amount is treated as a number

    }

    withdraw(amount){
        const withdrawAmount = parseFloat(amount); // Ensure amount is treated as a number

        if (this.balance >= amount) {
            this.balance -= amount;
        } else {
            alert('Insufficient balance!');
        }
    }

    updateAccName(name){
        this.name = name; 

    }

    updateAccountNum(accountNumber){
        this.accountNumber = accountNumber; 
    }

}


function addAccountToBank(newAccount) {
    bank.push(newAccount);
    displayAccounts();
}

function displayAccounts() {
    container.innerHTML = '';
    bank.forEach((account, index) => {
        const accountCard = document.createElement('div');
        accountCard.classList.add('account-card');
        accountCard.innerHTML = `
            <h3>Account Number: ${account.accountNum}</h3>
            <p>Name: ${account.accountName}</p>
            <p>Balance: $${account.accountBalance}</p>
            <p>Type: ${account.accountType}</p
        `;
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.innerText = "Remove Account";
        removeButton.addEventListener('click', () => removeAccount(index));
        accountCard.appendChild(removeButton);


        const depositButton = document.createElement('button');
        depositButton.innerText = "Deposit";
        depositButton.addEventListener('click', () => performTransaction(index, 'deposit'));
        accountCard.appendChild(depositButton);
        
        const withdrawButton = document.createElement('button');
        withdrawButton.innerText = "Withdraw";
        withdrawButton.addEventListener('click', () => performTransaction(index, 'withdraw'));
        accountCard.appendChild(withdrawButton);

        const updateNameButton = document.createElement('button');
        updateNameButton.innerText = "Update Name";
        updateNameButton.addEventListener('click', () => updateName(index));
        accountCard.appendChild(updateNameButton);

        const updateNumButton = document.createElement('button');
        updateNumButton.innerText = "Update Account Number";
        updateNumButton.addEventListener('click', () => updateAccountNumber(index));
        accountCard.appendChild(updateNumButton);

        container.appendChild(accountCard);
    });
}

function updateName(index){
  const newName = prompt('Enter new name:');
  if(newName === null) return;

  const account = bank[index];
  account.updateAccName(newName);
  displayAccounts();

}

function updateAccountNumber(index){
  const newNum = prompt('Enter new account Number:');
  if (newNum === null) return;
  const accNum = parseFloat(newNum);
  if (isNaN(accNum) || accNum <= 0) {
      alert('Invalid account number');
      return;
  }

  const account = bank[index];
  account.updateAccountNum(accNum);
  displayAccounts();

}

function performTransaction(index, type) {
  const amount = prompt(`Enter amount to ${type}:`);
  if (amount === null) return;
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) {
      alert('Invalid amount');
      return;
  }


  const account = bank[index];
  if (type === 'deposit') {
      account.deposit(amountNum);
  } else if (type === 'withdraw') {
      account.withdraw(amountNum);
  }
  displayAccounts();
}

function removeAccount(index) {
    bank.splice(index, 1);
    displayAccounts();
}


function showForm() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function addAccount(event) {
    event.preventDefault();
    const accountNumber = document.querySelector('#accountNumber').value;
    const name = document.querySelector('#name').value;
    const balance = document.querySelector('#balance').value;
    const type = document.querySelector('#type').value
    let acc = new Account(accountNumber, name, balance, type);
    addAccountToBank(acc);
    closeModal();
    accountForm.reset();
}

addButton.addEventListener('click', showForm);
closeButton.addEventListener('click', closeModal);
accountForm.addEventListener('submit', addAccount);

