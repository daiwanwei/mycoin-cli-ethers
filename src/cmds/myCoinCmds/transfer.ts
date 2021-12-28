import {BigNumber, ethers} from "ethers";

import type { Arguments, CommandBuilder } from 'yargs';
import {MyCoinService} from "../../services/myCoin";

type Options = {
    providerUrl: string;
    privateKey: string;
    contractAddress:string;
    toAddress:string;
    amount:string;
};

export const command: string = 'transfer <providerUrl> <privateKey> <contractAddress> <toAddress> <amount>';
export const desc: string = 'transfer';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('providerUrl', { type: 'string', demandOption: true })
        .positional('privateKey', { type: 'string', demandOption: true })
        .positional('contractAddress', { type: 'string', demandOption: true })
        .positional('toAddress', { type: 'string', demandOption: true })
        .positional('amount', { type: 'string', demandOption: true });

export async function handler(argv: Arguments<Options>): Promise<void> {
    const { providerUrl, privateKey,contractAddress, toAddress,amount} = argv;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider)
    const service = new MyCoinService(provider, wallet)
    const balance=await service.transfer(contractAddress,toAddress,BigNumber.from(amount))
    process.stdout.write(balance.toString());
    process.exit(0);
};
