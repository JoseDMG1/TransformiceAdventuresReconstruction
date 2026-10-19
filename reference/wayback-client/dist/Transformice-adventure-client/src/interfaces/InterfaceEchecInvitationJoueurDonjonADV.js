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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "./InterfaceInvitationJoueurDonjonADV", "../_tfmAdventure/TFMAdventure"], function (require, exports, I_Conteneur_1, I_Bouton_1, I_Texte_1, Trad801_1, InterfaceInvitationJoueurDonjonADV_1, TFMAdventure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceEchecInvitationJoueurDonjonADV = (function (_super) {
        __extends(InterfaceEchecInvitationJoueurDonjonADV, _super);
        function InterfaceEchecInvitationJoueurDonjonADV() {
            var _this = _super.call(this) || this;
            _this.modeFenetre(Trad801_1.default.trad("$DonjonTitreEchecInvitation"), InterfaceEchecInvitationJoueurDonjonADV.fermer);
            _this.centrerAuto(0.5, 0.45);
            _this.afficherFondCadre()
                .defLargeurMin(400)
                .defLargeurMax(300);
            _this.texteMessage = new I_Texte_1.I_Texte();
            _this.texteMessage.style.padding = "16px";
            var boutonFermer = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.fermer"));
            boutonFermer.defClique(InterfaceEchecInvitationJoueurDonjonADV.clicFermer);
            _this.ajouterElement(_this.texteMessage, boutonFermer);
            return _this;
        }
        InterfaceEchecInvitationJoueurDonjonADV.afficher = function (MSG) {
            if (!InterfaceEchecInvitationJoueurDonjonADV.instance) {
                InterfaceEchecInvitationJoueurDonjonADV.instance = new InterfaceEchecInvitationJoueurDonjonADV();
            }
            InterfaceEchecInvitationJoueurDonjonADV.instance.initialisation(MSG);
            TFMAdventure_1.default.ajouterInterface(InterfaceEchecInvitationJoueurDonjonADV.instance.elementHTML, 1);
        };
        InterfaceEchecInvitationJoueurDonjonADV.clicFermer = function () {
            InterfaceEchecInvitationJoueurDonjonADV.fermer();
            InterfaceInvitationJoueurDonjonADV_1.InterfaceInvitationJoueurDonjonADV.afficher();
        };
        InterfaceEchecInvitationJoueurDonjonADV.fermer = function () {
            if (InterfaceEchecInvitationJoueurDonjonADV.instance) {
                InterfaceEchecInvitationJoueurDonjonADV.instance.elementHTML.remove();
            }
        };
        InterfaceEchecInvitationJoueurDonjonADV.prototype.initialisation = function (MSG) {
            var nomJoueur = MSG.lChaine();
            var codeRaison = MSG.l8();
            var nbrSuggestions = MSG.l16();
            var texte = Trad801_1.default.trad(InterfaceEchecInvitationJoueurDonjonADV.clesMessagesErreurs[codeRaison], nomJoueur);
            for (var i = 0; i < nbrSuggestions; i++) {
                texte += "\n" + MSG.lChaine();
            }
            this.texteMessage.defTexte(texte);
        };
        InterfaceEchecInvitationJoueurDonjonADV.clesMessagesErreurs = {
            0: "$DonjonJoueurInviteInexistant",
            1: "$DonjonJoueurDejaDansUnGroupe",
            2: "$DonjonJoueurDejaDansUnDonjon",
            3: "$DonjonPlusieursResultats"
        };
        return InterfaceEchecInvitationJoueurDonjonADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceEchecInvitationJoueurDonjonADV = InterfaceEchecInvitationJoueurDonjonADV;
});
//# sourceMappingURL=InterfaceEchecInvitationJoueurDonjonADV.js.map