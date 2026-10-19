var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../_tfmAdventure/TFMAdventure", "../../_tfmAdventure/ProtoADV", "../../../../Souritheque-client/src/outils/limonadmin/Limonadmin", "./AdminFX", "./AdminMonstre", "./ElementFX", "./ElementMonstre", "./AdminApparence"], function (require, exports, I_Conteneur_1, I_Bouton_1, TFMAdventure_1, ProtoADV_1, Limonadmin_1, AdminFX_1, AdminMonstre_1, ElementFX_1, ElementMonstre_1, AdminApparence_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdminADV = (function (_super) {
        __extends(AdminADV, _super);
        function AdminADV() {
            var _this = _super.call(this) || this;
            _this.modeFenetre("Administration", AdminADV.fermer);
            _this.defLargeur(200);
            _this.etirerDansParent(50, 50, 50, undefined);
            Limonadmin_1.Limonadmin.ajouterLimonadmin("fx", AdminFX_1.AdminFX, ElementFX_1.default);
            Limonadmin_1.Limonadmin.ajouterLimonadmin("monstre", AdminMonstre_1.AdminMonstre, ElementMonstre_1.default);
            Limonadmin_1.Limonadmin.ajouterLimonadmin("apparence", AdminApparence_1.AdminApparence, AdminApparence_1.ElementApparence);
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Vêtement", function () {
                Limonadmin_1.Limonadmin.afficherLimonadmin("apparence");
            }));
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Monstres", function () {
                Limonadmin_1.Limonadmin.afficherLimonadmin("monstre");
            }));
            _this.ajouterElement(new I_Bouton_1.I_Bouton("FX", function () {
                Limonadmin_1.Limonadmin.afficherLimonadmin("fx");
            }));
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Dons d'Élisah", function () {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeInfoDons());
            }));
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Fermer", function () {
                AdminADV.fermer();
            }));
            return _this;
        }
        AdminADV.afficher = function () {
            if (!AdminADV.instance) {
                AdminADV.instance = new AdminADV();
            }
            TFMAdventure_1.default.ajouterInterface(AdminADV.instance.elementHTML);
        };
        AdminADV.estAffiche = function () {
            return AdminADV.instance && AdminADV.instance.elementHTML.parentNode != null;
        };
        AdminADV.fermer = function () {
            if (AdminADV.instance) {
                AdminADV.instance.elementHTML.remove();
            }
        };
        return AdminADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.AdminADV = AdminADV;
});
//# sourceMappingURL=AdminADV.js.map