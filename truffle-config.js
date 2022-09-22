const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  mocha: {},
  compilers: {
    solc: {
      version: '0.8.16'
    }
  },
  networks: {
    loc_development_development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    },
    "inf_solidity-blog-app_goerli": {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('/Users/davidrakosi/dev-wallet/dev-wallet.env', 'utf-8'), "https://goerli.infura.io/v3/84356f3bc0d14e959770cbb97274c912")
    }
  }
};
