const hre = require("hardhat");

async function main() {
  const CertificateSystem = await hre.ethers.deployContract("CertificateSystem"); // Use deployContract

  console.log(`Contract deployed to: ${await CertificateSystem.getAddress()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
