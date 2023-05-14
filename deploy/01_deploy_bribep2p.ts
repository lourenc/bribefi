import { ethers } from "hardhat";
import "hardhat-deploy";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { abi as bribeP2PAbi } from "../artifacts/contracts/BribeP2P.sol/BribeP2P.json";
import { abi as erc20Abi } from "../artifacts/contracts/ExampleERC20.sol/ExampleERC20.json";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const ExampleERC20Factory = await ethers.getContractFactory("ExampleERC20");

  const erc20 = await ExampleERC20Factory.deploy(1000000);

  await erc20.deployed();

  console.log("ExampleERC20 deployed to:", erc20.address);

  hre.deployments.save("ExampleERC20", {
    abi: erc20Abi,
    address: erc20.address,
  });

  const BribeP2PFactory = await ethers.getContractFactory("BribeP2P");
  const bribeP2P = await BribeP2PFactory.deploy(erc20.address);

  await bribeP2P.deployed();

  console.log("BribeP2P deployed to:", bribeP2P.address);

  hre.deployments.save("BribeP2P", {
    abi: bribeP2PAbi,
    address: bribeP2P.address,
  });
};

deploy.tags = ["BribeP2P"];
export default deploy;
