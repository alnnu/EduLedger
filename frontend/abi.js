export const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_metadataHash",
        "type": "string"
      }
    ],
    "name": "certAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "certs",
    "outputs": [
      {
        "internalType": "string",
        "name": "subject",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "course",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "issuerName",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "publicKey",
            "type": "address"
          }
        ],
        "internalType": "struct Cert.cretencials",
        "name": "credential",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "imageHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "metadataHash",
            "type": "string"
          }
        ],
        "internalType": "struct Cert.display",
        "name": "displayInfo",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "nftContract",
    "outputs": [
      {
        "internalType": "contract NftIPFS",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_issuerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_date",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_subject",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_course",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_metadataHash",
        "type": "string"
      }
    ],
    "name": "addCert",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "subject",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "course",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "issuerName",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "publicKey",
                "type": "address"
              }
            ],
            "internalType": "struct Cert.cretencials",
            "name": "credential",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "imageHash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "metadataHash",
                "type": "string"
              }
            ],
            "internalType": "struct Cert.display",
            "name": "displayInfo",
            "type": "tuple"
          }
        ],
        "internalType": "struct Cert.cert",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_metadataHash",
        "type": "string"
      }
    ],
    "name": "getCert",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "subject",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "course",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "issuerName",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "publicKey",
                "type": "address"
              }
            ],
            "internalType": "struct Cert.cretencials",
            "name": "credential",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "imageHash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "metadataHash",
                "type": "string"
              }
            ],
            "internalType": "struct Cert.display",
            "name": "displayInfo",
            "type": "tuple"
          }
        ],
        "internalType": "struct Cert.cert",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAllCerts",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "subject",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "course",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "issuerName",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "publicKey",
                "type": "address"
              }
            ],
            "internalType": "struct Cert.cretencials",
            "name": "credential",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "imageHash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "metadataHash",
                "type": "string"
              }
            ],
            "internalType": "struct Cert.display",
            "name": "displayInfo",
            "type": "tuple"
          }
        ],
        "internalType": "struct Cert.cert[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "str1",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "str2",
        "type": "string"
      }
    ],
    "name": "compareStrings",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  }
]
