// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

enum SigningRequestStatus {
    Pending,
    Accepted,
    Rejected
}

contract BribeP2P is Ownable {
    using ECDSA for bytes32;

    struct SigningRequest {
        SigningRequestStatus status;
        address counterparty;
        uint256 offer;
        uint256 blockNumber;
        bytes data;
    }

    IERC20 public paymentToken;
    uint256 public signingRequestCount;

    mapping(uint256 => SigningRequest) public signingRequests;

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
        signingRequestCount = 0;
    }

    function pushSigningRequest(
        uint256 _blockNumber,
        bytes calldata _data,
        uint256 _amount
    ) external {
        require(_amount > 0, "Amount must be greater than zero.");
        require(
            paymentToken.balanceOf(msg.sender) >= _amount,
            "Insufficient token balance."
        );
        require(
            paymentToken.allowance(msg.sender, address(this)) >= _amount,
            "Insufficient allowance."
        );

        paymentToken.transferFrom(msg.sender, address(this), _amount);
        signingRequests[signingRequestCount] = SigningRequest({
            status: SigningRequestStatus.Pending,
            counterparty: msg.sender,
            offer: _amount,
            blockNumber: _blockNumber,
            data: _data
        });
    }

    function acceptSigningRequest(
        uint256 _index,
        bytes calldata _signedData
    ) external onlyOwner {
        require(_index < signingRequestCount, "Invalid index.");
        require(
            signingRequests[_index].status == SigningRequestStatus.Pending,
            "Signing request has to be Pending"
        );

        SigningRequest storage request = signingRequests[_index];
        bytes32 messageHash = keccak256(
            abi.encodePacked(owner(), request.blockNumber, request.data)
        );

        bytes32 prefixedHash = messageHash.toEthSignedMessageHash();

        require(
            IERC1271(owner()).isValidSignature(prefixedHash, _signedData) ==
                0x1626ba7e,
            "Invalid signature."
        );

        request.status = SigningRequestStatus.Accepted;
        paymentToken.transferFrom(address(this), owner(), request.offer);
    }

    function rejectSigningRequest(uint256 _index) external onlyOwner {
        require(_index < signingRequestCount, "Invalid index.");
        require(
            signingRequests[_index].status == SigningRequestStatus.Pending,
            "Signing request has already been accepted."
        );

        SigningRequest storage request = signingRequests[_index];
        request.status = SigningRequestStatus.Rejected;
        paymentToken.transferFrom(
            address(this),
            request.counterparty,
            request.offer
        );
    }
}
