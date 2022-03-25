import {BigNumber, ethers, Transaction, Wallet} from "ethers";
import MY_COIN_ABI from "../data/abi/MyCoin.json";
import {JsonRpcProvider} from "@ethersproject/providers";
import {BigNumberish} from "@ethersproject/bignumber";
import {BytesLike} from "@ethersproject/bytes";
import {AccessListish} from "@ethersproject/transactions";

export class MyCoinService {
    private readonly provider: JsonRpcProvider
    private readonly wallet: Wallet

    constructor(provider: JsonRpcProvider, wallet: Wallet) {
        this.provider = provider
        this.wallet = wallet
    }

    public async balanceOf(contractAddress: string, accountAddress: string): Promise<BigNumber> {
        // const myCoin = new ethers.Contract(contractAddress, MY_COIN_ABI, this.provider);
        // const nonce =await this.provider.getTransactionCount(this.wallet.address);
        // let balance = await myCoin.balanceOf(accountAddress,{nonce:nonce});
        // console.log(balance.toString());

        const iface = new ethers.utils.Interface(MY_COIN_ABI);
        const data = iface.encodeFunctionData("balanceOf", [accountAddress]);
        const rawTx = {
            from: this.wallet.address,
            gasLimit: 3000000,
            to: contractAddress,
            value: 0,
            data: data,
            chainId: (await this.provider.getNetwork()).chainId,
        };
        const res = await this.provider.call(rawTx)
        const balance = BigNumber.from(res);
        console.log(balance.toString())
        return balance
    }

    public async transfer(contractAddress: string, toAddress: string, amount: BigNumber){
        // const myCoin = new ethers.Contract(contractAddress, MY_COIN_ABI, this.wallet);
        // const nonce = await this.provider.getTransactionCount(this.wallet.address);
        // let txn = await myCoin.transfer(toAddress, amount, {nonce: nonce});
        // await txn.wait();


        const iface = new ethers.utils.Interface(MY_COIN_ABI);
        const data = iface.encodeFunctionData("transfer", [toAddress,amount]);
        const nonce = await this.wallet.getTransactionCount();
        const rawTx = {
            from: this.wallet.address,
            nonce: nonce,
            gasLimit: 3000000,
            to: contractAddress,
            value: 0,
            data: data,
            chainId: await this.wallet.getChainId(),
        };
        const tx = await this.wallet.sendTransaction(rawTx)
        await tx.wait();
    }
}
