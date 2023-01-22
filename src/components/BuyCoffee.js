import { ethers } from "ethers";

const BuyCoffee = ({ state }) => {
    const buyCoffeeFunction = async (e) => {
        
        e.preventDefault();
        const {contract} = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;

        console.log(name, message, contract);
        
        // ether value
        const etherValue = {value:ethers.utils.parseEther("0.01")}

        // initiate transaction
        const txn = await contract.buyCoffee(name, message, etherValue);
        console.log(txn);
        await txn.wait();
        window.location.reload(false);
    }
    return (
    <>
        <form onSubmit={buyCoffeeFunction}>
            
            <label>Name : </label>
            <input type="text" id="name" placeholder="Your Name" ></input>
            <label>Message : </label>
            <input type="text" id="message" placeholder="Your Message" ></input>
            <input type="submit" name="submit" value="Pay Now" disabled={!state.contract}/>
        </form>
    </>
    )
}

export default BuyCoffee;