const hre = require("hardhat");
const { run, network } = require("hardhat");

async function main() {
  const WinnerContractFactory = await hre.ethers.getContractFactory(
    "WinnerContract"
  );
  const winnerContract = await WinnerContractFactory.deploy();

  await winnerContract.deployed();

  console.log(`address: ${winnerContract.address}`);

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await winnerContract.deployTransaction.wait(6);
    await verify(winnerContract.address, []);
  }
}

async function verify(address, args) {
  try {
    await run("verify:verify", {
      address: address,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("verified");
    } else {
      console.log(e);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//  0xE97A2510A40A3A58BdFbd2DB5AB4A0123533f01f
