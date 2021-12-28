
import MY_COIN_ABI from "../data/abi/MyCoin.json";
import {Contract, ethers} from "ethers";
import {JsonRpcProvider} from "@ethersproject/providers";

export class MyCoinEventManager{
    private contracts:Map<string,Contract>=new Map<string,Contract>()
    private readonly provider:JsonRpcProvider
    constructor(provider:JsonRpcProvider) {
        this.provider=provider;
    }
    public addContract(contractAddress:string){
        const myCoin = new ethers.Contract(contractAddress, MY_COIN_ABI, this.provider);
        myCoin.on("Transfer", (from,to,value)=>{
            console.log(from)
            console.log(to)
            console.log(value)
        })
        this.contracts.set(contractAddress,myCoin)
    }
}
