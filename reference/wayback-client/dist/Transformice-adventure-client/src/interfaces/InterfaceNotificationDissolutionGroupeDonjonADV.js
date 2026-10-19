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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "../_tfmAdventure/TFMAdventure"], function (require, exports, I_Conteneur_1, I_Bouton_1, I_Texte_1, Trad801_1, TFMAdventure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceNotificationDissolutionGroupeDonjonADV = (function (_super) {
        __extends(InterfaceNotificationDissolutionGroupeDonjonADV, _super);
        function InterfaceNotificationDissolutionGroupeDonjonADV() {
            var _this = _super.call(this) || this;
            _this.modeFenetre(Trad801_1.default.trad("$DonjonTitreDissolutionGroupe"), InterfaceNotificationDissolutionGroupeDonjonADV.fermer);
            _this.centrerAuto(0.5, 0.45);
            _this.afficherFondCadre()
                .defLargeurMin(400)
                .defLargeurMax(300);
            _this.texteMessage = new I_Texte_1.I_Texte();
            _this.texteMessage.style.padding = "16px";
            var boutonFermer = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.fermer"));
            boutonFermer.defClique(InterfaceNotificationDissolutionGroupeDonjonADV.fermer);
            _this.ajouterElement(_this.texteMessage, boutonFermer);
            return _this;
        }
        InterfaceNotificationDissolutionGroupeDonjonADV.afficher = function (MSG) {
            if (!InterfaceNotificationDissolutionGroupeDonjonADV.instance) {
                InterfaceNotificationDissolutionGroupeDonjonADV.instance = new InterfaceNotificationDissolutionGroupeDonjonADV();
            }
            InterfaceNotificationDissolutionGroupeDonjonADV.instance.initialisation(MSG);
            TFMAdventure_1.default.ajouterInterface(InterfaceNotificationDissolutionGroupeDonjonADV.instance.elementHTML);
        };
        InterfaceNotificationDissolutionGroupeDonjonADV.fermer = function () {
            if (InterfaceNotificationDissolutionGroupeDonjonADV.instance) {
                InterfaceNotificationDissolutionGroupeDonjonADV.instance.elementHTML.remove();
            }
        };
        InterfaceNotificationDissolutionGroupeDonjonADV.prototype.initialisation = function (MSG) {
            var initiateur = MSG.lChaine();
            var message = Trad801_1.default.trad("$DonjonDissolutionGroupe", initiateur);
            TFMAdventure_1.default.instance.messageChat(message, "-", null);
            this.texteMessage.defTexte(message);
        };
        return InterfaceNotificationDissolutionGroupeDonjonADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceNotificationDissolutionGroupeDonjonADV = InterfaceNotificationDissolutionGroupeDonjonADV;
});
//# sourceMappingURL=InterfaceNotificationDissolutionGroupeDonjonADV.js.map