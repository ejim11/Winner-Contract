const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Winner contract", () => {
  let owner;
  let user;
  let winnerContract;
  beforeEach(async () => {
    const WinnerContract = await ethers.getContractFactory("WinnerContract");
    winnerContract = await WinnerContract.deploy();
    winnerContract.deployed();

    owner = ethers.provider.getSigner(0);
    user = ethers.provider.getSigner(1);
  });

  it("should store the owner of the contract", async () => {
    const _owner = await winnerContract.owner.call();
    assert.equal(_owner, await owner.getAddress());
  });

  it("should not allow owner to call function", async () => {
    let error;

    try {
      await winnerContract.connect(owner).attempt();
    } catch (err) {
      error = err;
    }
    if (!error) {
      assert.fail("call with owner did not fail ");
    }
  });

  it("should emit the caller of the attempt as a winner", async () => {
    await expect(winnerContract.connect(user).attempt()).to.emit(
      winnerContract,
      "Winner"
    );
  });
});
