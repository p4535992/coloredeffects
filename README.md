# Tokens Effects

An extension module for FoundryVTT that adds style settings for status and overlay icons.

For overlay icons, user-defined color and opacity settings are available. For status icons, user-defined color and opacity, as well as background color, opacity and border settings are available.

## The project

There are more than 300 modules in foundry vtt so the scope of this module is to reduce the number of modules on your game and integrate them with each other and put together something that works.

This project is born for install on one single module the following modules for manage effects on token:

- [Token Auras](https://bitbucket.org/Fyorl/token-auras/src/master/) ty to [Fyorl](https://bitbucket.org/Fyorl/)
- [NoTokenAnim](https://bitbucket.org/Fyorl/notokenanim/src/master/) ty to [Fyorl](https://bitbucket.org/Fyorl/)
- [Colored Effects](https://github.com/sean8223/coloredeffects) ty to [sean8223](https://github.com/sean8223)

## How to Use

Install the module form foundryvtt or by the module.json

### libWrapper

This module uses the [libWrapper](https://github.com/ruipin/fvtt-lib-wrapper) library for wrapping core methods. It is a hard dependency and it is recommended for the best experience and compatibility with other modules.

## Settings

- coloredEffectsEnabled : 
    - overlayColor : Color for overlay icons as a hex string (rrggbb)
    - overlayAlpha : Opacity of overlay icons (0 = fully transparent, 1 = fully opaque)
    - statusBackgroundColor : Background color of status icons as a hex string (rrggbb)
    - statusBackgroundAlpha : "Opacity of status icon background (0 = fully transparent, 1 = fully opaque)
    - statusBorderColor : Color of status icon border as a hex string (rrggbb)
    - statusBorderWidth : Width in pixels of status icon border
    - statusColor : Color for status icons as a hex string (rrggbb)
    - statusAlpha : Opacity of status icons (0 = fully transparent, 1 = fully opaque)

- notokenanimEnabled : A Foundry VTT settings that provides an option to remove token movement animations.

- aurasEnabled : For configuring token auras. Auras are visual only, but should work in any system and can be used as a basis to build more advanced features on top of. The module adds configuration options for up to two auras to the token configuration dialog, and additional auras can be added programmatically, with no limit.

## Features


#### [Colored Effect](https://github.com/sean8223/coloredeffects)

Install the module and open the Game Settings window. Click "Configure Settings" and select the "Module Settings" tab. You will see options for the various color properties for icons under the "Colored Effects" menu. Modify them as you see fit, and click "Save Changes".

#### [No animation token](https://bitbucket.org/Fyorl/notokenanim/src/master/)

A Foundry module VTT settings that provides an option to remove token movement animations.

#### [Token Auras](https://bitbucket.org/Fyorl/token-auras/src/master/)

A [FoundryVTT](https://foundryvtt.com) module for configuring token auras. Auras are visual only, but should work in any system and can be used as a basis to build more advanced features on top of. The module adds configuration options for up to two auras to the token configuration dialog, and additional auras can be added programmatically, with no limit.

![Example token configuration](./images/example-config.jpg)

![Example aura visuals](./images/example-aura.jpg)

## API

Aura objects have the following properties:
```js
{
    distance: number|null, // The radius (in grid units) of the aura.
    colour: string, // An HTML hexadecimal colour.
    opacity: number, // The opacity of the aura between 0 and 1.
    square: boolean, // The aura is square if true, otherwise it is circular.
    uuid: string // A unique identifier for every aura.
}
```

A new aura can be created with:
```js
Auras.newAura();
```

### Examples
Programmatically edit the radius of an aura to be `10` grid units:
```js
token.setFlag('foundryvtt-tokeneffects', 'aura1.distance', 10);
```

The UI-configurable auras are stored in `aura1` and `aura2`, but additional auras can be added by adding to the `auras` array:
```js
const auras = duplicate(token.getFlag('foundryvtt-tokeneffects', 'auras'));
const newAura = Auras.newAura();
newAura.distance = 15;
newAura.colour = '#ff0000';
auras.push(newAura);
token.setFlag('foundryvtt-tokeneffects', 'auras', existingAuras);
```


## [Changelog](./changelog.md)
