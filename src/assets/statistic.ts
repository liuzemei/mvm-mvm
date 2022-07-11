export const FactoryAddress = '0xBcA0f5698AECe555F7EbBFc42EF3ebfE71f960eE';

export const RouterAddress = `0xe4aeAc26BCd161aFAEea468AC22F45FE5a35737F`;

export const MVMRouterAddress = `0x774A9E576f14d81d7fB439efB1Eb14973a7144Fb`;

export const BridgeAddress = `0x96dC880Ed035CFdd2F334874379bb6A128aca788`;

export const RegistryAddress = `0x3c84B6C98FBeB813e05a7A7813F0442883450B1F`;

export const RegistryProcess = `bd670872-76ce-3263-b933-3aa337e212a4`;

export const CNBAssetID = '965e5c6e-434c-3fa9-b780-c50f43cd955c';
export const CNBAmount = '0.00000001';
export const CNBAddress = '0x910Fb1751B946C7D691905349eC5dD250EFBF40a';

export const FactoryABI = [
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_feeToSetter',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'token0',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'token1',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'pair',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'PairCreated',
    'type': 'event',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'INIT_CODE_PAIR_HASH',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'allPairs',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'allPairsLength',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'address',
        'name': 'tokenA',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'tokenB',
        'type': 'address',
      },
    ],
    'name': 'createPair',
    'outputs': [
      {
        'internalType': 'address',
        'name': 'pair',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'feeTo',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'feeToSetter',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'getPair',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'address',
        'name': '_feeTo',
        'type': 'address',
      },
    ],
    'name': 'setFeeTo',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'address',
        'name': '_feeToSetter',
        'type': 'address',
      },
    ],
    'name': 'setFeeToSetter',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
];

export const RouterABI = [
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_factory',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': '_WETH',
        'type': 'address',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'inputs': [],
    'name': 'WETH',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'tokenA',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'tokenB',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'amountADesired',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountBDesired',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountAMin',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountBMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'addLiquidity',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountA',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountB',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'liquidity',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'token',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'amountTokenDesired',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountTokenMin',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountETHMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'addLiquidityETH',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountToken',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountETH',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'liquidity',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'payable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'factory',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountOut',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'reserveIn',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'reserveOut',
        'type': 'uint256',
      },
    ],
    'name': 'getAmountIn',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountIn',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'pure',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountIn',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'reserveIn',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'reserveOut',
        'type': 'uint256',
      },
    ],
    'name': 'getAmountOut',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountOut',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'pure',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountOut',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
    ],
    'name': 'getAmountsIn',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountIn',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
    ],
    'name': 'getAmountsOut',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountA',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'reserveA',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'reserveB',
        'type': 'uint256',
      },
    ],
    'name': 'quote',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountB',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'pure',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'tokenA',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'tokenB',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'liquidity',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountAMin',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountBMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'removeLiquidity',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountA',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountB',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'token',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'liquidity',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountTokenMin',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountETHMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'removeLiquidityETH',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountToken',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountETH',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'token',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'liquidity',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountTokenMin',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountETHMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'removeLiquidityETHSupportingFeeOnTransferTokens',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountETH',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'token',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'liquidity',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountTokenMin',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountETHMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
      {
        'internalType': 'bool',
        'name': 'approveMax',
        'type': 'bool',
      },
      {
        'internalType': 'uint8',
        'name': 'v',
        'type': 'uint8',
      },
      {
        'internalType': 'bytes32',
        'name': 'r',
        'type': 'bytes32',
      },
      {
        'internalType': 'bytes32',
        'name': 's',
        'type': 'bytes32',
      },
    ],
    'name': 'removeLiquidityETHWithPermit',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountToken',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountETH',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'token',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'liquidity',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountTokenMin',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountETHMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
      {
        'internalType': 'bool',
        'name': 'approveMax',
        'type': 'bool',
      },
      {
        'internalType': 'uint8',
        'name': 'v',
        'type': 'uint8',
      },
      {
        'internalType': 'bytes32',
        'name': 'r',
        'type': 'bytes32',
      },
      {
        'internalType': 'bytes32',
        'name': 's',
        'type': 'bytes32',
      },
    ],
    'name': 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountETH',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'tokenA',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'tokenB',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'liquidity',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountAMin',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountBMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
      {
        'internalType': 'bool',
        'name': 'approveMax',
        'type': 'bool',
      },
      {
        'internalType': 'uint8',
        'name': 'v',
        'type': 'uint8',
      },
      {
        'internalType': 'bytes32',
        'name': 'r',
        'type': 'bytes32',
      },
      {
        'internalType': 'bytes32',
        'name': 's',
        'type': 'bytes32',
      },
    ],
    'name': 'removeLiquidityWithPermit',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amountA',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountB',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountOut',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'swapETHForExactTokens',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]',
      },
    ],
    'stateMutability': 'payable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountOutMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'swapExactETHForTokens',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]',
      },
    ],
    'stateMutability': 'payable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountOutMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'swapExactETHForTokensSupportingFeeOnTransferTokens',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountIn',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountOutMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'swapExactTokensForETH',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountIn',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountOutMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'swapExactTokensForETHSupportingFeeOnTransferTokens',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountIn',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountOutMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'swapExactTokensForTokens',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountIn',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountOutMin',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountOut',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountInMax',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'swapTokensForExactETH',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amountOut',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountInMax',
        'type': 'uint256',
      },
      {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'name': 'swapTokensForExactTokens',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'stateMutability': 'payable',
    'type': 'receive',
  },
];

export const MVMRouterABI = [
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_router',
        'type': 'address',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'asset',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'addLiquidity',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'token',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'approveTest',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'claim',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'errorBytes',
    'outputs': [
      {
        'internalType': 'bytes',
        'name': '',
        'type': 'bytes',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'errorMsg',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'errorStatus',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'operations',
    'outputs': [
      {
        'internalType': 'address',
        'name': 'asset',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'deadline',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'pair',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'tokenA',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'tokenB',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'liquidity',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountAMin',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'amountBMin',
        'type': 'uint256',
      },
    ],
    'name': 'removeLiquidity',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'token',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'transferTest',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
];

export const BridgeABI = [
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'addr',
        'type': 'address',
      },
    ],
    'name': 'bind',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'bridges',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'asset',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'deposit',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
];

export const RegistryABI = [
  {
    'type': 'constructor',
    'stateMutability': 'nonpayable',
    'inputs': [{ 'type': 'bytes', 'name': 'raw', 'internalType': 'bytes' }, {
      'type': 'uint128',
      'name': 'pid',
      'internalType': 'uint128',
    }],
  }, {
    'type': 'event',
    'name': 'AssetCreated',
    'inputs': [{ 'type': 'address', 'name': 'at', 'internalType': 'address', 'indexed': true }, {
      'type': 'uint256',
      'name': 'id',
      'internalType': 'uint256',
      'indexed': false,
    }],
    'anonymous': false,
  }, {
    'type': 'event',
    'name': 'Halted',
    'inputs': [{ 'type': 'bool', 'name': 'state', 'internalType': 'bool', 'indexed': false }],
    'anonymous': false,
  }, {
    'type': 'event',
    'name': 'Iterated',
    'inputs': [{
      'type': 'uint256[4]',
      'name': 'from',
      'internalType': 'uint256[4]',
      'indexed': false,
    }, { 'type': 'uint256[4]', 'name': 'to', 'internalType': 'uint256[4]', 'indexed': false }],
    'anonymous': false,
  }, {
    'type': 'event',
    'name': 'MixinEvent',
    'inputs': [{ 'type': 'uint64', 'name': 'nonce', 'internalType': 'uint64', 'indexed': true }, {
      'type': 'address',
      'name': 'user',
      'internalType': 'address',
      'indexed': true,
    }, { 'type': 'address', 'name': 'asset', 'internalType': 'address', 'indexed': true }, {
      'type': 'uint256',
      'name': 'amount',
      'internalType': 'uint256',
      'indexed': false,
    }, { 'type': 'bytes', 'name': 'extra', 'internalType': 'bytes', 'indexed': false }, {
      'type': 'uint64',
      'name': 'timestamp',
      'internalType': 'uint64',
      'indexed': false,
    }],
    'anonymous': false,
  }, {
    'type': 'event',
    'name': 'MixinTransaction',
    'inputs': [{ 'type': 'bytes', 'name': 'raw', 'internalType': 'bytes', 'indexed': false }],
    'anonymous': false,
  }, {
    'type': 'event',
    'name': 'UserCreated',
    'inputs': [{ 'type': 'address', 'name': 'at', 'internalType': 'address', 'indexed': true }, {
      'type': 'bytes',
      'name': 'members',
      'internalType': 'bytes',
      'indexed': false,
    }],
    'anonymous': false,
  }, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{ 'type': 'uint256', 'name': '', 'internalType': 'uint256' }],
    'name': 'GROUP',
    'inputs': [{ 'type': 'uint256', 'name': '', 'internalType': 'uint256' }],
  }, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{ 'type': 'bool', 'name': '', 'internalType': 'bool' }],
    'name': 'HALTED',
    'inputs': [],
  }, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{ 'type': 'uint64', 'name': '', 'internalType': 'uint64' }],
    'name': 'INBOUND',
    'inputs': [],
  }, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{ 'type': 'uint64', 'name': '', 'internalType': 'uint64' }],
    'name': 'OUTBOUND',
    'inputs': [],
  }, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{ 'type': 'uint128', 'name': '', 'internalType': 'uint128' }],
    'name': 'PID',
    'inputs': [],
  }, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{ 'type': 'uint256', 'name': '', 'internalType': 'uint256' }],
    'name': 'VERSION',
    'inputs': [],
  }, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{ 'type': 'uint128', 'name': '', 'internalType': 'uint128' }],
    'name': 'assets',
    'inputs': [{ 'type': 'address', 'name': '', 'internalType': 'address' }],
  }, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{ 'type': 'uint256', 'name': '', 'internalType': 'uint256' }],
    'name': 'balances',
    'inputs': [{ 'type': 'uint128', 'name': '', 'internalType': 'uint128' }],
  }, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [{ 'type': 'bool', 'name': '', 'internalType': 'bool' }],
    'name': 'burn',
    'inputs': [{ 'type': 'address', 'name': 'user', 'internalType': 'address' }, {
      'type': 'uint256',
      'name': 'amount',
      'internalType': 'uint256',
    }, { 'type': 'bytes', 'name': 'extra', 'internalType': 'bytes' }],
  }, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [{ 'type': 'bool', 'name': '', 'internalType': 'bool' }],
    'name': 'claim',
    'inputs': [{ 'type': 'address', 'name': 'asset', 'internalType': 'address' }, {
      'type': 'uint256',
      'name': 'amount',
      'internalType': 'uint256',
    }],
  }, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{ 'type': 'address', 'name': '', 'internalType': 'address' }],
    'name': 'contracts',
    'inputs': [{ 'type': 'uint256', 'name': '', 'internalType': 'uint256' }],
  }, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'halt',
    'inputs': [{ 'type': 'bytes', 'name': 'raw', 'internalType': 'bytes' }],
  }, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'iterate',
    'inputs': [{ 'type': 'bytes', 'name': 'raw', 'internalType': 'bytes' }],
  }, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [{ 'type': 'bool', 'name': '', 'internalType': 'bool' }],
    'name': 'mixin',
    'inputs': [{ 'type': 'bytes', 'name': 'raw', 'internalType': 'bytes' }],
  }, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{ 'type': 'bytes', 'name': '', 'internalType': 'bytes' }],
    'name': 'users',
    'inputs': [{ 'type': 'address', 'name': '', 'internalType': 'address' }],
  }];

export const Erc20ABI = [
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'spender',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256',
      },
    ],
    'name': 'Approval',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256',
      },
    ],
    'name': 'Transfer',
    'type': 'event',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address',
      },
    ],
    'name': 'allowance',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256',
      },
    ],
    'name': 'approve',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'who',
        'type': 'address',
      },
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256',
      },
    ],
    'name': 'transfer',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256',
      },
    ],
    'name': 'transferFrom',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
];

export const TokenList = [
  {
    'chainId': 83927,
    'address': '0x001fB10b1bFede8505AB138c2Bb2E239CB3b50dC',
    'asset_id': '965e5c6e-434c-3fa9-b780-c50f43cd955c',
    'name': 'Chui Niu Bi',
    'symbol': 'CNB',
    'decimals': 8,
    'logoURI': 'https://mixin-images.zeromesh.net/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128',
  },
  {
    'chainId': 83927,
    'address': '0x71c1C2D82b39C0e952751c9BEA39c28c70c47Ff4',
    'asset_id': '66152c0b-3355-38ef-9ec5-cae97e29472a',
    'name': 'NXCoin',
    'symbol': 'NXC',
    'decimals': 8,
    'logoURI': 'https://images.mixin.one/yH_I5b0GiV2zDmvrXRyr3bK5xusjfy5q7FX3lw3mM2Ryx4Dfuj6Xcw8SHNRnDKm7ZVE3_LvpKlLdcLrlFQUBhds=s128',
  },
  {
    'chainId': 83927,
    'address': '0xCbc58c6EFd6E96d50888f8439d82d0402fE4C476',
    'asset_id': 'c6d0c728-2624-429b-8e0d-d9d19b6592fa',
    'name': 'Bitcoin',
    'symbol': 'BTC',
    'decimals': 8,
    'logoURI': 'https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128',
  },
  {
    'chainId': 83927,
    'address': '0x356c9d95144D42B7C13d5bA44308180eF55aA3CC',
    'asset_id': '6cfe566e-4aad-470b-8c9a-2fd35b49c68d',
    'name': 'EOS',
    'symbol': 'EOS',
    'decimals': 8,
    'logoURI': 'https://mixin-images.zeromesh.net/OTwqLjEwc6v0JutJc-1sYkh_juFOvVbFz26WvvwfLGdKq6ZtwAT-wKhX0k-5PsgOK_Pd9rCQjZfwMJmiNXCBzpHnjapBtkCqAVCTCg=s128',
  },
  {
    'chainId': 83927,
    'address': '0x0412c009c27837B6891763d757Bb76cC8C4fE4A5',
    'asset_id': 'f5ef6b5d-cc5a-3d90-b2c0-a2fd386e7a3c',
    'name': 'BOX Token',
    'symbol': 'BOX',
    'decimals': 8,
    'logoURI': 'https://mixin-images.zeromesh.net/ml7tg1ZGrQt6IJSvEusWFfthosOB98GWN7r4EkmgSP8tbJHxK7OWki9zfZFFDCDOJE0nlLBR6dc4nbUguXE3Bg4=s128',
  },
  {
    'chainId': 83927,
    'address': '0x111323250Cf7734565fD0eB8ac917c47c0d1564E',
    'asset_id': 'c94ac88f-4671-3976-b60a-09064f1811e8',
    'name': 'Mixin',
    'symbol': 'XIN',
    'decimals': 8,
    'logoURI': 'https://mixin-images.zeromesh.net/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128',
  },
  {
    'chainId': 83927,
    'address': '0x19077536bbc955c891C073d667f1A1341c9d0fD2',
    'asset_id': '43d61dcd-e413-450d-80b8-101d5e903357',
    'name': 'Ether',
    'symbol': 'ETH',
    'decimals': 8,
    'logoURI': 'https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128',
  },
  {
    'chainId': 83927,
    'address': '0xd71d2178C4950f26927f426D5434666ac7f3E62F',
    'asset_id': 'eea900a8-b327-488c-8d8d-1428702fe240',
    'name': 'MobileCoin',
    'symbol': 'MOB',
    'decimals': 8,
    'logoURI': 'https://mixin-images.zeromesh.net/eckqDQi50ZUCoye5mR7y6BvlbXX6CBzkP89BfGNNH6TMNuyXYcCUd7knuIDpV_0W7nT1q3Oo9ooVnMDGjl8-oiENuA5UVREheUu2=s128',
  },
  {
    'chainId': 83927,
    'address': '0x4B2fE68B8c40bDa8c1553bC5b117C56D4b7A557F',
    'asset_id': '4d8c508b-91c5-375b-92b0-ee702ed2dac5',
    'name': 'Tether USD',
    'symbol': 'USDT',
    'decimals': 8,
    'logoURI': 'https://mixin-images.zeromesh.net/ndNBEpObYs7450U08oAOMnSEPzN66SL8Mh-f2pPWBDeWaKbXTPUIdrZph7yj8Z93Rl8uZ16m7Qjz-E-9JFKSsJ-F=s128',
  },
  {
    'chainId': 83927,
    'address': '0x1cF1f0e83333209A174353c2089355c407635A1c',
    'asset_id': '31d2ea9c-95eb-3355-b65b-ba096853bc18',
    'name': 'Pando USD',
    'symbol': 'pUSD',
    'decimals': 8,
    'logoURI': 'https://mixin-images.zeromesh.net/cH4GWuPXbzeZl6OOunpn7BxE25n3v8URwnNszs0FpZqv3OTlxP1zpzKw89VKTpBwWL-Ned1R36mmy1C4GMuPX1rL-PjfEJ2zby9V=s128',
  },
  {
    'chainId': 83927,
    'address': '0x1a684e8faF6524662b138eE395ef3FfA18388206',
    'asset_id': '4f2ec12c-22f4-3a9e-b757-c84b6415ea8f',
    'name': 'Quorum Token',
    'symbol': 'RUM',
    'decimals': 8,
    'logoURI': 'https://mixin-images.zeromesh.net/e_y4q9JIdP1PZbwmwO_6v-fx7_ZyifODuYtHvLQDrkLNwH3pQTDVY0EHZA394gjZawwyt3vPC7NlMvyT2nEuPypeDioV_OMd6T8=s128',
  }];

export const TokenMap: any = {};

TokenList.forEach(token => TokenMap[token.address] = token);
