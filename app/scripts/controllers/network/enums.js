const POA = 'poa'
const DAI = 'dai'
const POA_SOKOL = 'sokol'
const MAINNET = 'mainnet'
const ROPSTEN = 'ropsten'
const RINKEBY = 'rinkeby'
const KOVAN = 'kovan'
const GOERLI_TESTNET = 'goerli_testnet'
const CLASSIC = 'classic'
const RSK = 'rsk'
const RSK_TESTNET = 'rsk_testnet'
const RSK_REGTEST = 'rsk_regtest'
const LOCALHOST = 'localhost'

const ETH_TICK = 'ETH'
const POA_TICK = 'POA'
const RSK_TICK = 'RBTC'
const CLASSIC_TICK = 'ETC'

const MAINNET_CHAINID = '0x01'
const ROPSTEN_CHAINID = '0x03'
const RINKEBY_CHAINID = '0x04'
const KOVAN_CHAINID = '0x2a'
const GOERLI_TESTNET_CHAINID = '0x5'
const POA_CHAINID = '0x63'
const DAI_CHAINID = '0x64'
const POA_SOKOL_CHAINID = '0x4D'
const RSK_CHAINID = '0x1E'
const RSK_TESTNET_CHAINID = '0x1F'
const RSK_REGTEST_CHAINID = '0x21'
const CLASSIC_CHAINID = '0x3D'

const POA_CODE = 99
const DAI_CODE = 100
const POA_SOKOL_CODE = 77
const MAINNET_CODE = 1
const ROPSTEN_CODE = 3
const RINKEBY_CODE = 4
const KOVAN_CODE = 42
const GOERLI_TESTNET_CODE = 5
const CLASSIC_CODE = 61
const RSK_CODE = 30
const RSK_TESTNET_CODE = 31
const RSK_REGTEST_CODE = 33;

const POA_DISPLAY_NAME = 'POA'
const DAI_DISPLAY_NAME = 'xDai'
const POA_SOKOL_DISPLAY_NAME = 'Sokol Testnet'
const MAINNET_DISPLAY_NAME = 'Ethereum'
const ROPSTEN_DISPLAY_NAME = 'Ropsten Testnet'
const RINKEBY_DISPLAY_NAME = 'Rinkeby Testnet'
const KOVAN_DISPLAY_NAME = 'Kovan Testnet'
const GOERLI_TESTNET_DISPLAY_NAME = 'Görli Testnet'
const CLASSIC_DISPLAY_NAME = 'Ethereum Classic'
const RSK_DISPLAY_NAME = 'RSK'
const RSK_TESTNET_DISPLAY_NAME = 'RSK Testnet'

const DROPDOWN_POA_DISPLAY_NAME = POA_DISPLAY_NAME
const DROPDOWN_DAI_DISPLAY_NAME = DAI_DISPLAY_NAME
const DROPDOWN_POA_SOKOL_DISPLAY_NAME = POA_SOKOL_DISPLAY_NAME
const DROPDOWN_MAINNET_DISPLAY_NAME = MAINNET_DISPLAY_NAME
const DROPDOWN_ROPSTEN_DISPLAY_NAME = ROPSTEN_DISPLAY_NAME
const DROPDOWN_RINKEBY_DISPLAY_NAME = RINKEBY_DISPLAY_NAME
const DROPDOWN_KOVAN_DISPLAY_NAME = KOVAN_DISPLAY_NAME
const DROPDOWN_GOERLI_TESTNET_DISPLAY_NAME = GOERLI_TESTNET_DISPLAY_NAME
const DROPDOWN_CLASSIC_DISPLAY_NAME = CLASSIC_DISPLAY_NAME
const DROPDOWN_RSK_DISPLAY_NAME = RSK_DISPLAY_NAME
const DROPDOWN_RSK_TESTNET_DISPLAY_NAME = RSK_TESTNET_DISPLAY_NAME

const chainTypes = {
  TEST: 1,
  PROD: 2,
}

const hdRSKMainnetPath = `m/44'/137'/0'/0`
const hdRSKTestnetPath = `m/44'/37310'/0'/0`
const hdETCPath = `m/44'/61'/0'/0`

const customDPaths = {}
customDPaths[RSK] = hdRSKMainnetPath
customDPaths[RSK_TESTNET] = hdRSKTestnetPath
customDPaths[CLASSIC] = hdETCPath

module.exports = {
  POA,
  POA_TICK,
  ETH_TICK,
  RSK_TICK,
  CLASSIC_TICK,
  MAINNET_CHAINID,
  ROPSTEN_CHAINID,
  RINKEBY_CHAINID,
  KOVAN_CHAINID,
  GOERLI_TESTNET_CHAINID,
  POA_CHAINID,
  DAI_CHAINID,
  POA_SOKOL_CHAINID,
  RSK_CHAINID,
  RSK_TESTNET_CHAINID,
  RSK_REGTEST_CHAINID,
  DAI,
  POA_SOKOL,
  MAINNET,
  ROPSTEN,
  RINKEBY,
  KOVAN,
  GOERLI_TESTNET,
  CLASSIC,
  RSK,
  RSK_TESTNET,
  RSK_REGTEST,
  LOCALHOST,
  POA_CODE,
  DAI_CODE,
  POA_SOKOL_CODE,
  MAINNET_CODE,
  ROPSTEN_CODE,
  RINKEBY_CODE,
  KOVAN_CODE,
  GOERLI_TESTNET_CODE,
  CLASSIC_CODE,
  CLASSIC_CHAINID,
  RSK_CODE,
  RSK_TESTNET_CODE,
  RSK_REGTEST_CODE,
  POA_DISPLAY_NAME,
  DAI_DISPLAY_NAME,
  POA_SOKOL_DISPLAY_NAME,
  MAINNET_DISPLAY_NAME,
  ROPSTEN_DISPLAY_NAME,
  RINKEBY_DISPLAY_NAME,
  KOVAN_DISPLAY_NAME,
  GOERLI_TESTNET_DISPLAY_NAME,
  CLASSIC_DISPLAY_NAME,
  RSK_DISPLAY_NAME,
  RSK_TESTNET_DISPLAY_NAME,
  DROPDOWN_POA_DISPLAY_NAME,
  DROPDOWN_DAI_DISPLAY_NAME,
  DROPDOWN_POA_SOKOL_DISPLAY_NAME,
  DROPDOWN_MAINNET_DISPLAY_NAME,
  DROPDOWN_ROPSTEN_DISPLAY_NAME,
  DROPDOWN_RINKEBY_DISPLAY_NAME,
  DROPDOWN_KOVAN_DISPLAY_NAME,
  DROPDOWN_GOERLI_TESTNET_DISPLAY_NAME,
  DROPDOWN_CLASSIC_DISPLAY_NAME,
  DROPDOWN_RSK_DISPLAY_NAME,
  DROPDOWN_RSK_TESTNET_DISPLAY_NAME,
  chainTypes,
  customDPaths,
}
