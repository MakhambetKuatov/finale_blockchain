const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Music Contract", function () {
  async function deployMusicFixture() {
    const [owner, user1, user2] = await ethers.getSigners();

    // Deploying the contract
    const Music = await ethers.getContractFactory("music");
    const music = await Music.deploy();

    return { music, owner, user1, user2 };
  }

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      const { music, owner } = await loadFixture(deployMusicFixture);
      expect(await music.owner()).to.equal(owner.address);
    });
  });

  describe("Placing Orders", function () {
    it("Should allow users to place an order and transfer Ether to owner", async function () {
      const { music, user1, owner } = await loadFixture(deployMusicFixture);
      const initialBalance = await ethers.provider.getBalance(owner.address);
      const orderPrice = ethers.utils.parseEther("0.1");

      await music.connect(user1).placeOrder(
        "Album 1",
        "Pop",
        "image.jpg",
        "Great album",
        "10 ETH",
        { value: orderPrice }
      );

      const finalBalance = await ethers.provider.getBalance(owner.address);
      expect(finalBalance.sub(initialBalance)).to.equal(orderPrice);

      const orders = await music.showOrders();
      expect(orders.length).to.equal(1);
      expect(orders[0].name).to.equal("Album 1");
      expect(orders[0].category).to.equal("Pop");
      expect(orders[0].from).to.equal(user1.address);
    });

    it("Should revert if placing an order with 0 Ether", async function () {
      const { music, user1 } = await loadFixture(deployMusicFixture);

      await expect(
        music.connect(user1).placeOrder(
          "Album 2",
          "Rock",
          "image2.jpg",
          "Amazing album",
          "15 ETH",
          { value: 0 }
        )
      ).to.be.revertedWith("Amount should not be 0 ether");
    });
  });

  describe("Order Management", function () {
    it("Should return all placed orders", async function () {
      const { music, user1 } = await loadFixture(deployMusicFixture);
      await music.connect(user1).placeOrder(
        "Album 3",
        "Jazz",
        "image3.jpg",
        "Smooth album",
        "20 ETH",
        { value: ethers.utils.parseEther("0.2") }
      );
      const orders = await music.showOrders();
      expect(orders.length).to.equal(1);
      expect(orders[0].name).to.equal("Album 3");
    });
  });

  describe("Balance Management", function () {
    it("Should return the contract owner's balance", async function () {
      const { music, owner } = await loadFixture(deployMusicFixture);
      const ownerBalance = await ethers.provider.getBalance(owner.address);
      expect(await music.getBalance()).to.equal(ownerBalance);
    });

    it("Should allow users to withdraw funds", async function () {
      const { music, owner, user1 } = await loadFixture(deployMusicFixture);

      // Deposit some ether to the contract
      await user1.sendTransaction({
        to: music.address,
        value: ethers.utils.parseEther("1"),
      });

      const initialBalance = await ethers.provider.getBalance(user1.address);
      await music.connect(user1).withdrawMoney(ethers.utils.parseEther("0.5"));
      const finalBalance = await ethers.provider.getBalance(user1.address);

      expect(finalBalance.sub(initialBalance)).to.be.closeTo(
        ethers.utils.parseEther("0.5"),
        ethers.utils.parseEther("0.01")
      );
    });

    it("Should revert if withdraw amount exceeds contract balance", async function () {
      const { music, user1 } = await loadFixture(deployMusicFixture);

      await expect(
        music.connect(user1).withdrawMoney(ethers.utils.parseEther("1"))
      ).to.be.revertedWith("My call failed");
    });
  });

  describe("Contract Balance", function () {
    it("Should return the correct contract balance", async function () {
      const { music, user1 } = await loadFixture(deployMusicFixture);

      // Deposit ether to the contract
      await user1.sendTransaction({
        to: music.address,
        value: ethers.utils.parseEther("0.3"),
      });

      const contractBalance = await music.getContractBalance(music.address);
      expect(contractBalance).to.equal(ethers.utils.parseEther("0.3"));
    });
  });
});
