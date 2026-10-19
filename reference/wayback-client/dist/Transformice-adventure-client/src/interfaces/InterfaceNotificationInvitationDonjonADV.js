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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV"], function (require, exports, I_Conteneur_1, I_Bouton_1, I_Texte_1, Trad801_1, TFMAdventure_1, ProtoADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceNotificationInvitationDonjonADV = (function (_super) {
        __extends(InterfaceNotificationInvitationDonjonADV, _super);
        function InterfaceNotificationInvitationDonjonADV() {
            var _this = _super.call(this) || this;
            _this.joueursBloques = {};
            _this.modeFenetre(Trad801_1.default.trad("$DonjonInvitationRecueTitre"), function () { return _this.repondreInvitation(false); });
            _this.centrerAuto(0.5, 0.45);
            _this.afficherFondCadre()
                .defLargeurMin(450)
                .defLargeurMax(450);
            _this.texteMessage = new I_Texte_1.I_Texte();
            _this.texteMessage.style.padding = "16px";
            var boutonAccepter = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonAccepterInvitation"));
            boutonAccepter.defClique(function () {
                _this.repondreInvitation(true);
            });
            var boutonRefuser = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonRefuserInvitation"));
            boutonRefuser.defClique(function () {
                _this.repondreInvitation(false);
            });
            var boutonBloquer = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonBloquerInvitation"));
            boutonBloquer.defClique(function () {
                _this.joueursBloques[_this.nomInitiateur] = true;
                _this.repondreInvitation(false);
            });
            _this.ajouterElement(_this.texteMessage, boutonAccepter, boutonRefuser, boutonBloquer);
            return _this;
        }
        InterfaceNotificationInvitationDonjonADV.receptionInvitation = function (MSG) {
            if (!InterfaceNotificationInvitationDonjonADV.instance) {
                InterfaceNotificationInvitationDonjonADV.instance = new InterfaceNotificationInvitationDonjonADV();
            }
            if (InterfaceNotificationInvitationDonjonADV.instance.initialisation(MSG)) {
                TFMAdventure_1.default.ajouterInterface(InterfaceNotificationInvitationDonjonADV.instance.elementHTML, 1);
            }
        };
        InterfaceNotificationInvitationDonjonADV.fermer = function () {
            if (InterfaceNotificationInvitationDonjonADV.instance) {
                InterfaceNotificationInvitationDonjonADV.instance.elementHTML.remove();
            }
        };
        InterfaceNotificationInvitationDonjonADV.prototype.initialisation = function (MSG) {
            var nomInitiateur = MSG.lChaine();
            var niveauInferieur = MSG.lBool();
            if (this.joueursBloques[nomInitiateur]) {
                this.envoyerReponseInvitation(false);
                return false;
            }
            this.nomInitiateur = nomInitiateur;
            this.texteMessage.defTexte(Trad801_1.default.trad("$DonjonInvitationRecue", nomInitiateur));
            return true;
        };
        InterfaceNotificationInvitationDonjonADV.prototype.repondreInvitation = function (ACCEPTER) {
            this.envoyerReponseInvitation(ACCEPTER);
            InterfaceNotificationInvitationDonjonADV.fermer();
        };
        InterfaceNotificationInvitationDonjonADV.prototype.envoyerReponseInvitation = function (ACCEPTER) {
            TFMAdventure_1.default.envoyer(ProtoADV_1.default.reponseInvitationGroupeDonjon(this.nomInitiateur, ACCEPTER));
        };
        return InterfaceNotificationInvitationDonjonADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceNotificationInvitationDonjonADV = InterfaceNotificationInvitationDonjonADV;
});
//# sourceMappingURL=InterfaceNotificationInvitationDonjonADV.js.map