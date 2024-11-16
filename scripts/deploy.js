
const hre = require("hardhat");

async function main() {
  const music = await hre.ethers.getContractFactory("music");
    const contract = await music.deploy();
  
    await contract.deployed();
    console.log("Contract Address ", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
