import {ethers} from "ethers";

import type { Arguments, CommandBuilder } from 'yargs';
import {MyCoinService} from "../../services/myCoin";

type Options = {
    providerUrl: string;
    privateKey: string;
    contractAddress:string;
    accountAddress:string;
};

export const command: string = 'balanceOf <providerUrl> <privateKey> <contractAddress> <accountAddress>';
export const desc: string = 'balanceOf';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('providerUrl', { type: 'string', demandOption: true })
        .positional('privateKey', { type: 'string', demandOption: true })
        .positional('contractAddress', { type: 'string', demandOption: true })
        .positional('accountAddress', { type: 'string', demandOption: true });

export async function handler(argv: Arguments<Options>): Promise<void> {
    const { providerUrl, privateKey,contractAddress, accountAddress} = argv;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider)
    const service = new MyCoinService(provider, wallet)
    const balance=await service.balanceOf(contractAddress,accountAddress)
    process.stdout.write(balance.toString());
    process.exit(0);
};
