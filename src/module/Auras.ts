import { MODULE_NAME } from "./settings";

export const Auras = {
	getAllAuras: function (token) {
		return Auras.getManualAuras(token).concat(token.getFlag(MODULE_NAME, 'auras') || []);
	},

	getManualAuras: function (token) {
		let aura1 = token.getFlag(MODULE_NAME, 'aura1');
		let aura2 = token.getFlag(MODULE_NAME, 'aura2');
		return [aura1 || Auras.newAura(), aura2 || Auras.newAura()];
	},

	newAura: function () {
		return {
			distance: null,
			colour: '#ffffff',
			opacity: .5,
			square: false,
			uuid: Auras.uuid()
		};
	},

	onConfigRender: function (config, html) {
		const auras = Auras.getManualAuras(config.token);
		const imageTab = html.find('.tab[data-tab="image"]');

		imageTab.append($(`
			<fieldset class="auras">
				<legend>${game.i18n.localize(MODULE_NAME+'.Auras')}</legend>
				<ol class="form-group">
				${auras.map((aura, idx) => `
					<li class="aura-row flexrow">
						<input class="color" type="text" value="${aura.colour}"
						       name="flags."${MODULE_NAME}".aura${idx + 1}.colour">
						<input type="color" value="${aura.colour}"
						       data-edit="flags."${MODULE_NAME}".aura${idx + 1}.colour">
						<input type="text" data-dtype="Number" value="${aura.opacity}"
						       name="flags."${MODULE_NAME}".aura${idx + 1}.opacity">
						<span>${game.i18n.localize(MODULE_NAME+'.Opacity')}</span>
						<input type="text" name="flags"${MODULE_NAME}".aura${idx + 1}.distance"
						       value="${aura.distance ? aura.distance : ''}" data-dtype="Number">
						<span>${game.i18n.localize('SCENES.Units')}</span>
						<label class="checkbox">
							<input type="checkbox" name="flags."${MODULE_NAME}".aura${idx + 1}.square"
							       ${aura.square ? 'checked' : ''}>
							${game.i18n.localize('SCENES.GridSquare')}
						</label>
					</li>
				`).join('')}
				</ol>
			</fieldset>
		`));

		imageTab.find('.auras input[type="color"][data-edit]')
			.change(config._onChangeInput.bind(config));
	},

	uuid: function () {
		return String((1e7)+"-"+(1e3)+"-"+(4e3)+"-"+(8e3)+"-"+(1e11))
			.replace(/[018]/g, (c:any) =>
				(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
	}
};
