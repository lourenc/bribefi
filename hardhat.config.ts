import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    polygon: {
      url: process.env.RPC_URL!,
      chainId: 137,
      accounts: [process.env.PRIVATE_KEY!],
    },
    gnosis: {
      url: "https://rpc.gnosischain.com/",
      chainId: 100,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      polygon: process.env.ETHERSCAN_API_KEY!,
    },
  },
};

export default config;
