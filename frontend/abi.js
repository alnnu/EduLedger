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
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "issuer",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "issuernceDate",
                "type": "string"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "id",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "mane",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "publicKey",
                        "type": "address"
                    }
                ],
                "internalType": "struct Cert.cretencials",
                "name": "credentialSubject",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "contentType",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "content",
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
        "inputs": [],
        "name": "addCert",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string[]",
                        "name": "context",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "certType",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string",
                        "name": "issuer",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "issuernceDate",
                        "type": "string"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "id",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "mane",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "email",
                                "type": "string"
                            },
                            {
                                "internalType": "address",
                                "name": "publicKey",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct Cert.cretencials",
                        "name": "credentialSubject",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "contentType",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "content",
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
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "getCert",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string[]",
                        "name": "context",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "certType",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string",
                        "name": "issuer",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "issuernceDate",
                        "type": "string"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "id",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "mane",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "email",
                                "type": "string"
                            },
                            {
                                "internalType": "address",
                                "name": "publicKey",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct Cert.cretencials",
                        "name": "credentialSubject",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "contentType",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "content",
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
    }
]

