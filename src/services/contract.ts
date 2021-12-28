import {ethers, Wallet} from "ethers";
import {JsonRpcProvider} from "@ethersproject/providers";
import MY_COIN_BIN from "../data/bin/MyCoin.json"

export class ContractService{
    private readonly provider: JsonRpcProvider
    private readonly wallet: Wallet
    private static abi:string[]=[
        "constructor()"
    ];

    constructor(provider:JsonRpcProvider,wallet:Wallet) {
        this.provider = provider
        this.wallet=wallet
    }

    public async deployMyCoin(){
        const factory = new ethers.ContractFactory(ContractService.abi, MY_COIN_BIN.bytecode, this.wallet)
        const price = ethers.utils.formatUnits(await this.provider.getGasPrice(), 'gwei')
        const options = {gasLimit: 3000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}
        const contract = await factory.deploy(options);
        console.log(contract)
        console.log(`-------------start mint transaction-------------`)
        let txn=await contract.deployTransaction.wait();
        console.log(`-------------end mint transaction-------------`)
        console.log(txn)
        console.log(contract.address)
    }
}
