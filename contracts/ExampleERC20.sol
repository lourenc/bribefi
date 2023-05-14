// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExampleERC20 is ERC20 {
    constructor(uint256 supply) ERC20("TEST", "KEK") {
        _mint(msg.sender, supply);
    }
}
