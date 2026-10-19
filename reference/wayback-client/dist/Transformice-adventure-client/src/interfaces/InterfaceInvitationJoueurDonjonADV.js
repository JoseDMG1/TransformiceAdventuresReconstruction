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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/interface/souruis/elements/I_ChampTexte", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV"], function (require, exports, I_Conteneur_1, I_Bouton_1, I_Texte_1, Trad801_1, I_ChampTexte_1, TFMAdventure_1, ProtoADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceInvitationJoueurDonjonADV = (function (_super) {
        __extends(InterfaceInvitationJoueurDonjonADV, _super);
        function InterfaceInvitationJoueurDonjonADV() {
            var _this = _super.call(this) || this;
            _this.modeFenetre(Trad801_1.default.trad("$DonjonInviterJoueur"), InterfaceInvitationJoueurDonjonADV.fermer);
            _this.centrerAuto(0.5, 0.45);
            _this.afficherFondCadre()
                .defLargeurMin(450)
                .defLargeurMax(450);
            var texteNom = new I_Texte_1.I_Texte(Trad801_1.default.trad("$texte.nom"));
            _this.champSaisieJoueur = new I_ChampTexte_1.I_ChampTexte(Trad801_1.default.trad("$texte.joueur"));
            _this.champSaisieJoueur.defLargeur("100%");
            var callbackCommune = function () {
                var nomJoueur = _this.champSaisieJoueur.recupTexte();
                if (!nomJoueur || nomJoueur.length <= 0) {
                    return;
                }
                _this.champSaisieJoueur.defTexte("");
                boutonInviter.desactiver();
                InterfaceInvitationJoueurDonjonADV.inviterJoueur(nomJoueur);
                InterfaceInvitationJoueurDonjonADV.fermer();
            };
            _this.champSaisieJoueur.defActionEntree(callbackCommune);
            var boutonInviter = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.inviter"));
            boutonInviter.defClique(callbackCommune);
            boutonInviter.desactiver();
            _this.champSaisieJoueur.defChangement(function () {
                boutonInviter.desactiver(_this.champSaisieJoueur.recupTexte().length <= 0);
            });
            var boutonAnnuler = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.annuler"));
            boutonAnnuler.defClique(InterfaceInvitationJoueurDonjonADV.fermer);
            _this.ajouterElement(texteNom, _this.champSaisieJoueur, boutonInviter, boutonAnnuler);
            boutonInviter.style.marginTop = "32px";
            return _this;
        }
        InterfaceInvitationJoueurDonjonADV.afficher = function () {
            if (!InterfaceInvitationJoueurDonjonADV.instance) {
                InterfaceInvitationJoueurDonjonADV.instance = new InterfaceInvitationJoueurDonjonADV();
            }
            TFMAdventure_1.default.ajouterInterface(InterfaceInvitationJoueurDonjonADV.instance.elementHTML, 1);
        };
        InterfaceInvitationJoueurDonjonADV.inviterJoueur = function (NOM_JOUEUR) {
            TFMAdventure_1.default.envoyer(ProtoADV_1.default.inviterJoueurGroupeDonjon(NOM_JOUEUR));
        };
        InterfaceInvitationJoueurDonjonADV.fermer = function () {
            if (InterfaceInvitationJoueurDonjonADV.instance) {
                InterfaceInvitationJoueurDonjonADV.instance.elementHTML.remove();
            }
        };
        return InterfaceInvitationJoueurDonjonADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceInvitationJoueurDonjonADV = InterfaceInvitationJoueurDonjonADV;
});
//# sourceMappingURL=InterfaceInvitationJoueurDonjonADV.js.map