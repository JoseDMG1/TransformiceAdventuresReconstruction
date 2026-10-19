define(["require", "exports", "./ArmeEpee", "./ArmeADV", "./ArmeDague", "./ArmeArc", "../../../../Souritheque-client/src/outils/affichage/animation/Look", "./ArmeCuistoAjout", "./ArmeBouclier", "./ArmeBandage", "../../_monde/_mobile/MoteurBibliothequeSonADV"], function (require, exports, ArmeEpee_1, ArmeADV_1, ArmeDague_1, ArmeArc_1, Look_1, ArmeCuistoAjout_1, ArmeBouclier_1, ArmeBandage_1, MoteurBibliothequeSonADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OutilsArmeADV = (function () {
        function OutilsArmeADV() {
        }
        OutilsArmeADV.recupArme = function (MSG, MOBILE) {
            var code = MSG.l8();
            if (code == 0) {
                return null;
            }
            var classe = OutilsArmeADV.indexArme[code];
            if (!classe) {
                classe = ArmeADV_1.ArmeADV;
            }
            var arme = new classe();
            arme.mobile = MOBILE;
            arme.type = code;
            arme.identifiant = MSG.l16();
            arme.nombreChargeMax = MSG.l8();
            arme.chargeEnCours = MSG.l8();
            arme.verrouillageEnCours = MSG.l8();
            arme.peutSurcharger = MSG.lBool();
            arme.tempsIncantation = MSG.l32s();
            arme.bibliothequeSon = MoteurBibliothequeSonADV_1.MoteurBibliothequeSonADV.recupBibliotheque(MSG.l16(), MOBILE);
            if (MSG.lBool()) {
                arme.posture = MSG.lChaine();
            }
            for (var i = 0, nb = MSG.l8(); i < nb; i++) {
                arme.listeAnimAttaque.push(MSG.l8());
            }
            if (MSG.lBool()) {
                arme.apparence = new Look_1.ElementLook(MSG);
            }
            arme.infoSupplementaire(MSG);
            return arme;
        };
        OutilsArmeADV.indexArme = {
            1: ArmeEpee_1.ArmeEpee,
            2: ArmeEpee_1.ArmeEpee,
            3: ArmeDague_1.ArmeDague,
            4: ArmeBouclier_1.ArmeBouclier,
            5: ArmeArc_1.ArmeArc,
            6: ArmeBandage_1.ArmeBandage,
            100: ArmeCuistoAjout_1.ArmeCuistoAjout,
            101: ArmeCuistoAjout_1.ArmeCuistoSuppr
        };
        return OutilsArmeADV;
    }());
    exports.OutilsArmeADV = OutilsArmeADV;
});
//# sourceMappingURL=OutilsArmeADV.js.map