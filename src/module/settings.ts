import { debug, log, setDebugLevel, warn, i18n } from '../foundryvtt-coloredeffects';

export const MODULE_NAME = 'foundryvtt-coloredeffects';

export const registerSettings = function () {

  game.settings.register(MODULE_NAME, "overlayColor", {
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
  game.settings.register(MODULE_NAME, "statusBackgroundColor", {
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
  game.settings.register(MODULE_NAME, "statusBorderColor", {
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
  game.settings.register(MODULE_NAME, "statusColor", {
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
