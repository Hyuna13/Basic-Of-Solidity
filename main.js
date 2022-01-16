const serverUrl = "https://k8bygw1pnhy3.usemoralis.com:2053/server";
const appId = "35EiTduCBBfVaD994Rp8bCRzVFPpEttWx5QlnXla";
Moralis.start({ serverUrl, appId });

let hompage = "http://127.0.0.1:5500/index.html";
if (Moralis.User.current() == null && window.location.href != hompage) {
  document.querySelector('body').style.display = 'none';
  window.location.href = 'index.html';
}

login = async () => {
  await Moralis.authenticate().then(async function (user) {
    console.log("logged in");
    user.set("name", document.getElementById('user-username').value);
    user.set("email", document.getElementById('user-email').value);
    await user.save();
    window.location.href = "dashboard.html";
  })
}

logout = async () => {
  await Moralis.User.logOut();
  window.location.href = "index.html";
}

getTransactions = async () => {
  console.log("get transactions clicked");
  const options = { chain: "rinkeby", address: "0x6A2886022FA54cbe1B5cA9E1919ac11dD972C808"};
  const transactions = await Moralis.Web3API.account.getTransactions(options);
  console.log(transactions);

  if(transactions.total > 0){
    let table = `
    <table class="table">
    <thread>
        <tr>
            <th scope="col">Transactions</th>
            <th scope="col">Block Number</th>
            <th scope="col">Age</th>
            <th scope="col">Type</th>
            <th scope="col">Fee</th>
            <th scope="col">Value</th>
        </tr>
    </thread>
    <tbody id="theTransactions">
    </tbody>
    </table> 
    `

    document.querySelector("#tableOfTransactions").innerHTML = table;

    transactions.result.forEach(t => {
      let content = `
      <tr>
        <td><a href="https://rinkeby.etherscan.io/tx/${t.hash}" target="_blank" rel="noopener noreferrer">${t.hash}</a></td>
        <td><a href="https://rinkeby.etherscan.io/block/${t.block_number}" target="_blank" rel="noopener noreferrer">${t.block_number}</a></td>
        <td>${millisecondsToTime(Date.parse(new Date()) - Date.parse(t.block_timestamp))}</td>
        <td>${t.from_address == Moralis.User.current().get('ethAddress') ? 'Outgoing' : 'Incoming'}</td>
        <td>${((t.gas * t.gas_price / 1e18).toFixed(5))} ETH</td>
        <td>${(t.value / 1e18).toFixed(5)} ETH</td>
      </tr>
      `

      theTransactions.innerHTML += content;
    })
  }
}

getBalances = async () => {
  console.log('get balances clicked');
  const ethBalance = await Moralis.Web3API.account.getNativeBalance();
  const ropstenBalance = await Moralis.Web3API.account.getNativeBalance({chain: "ropsten"});
  const rinkebyBalance = await Moralis.Web3API.account.getNativeBalance({chain: "rinkeby"});

  let content = document.querySelector("#userBalances").innerHTML = `
  <table class="table">
      <thread>
        <tr>
            <th scope="col">Chain</th>
            <th scope="col">Balance</th>
        </tr>
      </thread>
      <tbody>
        <tr>
            <th>Ether</th>
            <td>${(ethBalance.balance / 1e18).toFixed(5)} ETH</td>
        </tr>
        <tr>
            <th>Ropsten</th>
            <td>${(ropstenBalance.balance / 1e18).toFixed(5)} ETH</td>
        </tr>
        <tr>
            <th>Rinkeby</th>
            <td>${(rinkebyBalance.balance / 1e18).toFixed(5)} ETH</td>
        </tr>
      </tbody>
    </table>
  `
}


millisecondsToTime = (ms) => {
    let minutes = Math.floor((ms / (1000 * 60)));
    let hours = Math.floor((ms / (1000 * 60 * 60)));
    let days = Math.floor((ms / (1000 * 60 * 60 * 24)));
    if(days < 1){
      if(hours < 1){
        if(minutes < 1){
          return `less than a minute ago`
        } else return `${minutes} minutes(s) ago`
      } else return `${hours} hours(s) ago`
    } else return `${days} days(s) ago`
}


if (document.querySelector("#btn-login") != null) {
  document.querySelector("#btn-login").onclick = login;
}
if (document.querySelector("#btn-logout") != null) {
  document.querySelector("#btn-logout").onclick = logout;
}
if (document.querySelector("#get-transactions-link") != null) {
  document.querySelector("#get-transactions-link").onclick = getTransactions;
}
if (document.querySelector("#get-balances-link") != null) {
  document.querySelector("#get-balances-link").onclick = getBalances;
}
