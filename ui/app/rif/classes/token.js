export default class Token {
  constructor (name, symbol, address, networkChannels, userChannels, networkAddress, joined, userBalance) {
    this.name = name;
    this.symbol = symbol;
    this.address = address;
    this.networkChannels = networkChannels;
    this.userChannels = userChannels;
    this.networkAddress = networkAddress;
    this.joined = joined;
    this.userBalance = userBalance;
  }
}
