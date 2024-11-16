// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract music{

    struct orders{
        string name;
        string category;
        string image;
        string description;
        string price;
        address from;
        uint timestamp;
    }

    orders[] order;
    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    function placeOrder(string memory name, string memory category, string memory image, string memory description, string memory price) public payable{
        require(msg.value>0, "Amount should not be 0 ether");
        owner.transfer(msg.value);
        order.push(orders(name,category,image,description,price, msg.sender,block.timestamp));
    }

    function showOrders() public view returns(orders[] memory){
        return order;
    }

       function getBalance() public view returns(uint256){
        return owner.balance;
    }

     function withdrawMoney(uint256 money) public {
        (bool callSuccess, ) = payable(msg.sender).call{value: money}("");
        require(callSuccess, "My call failed");
    }

 

    function getContractBalance(address ContractAddress) public view returns(uint){
    return ContractAddress.balance;
}
}