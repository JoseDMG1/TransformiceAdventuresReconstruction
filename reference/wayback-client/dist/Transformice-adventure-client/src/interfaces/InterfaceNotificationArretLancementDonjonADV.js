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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "../_tfmAdventure/TFMAdventure", "../_monde/_mobile/MobileADV"], function (require, exports, I_Conteneur_1, I_Bouton_1, I_Texte_1, Trad801_1, TFMAdventure_1, MobileADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceNotificationArretLancementDonjonADV = (function (_super) {
        __extends(InterfaceNotificationArretLancementDonjonADV, _super);
        function InterfaceNotificationArretLancementDonjonADV() {
            var _this = _super.call(this) || this;
            _this.modeFenetre(Trad801_1.default.trad("$DonjonTitreDonjonAnnule"), InterfaceNotificationArretLancementDonjonADV.fermer);
            _this.centrerAuto(0.5, 0.45);
            _this.afficherFondCadre()
                .defLargeurMin(400)
                .defLargeurMax(400);
            _this.texteMessage = new I_Texte_1.I_Texte("");
            _this.texteMessage.style.padding = "16px";
            var boutonFermer = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.fermer"));
            boutonFermer.defClique(InterfaceNotificationArretLancementDonjonADV.fermer);
            _this.ajouterElement(_this.texteMessage, boutonFermer);
            _this.style.zIndex = "2";
            return _this;
        }
        InterfaceNotificationArretLancementDonjonADV.receptionNotification = function (NOM_JOUEUR_CAUSE, TYPE) {
            var message = Trad801_1.default.trad(InterfaceNotificationArretLancementDonjonADV.clesTradsMessages[TYPE], NOM_JOUEUR_CAUSE);
            TFMAdventure_1.default.instance.messageChat(message, "-", null);
            if (InterfaceNotificationArretLancementDonjonADV.popupRequiseSuivantType[TYPE] && NOM_JOUEUR_CAUSE !== MobileADV_1.MobileADV.joueurPrincipal.nom) {
                InterfaceNotificationArretLancementDonjonADV.afficher(message);
            }
        };
        InterfaceNotificationArretLancementDonjonADV.afficher = function (MESSAGE) {
            if (!InterfaceNotificationArretLancementDonjonADV.instance) {
                InterfaceNotificationArretLancementDonjonADV.instance = new InterfaceNotificationArretLancementDonjonADV();
            }
            InterfaceNotificationArretLancementDonjonADV.instance.texteMessage.defTexte(MESSAGE);
            TFMAdventure_1.default.ajouterInterface(InterfaceNotificationArretLancementDonjonADV.instance.elementHTML);
        };
        InterfaceNotificationArretLancementDonjonADV.fermer = function () {
            if (InterfaceNotificationArretLancementDonjonADV.instance) {
                InterfaceNotificationArretLancementDonjonADV.instance.elementHTML.remove();
            }
        };
        InterfaceNotificationArretLancementDonjonADV.clesTradsMessages = {
            0: "$DonjonRetourRechercheDecoJoueur",
            1: "$DonjonArretRechercheDecoJoueur",
            2: "$DonjonRetourRechercheAnnulationJoueur",
            3: "$DonjonArretRechercheAnnulationJoueur",
            4: "$DonjonRetourRechercheJoueurPasPret",
            5: "$DonjonArretRechercheJoueurPasPret"
        };
        InterfaceNotificationArretLancementDonjonADV.popupRequiseSuivantType = {
            0: false,
            1: true,
            2: false,
            3: true,
            4: false,
            5: true
        };
        return InterfaceNotificationArretLancementDonjonADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceNotificationArretLancementDonjonADV = InterfaceNotificationArretLancementDonjonADV;
});
//# sourceMappingURL=InterfaceNotificationArretLancementDonjonADV.js.map