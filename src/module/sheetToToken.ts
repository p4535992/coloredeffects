export const SheetToToken = {

    preUpdateActorHandler : function(actor, updateData){
        if ("img" in updateData) {
            actor.data.token.img = updateData.img;
        }
    },

    preUpdateTokenHandler : function(updateData){
        if ("actorData" in updateData) {
            if ("img" in updateData.actorData) {
                updateData.img = updateData.actorData.img;
            }
        }
    }

}