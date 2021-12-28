import {BigNumber, ethers, Transaction, Wallet} from "ethers";
import MY_COIN_ABI from "../data/abi/MyCoin.json";
import {JsonRpcProvider} from "@ethersproject/providers";

export class MyCoinService {
    private readonly provider: JsonRpcProvider
    private readonly wallet: Wallet

    constructor(provider: JsonRpcProvider, wallet: Wallet) {
        this.provider = provider
        this.wallet = wallet
    }

    public async balanceOf(contractAddress: string, accountAddress: string): Promise<BigNumber> {
        const myCoin = new ethers.Contract(contractAddress, MY_COIN_ABI, this.provider);
        let balance = await myCoin.balanceOf(accountAddress)
        return balance
    }

    public async transfer(contractAddress: string, toAddress: string, amount: BigNumber): Promise<Transaction> {
        const myCoin = new ethers.Contract(contractAddress, MY_COIN_ABI, this.wallet);
        let txn = await myCoin.transfer(toAddress, amount)
        await txn.wait();
        return txn
    }
}
