// sync-ed from root via `tr sync-refs`
import config from "../refs.terrain.json"
//export const contractAdress = (wallet) => config[wallet.network.name].counter.contractAddresses.default
export const contractAdress = (wallet) => config[wallet.network.name].message_app.contractAddresses.default
console.log(config)
