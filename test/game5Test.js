const { assert } = require("chai");
const { utils } = require("ethers");


describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;

    let randomWallet = ethers.Wallet.createRandom();

    while(randomWallet.address >= threshold) {
      randomWallet = ethers.Wallet.createRandom();
    }

    const defaultSigner = await ethers.provider.getSigner(0);

    const winningSigner = await randomWallet.connect(ethers.provider);

    const tx = {
      to: winningSigner.address,
      value: utils.parseEther("1.0")
    }

    await defaultSigner.sendTransaction(tx);

    await game.connect(winningSigner).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
