import Artifacts from './Artifacts.json';
import { getWeb3, getAccount } from '../eth/network';

export default function Counter(web3, adddress, options = {}) {
    const name = "contracts/Counter.sol:Counter";
    const artifact = Artifacts.contracts[name];
    const abi = JSON.parse(artifact.abi);
    return new web3.eth.Contract(abi, adddress, options)
}

export async function getDeployed() {
    const web3 = getWeb3();
    const from = await getAccount();
    const addr = '0xB55Dd5A341fBe627DEb72b0287BfD4C8585caE2d'
    return Counter(web3, addr, { from })
}
