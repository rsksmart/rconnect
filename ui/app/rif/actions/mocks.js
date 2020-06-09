export const mocks = {
  tokens: [{
    'channels': [],
    'address': '0x0b3e32d1d2cabeabeacc686a449aaf8351ffb065',
    'name': 'PesoToken',
    'network_address': '0x230e2854b94c010501d6aced2d900018c07dc7db',
    'symbol': 'UYU',
  }, {
    'channels': [],
    'address': '0x7e4a63cd446571c165817f075142c039cf69069c',
    'name': 'InfuyToken',
    'network_address': '0x41a34c1b6035e89fadecb445dbafe5804bc13a8e',
    'symbol': 'IT',
  }, {
    'channels': [],
    'address': '0x460218fcd497991b380f38b77c61334ad442e7f6',
    'name': 'TestToken',
    'network_address': '0xa6340e1de581c817ff9a15fc2fac398e198850a3',
    'symbol': 'TT',
  }],
  channels: [
    {
      '2-0x7e4A63Cd446571c165817f075142c039Cf69069c': {
        'channel_identifier': 2,
        'settle_timeout': 500,
        'token_network_identifier': '0x41a34C1B6035E89FAdecb445dbAFe5804BC13a8E',
        'total_deposit': '1000000000000000000',
        'state': 'opened',
        'token_address': '0x7e4A63Cd446571c165817f075142c039Cf69069c',
        'reveal_timeout': 50,
        'partner_address': '0xd7387C9b5a2860bFb6e8E8F36c8983B0469C6d18',
        'balance': '1000000000000000000',
        'token_symbol': 'CHN',
        'token_name': 'ChonaToken',
        'sdk_status': 'CHANNEL_OPENED',
        'offChainBalance': '100000000000000000',
        'receivedTokens': '0',
        'sentTokens': '900000000000000000',
        'votes': {'open': {}, 'close': {}},
      },
    },
    {
      '2-0x7e4A63Cd446571c165817f075142c039Cf69069c': {
        'channel_identifier': 3,
        'settle_timeout': 500,
        'token_network_identifier': '0xbe17703153A321e9b9867fD90f194BdD605Cc243',
        'total_deposit': '1000000000000000000',
        'state': 'opened',
        'token_address': '0xe1b8eC5381FCA746E7Fe6d60CEb898FEdB44462A',
        'reveal_timeout': 50,
        'partner_address': '0x46cB37FBf87732846751b79A9aAAB076108d630C',
        'balance': '1000000000000000000',
        'token_symbol': 'LUM',
        'token_name': 'LumToken',
        'sdk_status': 'CHANNEL_OPENED',
        'offChainBalance': '100000000000000000',
        'receivedTokens': '0',
        'sentTokens': '900000000000000000',
        'votes': {'open': {}, 'close': {}},
      },
    }],
  chainAddresses: [
    {
      address: '0x123456789123456789123456789123456',
      chain: '0x80000000',
    },
    {
      address: '0x987654321123113213456465464564489',
      chain: '0x8000003c',
    },
  ],
  subdomains: [
    {
      domainName: 'dominio.rsk',
      name: 'subdomain',
      ownerAddress: '0x219123123213213578237891723891231231123213654',
      parentOwnerAddress: '0x219123123213213578237891723891231231654',
    },
    {
      domainName: 'dominio.rsk',
      name: 'subdomain2',
      ownerAddress: '0x219123123213213578237891723891231231123213654',
      parentOwnerAddress: '0x219123123213213578237891723891231231654',
    },
  ],
};