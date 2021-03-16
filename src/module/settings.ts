import { debug, log, setDebugLevel, warn, i18n } from '../foundryvtt-coloredeffects';

export const MODULE_NAME = 'foundryvtt-coloredeffects';

export const registerSettings = function () {

  game.settings.register(MODULE_NAME, "overlayColor", {
    name: game.i18n.localize( "foundryvtt-coloredeffects.overlayColor.name"),
    hint: game.i18n.localize( "foundryvtt-coloredeffects.overlayColor.hint"),
    scope: "world",
    config: true,
    default: "ffffff",
    type: String
  });
  game.settings.register(MODULE_NAME, "overlayAlpha", {
    name: game.i18n.localize( "foundryvtt-coloredeffects.overlayAlpha.name"),
    hint: game.i18n.localize( "foundryvtt-coloredeffects.overlayAlpha.hint"),
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
  game.settings.register(MODULE_NAME, "statusBackgroundColor", {
    name: game.i18n.localize( "foundryvtt-coloredeffects.statusBackgroundColor.name"),
    hint: game.i18n.localize( "foundryvtt-coloredeffects.statusBackgroundColor.hint"),
    scope: "world",
    config: true,
    default: "000000",
    type: String
  });
  game.settings.register(MODULE_NAME, "statusBackgroundAlpha", {
    name: game.i18n.localize( "foundryvtt-coloredeffects.statusBackgroundAlpha.name"),
    hint: game.i18n.localize( "foundryvtt-coloredeffects.statusBackgroundAlpha.hint"),
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
  game.settings.register(MODULE_NAME, "statusBorderColor", {
    name: game.i18n.localize( "foundryvtt-coloredeffects.statusBorderColor.name"),
    hint: game.i18n.localize( "foundryvtt-coloredeffects.statusBorderColor.hint"),
    scope: "world",
    config: true,
    default: "000000",
    type: String
  });
  game.settings.register(MODULE_NAME, "statusBorderWidth", {
    name: game.i18n.localize( "foundryvtt-coloredeffects.statusBorderWidth.name"),
    hint: game.i18n.localize( "foundryvtt-coloredeffects.statusBorderWidth.hint"),
    scope: "world",
    config: true,
    default: 1,
    type: Number
  });
  game.settings.register(MODULE_NAME, "statusColor", {
    name: game.i18n.localize( "foundryvtt-coloredeffects.statusColor.name"),
    hint: game.i18n.localize( "foundryvtt-coloredeffects.statusColor.hint"),
    scope: "world",
    config: true,
    default: "000000",
    type: String
  });
  game.settings.register(MODULE_NAME, "statusAlpha", {
    name: game.i18n.localize( "foundryvtt-coloredeffects.statusAlpha.name"),
    hint: game.i18n.localize( "foundryvtt-coloredeffects.statusAlpha.hint"),
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
}

// function setup(templateSettings) {
// 	templateSettings.settings().forEach(setting => {
// 		let options = {
// 			name: game.i18n.localize(templateSettings.name()+"."+setting.name+'.Name'),
// 			hint: game.i18n.localize(`${templateSettings.name()}.${setting.name}.Hint`),
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
