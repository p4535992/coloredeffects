import { getCanvas } from "./settings";

export function getTokenByTokenID(id) {
    // return await game.scenes.active.data['tokens'].find( x => {return x.id === id});
    return getCanvas().tokens.placeables.find( x => {return x.id === id});
}
export function getTokenByTokenName(name) {
    // return await game.scenes.active.data['tokens'].find( x => {return x._name === name});
    return getCanvas().tokens.placeables.find( x => { return x.name == name});
    // return getCanvas().tokens.placeables.find( x => { return x.id == game.user.id});
}
