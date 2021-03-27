export const TokenVisionAnimationWorld = {

    readyOnceHandler : function(){
        let visionAnimationSettings = game.settings.settings.get('core.visionAnimation');
        visionAnimationSettings.scope = 'world';
        visionAnimationSettings.default = false;    
    }

}