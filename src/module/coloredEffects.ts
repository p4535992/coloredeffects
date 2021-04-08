import { MODULE_NAME } from "./settings";
import { getCanvas } from './settings';

let canvas = getCanvas();

export const ColoredEffects = {

   closeSettingsConfigHandler : function(){
        let ownedTokens = canvas.getLayer("TokenLayer")['ownedTokens'];
        for (let t of ownedTokens) {
            t.drawEffects();
        }

    },

    tokenDrawOverlayHandler : async function (wrapped, ...args) {
        const [src, tint] = args;
        if ( !src ){
            return;
        }
        let overlayAlpha = <number>game.settings.get(MODULE_NAME, "overlayAlpha");
        let overlayColor = colorStringToHex(<string>game.settings.get(MODULE_NAME, "overlayColor"));
        const tex = await loadTexture(src);
        const icon = new PIXI.Sprite(tex);
        const size = Math.min(this.w * 0.6, this.h * 0.6);
        icon.width = icon.height = size;
        icon.position.set((this.w - size) / 2, (this.h - size) / 2);
        if ( tint ) {
            icon.tint = tint;
            icon.alpha = 0.80;
        }else {
            icon.tint = overlayColor;
            icon.alpha = overlayAlpha;
        }
        this.effects.addChild(icon);
        return wrapped(...args);
    },

    tokenDrawEffectHandler : async function (wrapped, ...args) {
        const [src, i, bg, w, tint] = args;
        let statusColor = colorStringToHex(<string>game.settings.get(MODULE_NAME, "statusColor"));
        let statusAlpha = game.settings.get(MODULE_NAME, "statusAlpha");
        let bgColor = colorStringToHex(<string>game.settings.get(MODULE_NAME, "statusBackgroundColor"));
        let bgAlpha = game.settings.get(MODULE_NAME, "statusBackgroundAlpha");
        let bgBorderWidth = game.settings.get(MODULE_NAME, "statusBorderWidth");
        let bgBorderColor = colorStringToHex(<string>game.settings.get(MODULE_NAME, "statusBorderColor"));
        bg.beginFill(bgColor, bgAlpha).lineStyle(bgBorderWidth, bgBorderColor);
        let tex = await loadTexture(src);
        let icon = this.effects.addChild(new PIXI.Sprite(tex));
        icon.width = icon.height = w;
        icon.x = Math.floor(i / 5) * w;
        icon.y = (i % 5) * w;
        if ( tint ) {
            icon.tint = tint;
        }else {
            icon.tint = statusColor;
            icon.alpha = statusAlpha;
        }
        bg.drawRoundedRect(icon.x + 1, icon.y + 1, w - 2, w - 2, 2);
        this.effects.addChild(icon);
        return wrapped(...args);
    }
}
