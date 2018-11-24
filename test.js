const Client = require('bitcoin-core');

const wallet1 = new Client({
  network: 'regtest',
  wallet: 'wallet1.dat',
  username: 'foo',
  password: 'j1DuzF7QRUp-iSXjgewO9T_WT1Qgrtz_XWOHCMn_O-Y=',
  port: 18443
});

// const wallet2 = new Client({
//   network: 'regtest',
//   wallet: 'wallet2.dat',
//   username: 'foo',
//   password: 'bar',
//   port: 18443
// });

(async function() {
  // await wallet2.generate(100);

  console.log(await wallet1.getBalance());
  // => 0
  // console.log(await wallet2.getBalance());
  // => 50
}());
