# service-bitcoin
MESG Service for communication with bitcoin blockchain

# Docs

Bitcoin Core API: https://bitcoin.org/en/developer-reference#bitcoin-core-apis
Bitcoin Core Docker image: https://github.com/ruimarinho/docker-bitcoin-core
Bitcoin Core JS Client: https://github.com/ruimarinho/bitcoin-core
Bitcoin Core JS RPC func: https://github.com/ruimarinho/bitcoin-core/blob/master/src/methods.js

# Bitcoin cli

Get balance of default wallet
```
./bitcoin-cli -rpcuser=foo -rpcpassword=j1DuzF7QRUp-iSXjgewO9T_WT1Qgrtz_XWOHCMn_O-Y= -rpcport=18443 getbalance
```

Mine 1 block
```
./bitcoin-cli -rpcuser=foo -rpcpassword=j1DuzF7QRUp-iSXjgewO9T_WT1Qgrtz_XWOHCMn_O-Y= -rpcport=18443 generate 1
```

Execute send task
```
mesg-core service execute --task send --json ./testdata/send.json SERVICE_ID
```

Show private key
```
./bitcoin-cli -rpcuser=foo -rpcpassword=j1DuzF7QRUp-iSXjgewO9T_WT1Qgrtz_XWOHCMn_O-Y= -rpcport=18443 dumpprivkey ADDRESS
```

Generate an address
```
./bitcoin-cli -rpcuser=foo -rpcpassword=j1DuzF7QRUp-iSXjgewO9T_WT1Qgrtz_XWOHCMn_O-Y= -rpcport=18443 getnewaddress
```

List unspent
```
./bitcoin-cli -rpcuser=foo -rpcpassword=j1DuzF7QRUp-iSXjgewO9T_WT1Qgrtz_XWOHCMn_O-Y= -rpcport=18443 listunspent
```