const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    const signer0 = await ethers.provider.getSigner(0);
    const signer1 = await ethers.provider.getSigner(1);

    const address0 = await signer0.getAddress();
    const address1 = await signer1.getAddress();

    await game.connect(signer0).write(address1);
    
    // nested mappings are rough :}

    await game.connect(signer1).win(address0);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
