import {BigNumber, ethers} from "ethers";

import type { Arguments, CommandBuilder } from 'yargs';
import {MyCoinService} from "../../services/myCoin";
import {MyCoinEventManager} from "../../contractEvents/myCoin";

type Options = {
    providerUrl: string;
    contractAddress:string;
};

export const command: string = 'runMyCoinManager <providerUrl> <contractAddress>';
export const desc: string = 'runMyCoinManager';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('providerUrl', { type: 'string', demandOption: true })
        .positional('contractAddress', { type: 'string', demandOption: true });

export async function handler(argv: Arguments<Options>): Promise<void> {
    const { providerUrl,contractAddress} = argv;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const manager = new MyCoinEventManager(provider)
    await manager.addContract(contractAddress)
    process.stdout.write("add contract successfully");
    process.exit(0);
};
