import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Ethbay from '../abis/Ethbay'
import Addressbar from './Addressbar'
import Home from './Home'

class App extends Component {
  state = {
    account: '',
    totalNumber: 0,
    items: [],
    loading: true
  }
123
  async componentDidMount(){
    await this.getWeb3Provider();
    await this.connectToBlockchain();
  }
  
  async getWeb3Provider(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async connectToBlockchain(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts(); //account of metmask
    this.setState({account: accounts[0]}) // store the value of key and that value can be accessed anywhere between different componenets. like a cookie
    const networkId = await web3.eth.net.getId()  //it gives 5777
    const networkData = Ethbay.networks[networkId];
    if(networkData) {
      const deployedEthbay = new web3.eth.Contract(Ethbay.abi, networkData.address); //use abi (bytecode) as bridge
      this.setState({deployedEthbay: deployedEthbay}); // or  this.setState({deployedEthbay});  if name and value is same
      const totalNumber = await deployedEthbay.methods.totalNumber().call(); //totalNumber is public variable in ethbay.sol therefore can be used like this
      console.log(totalNumber);
      this.setState({totalNumber})
      for (var i = 1;i<= totalNumber;i++) {
        const item = await deployedEthbay.methods.items(i).call();
        this.setState({
          items:[...this.state.items, item] //adding new item in the array
        });
      }
      this.setState({loading: false})
      console.log(this.state.items)
    } else {
      window.alert('Ethbay contract is not found in your blockchain.')
    }
  
  }

 
  createItem = async (itemName, itemPrice) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedEthbay.methods.createItem(itemName, itemPrice).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedEthbay.methods.createItem(itemName, itemPrice).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }

  buyItem = async (itemId, sellingPrice) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedEthbay.methods.buyItem(itemId).estimateGas({from: this.state.account, value: sellingPrice})
    this.state.deployedEthbay.methods.buyItem(itemId).send({from: this.state.account, value: sellingPrice, gas: gasAmount })
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }
  
  render() {
    return (
      <div>
        <Addressbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main>
              { this.state.loading 
                ? 
                  <div><p className="text-center">Loading ...</p></div> 
                : 
                  <Home items = {this.state.items}   //transfer the components/args to other file.
                        createItem = {this.createItem}
                        buyItem = {this.buyItem}
                  />}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
