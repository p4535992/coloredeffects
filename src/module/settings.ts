import { debug, log, setDebugLevel, warn, i18n } from '../foundryvtt-tokeneffects';
//@ts-ignore
import ColorSetting from '../../colorsettings/colorSetting.js';

export const MODULE_NAME = 'foundryvtt-tokeneffects';

/**
 * Because typescript doesn’t know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it’s typed as declare let canvas: Canvas | {ready: false}.
 * That’s why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because a „no canvas“ mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
 export function getCanvas(): Canvas {
  if (!(canvas instanceof Canvas) || !canvas.ready) {
      throw new Error("Canvas Is Not Initialized");
  }
  return canvas;
}

export const registerSettings = function () {

  // ================================
  // COLORED EFFECTS
  // ================================

  game.settings.register(MODULE_NAME, "coloredEffectsEnabled", {
		name: i18n(MODULE_NAME+".coloredEffectsEnabled.name"),
    hint: i18n(MODULE_NAME+".coloredEffectsEnabled.hint"),
		default: false,
		type: Boolean,
		scope: "world",
		config: true
	});



  //game.settings.register(MODULE_NAME, "overlayColor", {
  new ColorSetting(MODULE_NAME, "overlayColor", {
    label: "Pick color",
    restricted: false,
    defaultColor: hexToRGBAString(0x43DFDF, 1),

    name: i18n(MODULE_NAME+".overlayColor.name"),
    hint: i18n(MODULE_NAME+".overlayColor.hint"),
    scope: "world",
    config: true,
    default: "ffffff",
    type: String
  });

  game.settings.register(MODULE_NAME, "overlayAlpha", {
    name: i18n(MODULE_NAME+".overlayAlpha.name"),
    hint: i18n(MODULE_NAME+".overlayAlpha.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: {
        min: 0.0,
        max: 1.0,
        step: 0.01
    },
    default: 0.8
  });

  //game.settings.register(MODULE_NAME, "statusBackgroundColor", {
  new ColorSetting(MODULE_NAME, "statusBackgroundColor", {
    label: "Pick color",
    restricted: false,
    defaultColor: hexToRGBAString(0x43DFDF, 1),

    name: i18n(MODULE_NAME+".statusBackgroundColor.name"),
    hint: i18n(MODULE_NAME+".statusBackgroundColor.hint"),
    scope: "world",
    config: true,
    default: "000000",
    type: String
  });

  game.settings.register(MODULE_NAME, "statusBackgroundAlpha", {
    name: i18n(MODULE_NAME+".statusBackgroundAlpha.name"),
    hint: i18n(MODULE_NAME+".statusBackgroundAlpha.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: {
        min: 0.0,
        max: 1.0,
        step: 0.01
    },
    default: 0.4
  });

  //game.settings.register(MODULE_NAME, "statusBorderColor", {
  new ColorSetting(MODULE_NAME, "statusBorderColor", {
    label: "Pick color",
    restricted: false,
    defaultColor: hexToRGBAString(0x43DFDF, 1),

    name: i18n(MODULE_NAME+".statusBorderColor.name"),
    hint: i18n(MODULE_NAME+".statusBorderColor.hint"),
    scope: "world",
    config: true,
    default: "000000",
    type: String
  });

  game.settings.register(MODULE_NAME, "statusBorderWidth", {
    name: i18n(MODULE_NAME+".statusBorderWidth.name"),
    hint: i18n(MODULE_NAME+".statusBorderWidth.hint"),
    scope: "world",
    config: true,
    default: 1,
    type: Number
  });

  //game.settings.register(MODULE_NAME, "statusColor", {
  new ColorSetting(MODULE_NAME, "statusColor", {
    label: "Pick color",
    restricted: false,
    defaultColor: hexToRGBAString(0x43DFDF, 1),

    name: i18n(MODULE_NAME+".statusColor.name"),
    hint: i18n(MODULE_NAME+".statusColor.hint"),
    scope: "world",
    config: true,
    default: "000000",
    type: String
  });

  game.settings.register(MODULE_NAME, "statusAlpha", {
    name: i18n(MODULE_NAME+".statusAlpha.name"),
    hint: i18n(MODULE_NAME+".statusAlpha.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: {
        min: 0.0,
        max: 1.0,
        step: 0.01
    },
    default: 1.0
  });

  // ================================
  // NO TOKEN ANIMATION
  // ================================

  game.settings.register(MODULE_NAME, "notokenanimEnabled", {
		name: i18n(MODULE_NAME+".notokenanimEnabled.name"),
    hint: i18n(MODULE_NAME+".notokenanimEnabled.hint"),
		default: false,
		type: Boolean,
		scope: 'world',
		config: true
	});

  // ================================
  // TOKEN AURAS
  // ================================

  game.settings.register(MODULE_NAME, "aurasEnabled", {
		name: i18n(MODULE_NAME+".aurasEnabled.name"),
    hint: i18n(MODULE_NAME+".aurasEnabled.hint"),
		default: false,
		type: Boolean,
		scope: 'client',
		config: true
	});

  // ================================
  // SHEET TO TOKEN
  // ================================

  game.settings.register(MODULE_NAME, "sheetToTokenEnabled", {
		name: i18n(MODULE_NAME+".sheetToTokenEnabled.name"),
    hint: i18n(MODULE_NAME+".sheetToTokenEnabled.hint"),
		default: false,
		type: Boolean,
		scope: 'world',
		config: true
	});

  // ================================
  // POINT OF VISION (STILL NEED DEVELOPING)
  // ================================

  game.settings.register(MODULE_NAME, "pointOfVisionEnabled", {
		name: i18n(MODULE_NAME+".pointOfVisionEnabled.name"),
    hint: i18n(MODULE_NAME+".pointOfVisionEnabled.hint"),
		default: false,
		type: Boolean,
		scope: 'world',
		config: true
	});

  // ================================
  // Token Vision Animation
  // ================================

  game.settings.register(MODULE_NAME, "tokenVisionAnimationWorldEnabled", {
    name: i18n(MODULE_NAME+".tokenVisionAnimationWorldEnabled.name"),
    hint: i18n(MODULE_NAME+".tokenVisionAnimationWorldEnabled.hint"),
    default: false,
    type: Boolean,
    scope: 'world',
    config: true
  });

  // ==========================
  // TOKEN FACTIONS
  // ==========================

  game.settings.register(MODULE_NAME, "tokenFactionsEnabled", {
    name: i18n(MODULE_NAME+".tokenFactionsEnabled.name"),
    hint: i18n(MODULE_NAME+".tokenFactionsEnabled.hint"),
    default: false,
    type: Boolean,
    scope: 'world',
    config: true
  });

  game.settings.register(MODULE_NAME, 'color-from', {
      name: 'Generate Token Faction Color From',
      scope: 'world',
      config: true,
      default: 'token-disposition',
      type: String,
      choices: {
        'token-disposition': 'Default: A Token\'s Disposition',
        'actor-folder-color': 'An Actor\'s Folder Color',
        'custom-disposition': 'A Cusom Color Set For Token Disposition',
      },
    });

    game.settings.register(MODULE_NAME, 'draw-frames-by-default', {
      name: 'Draw Token Frames By Default?',
      hint: 'Token frames (rings) are layered above token graphics. Enable this if you primarily use round tokens. Disable it if you primarily use irregularly-shaped tokens.',
      scope: 'world',
      config: true,
      default: true,
      type: Boolean,
    });

    game.settings.register(MODULE_NAME, 'frame-style', {
      name: 'Frame Render Style',
      scope: 'world',
      config: true,
      default: 'flat',
      type: String,
      choices: {
        flat: 'Default: Flat',
        beveled: 'Beveled',
      },
    });

    game.settings.register(MODULE_NAME, 'frame-width', {
      name: 'Frame Width (Percent of Grid Unit)',
      scope: 'world',
      config: true,
      default: 7.5,
      type: Number,
      range: {
        min: 0,
        max: 10,
        step: 0.5,
      },
    });

    game.settings.register(MODULE_NAME, 'base-opacity', {
      name: 'Base Opacity',
      scope: 'world',
      config: true,
      default: 1,
      type: Number,
      range: {
        min: 0,
        max: 1,
        step: 0.05,
      },
    });

    game.settings.register(MODULE_NAME, 'frame-opacity', {
      name: 'Frame Opacity',
      scope: 'world',
      config: true,
      default: 1,
      type: Number,
      range: {
        min: 0,
        max: 1,
        step: 0.05,
      },
    });

    // ================================
    // Floating Conditons
    // ===============================

    game.settings.register(MODULE_NAME, "floatingConditionsEnabled", {
      name: i18n(MODULE_NAME+".floatingConditionsEnabled.name"),
      hint: i18n(MODULE_NAME+".floatingConditionsEnabled.hint"),
      default: false,
      type: Boolean,
      scope: 'world',
      config: true
    });

    // ===============================
    // Aplha control
    // ===============================

    game.settings.register(MODULE_NAME, "alphaControlEnabled", {
      name: i18n(MODULE_NAME+".alphaControlEnabled.name"),
      hint: i18n(MODULE_NAME+".alphaControlEnabled.hint"),
      default: false,
      type: Boolean,
      scope: 'world',
      config: true
    });

    game.settings.register(MODULE_NAME, "hiddenToken", {
        name: game.i18n.localize(MODULE_NAME+".alphaControl.settings.hiddenToken.name"),
        hint: "",
        scope: "world",
        config: true,
        type: Number,
        default: 0.5,
        range: {
            min: 0.1,
            max: 1.0,
            step: 0.1
        }
    });
    
    game.settings.register(MODULE_NAME, "hiddenTile", {
        name: game.i18n.localize(MODULE_NAME+".alphaControl.settings.hiddenTile.name"),
        hint: "",
        scope: "world",
        config: true,
        type: Number,
        default: 0.5,
        range: {
            min: 0.1,
            max: 1.0,
            step: 0.1
        }
    });

}

// function setup(templateSettings) {
// 	templateSettings.settings().forEach(setting => {
// 		let options = {
// 			name: i18n(templateSettings.name()+"."+setting.name+'.Name'),
// 			hint: i18n(`${templateSettings.name()}.${setting.name}.Hint`),
// 			scope: setting.scope,
// 			config: true,
// 			default: setting.default,
// 			type: setting.type,
// 			choices: {}
// 		};
// 		if (setting.choices) options.choices = setting.choices;
// 		game.settings.register(templateSettings.name(), setting.name, options);
// 	});
// }
