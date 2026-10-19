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
    var InterfaceStatutRechercheJoueursDonjonADV = (function (_super) {
        __extends(InterfaceStatutRechercheJoueursDonjonADV, _super);
        function InterfaceStatutRechercheJoueursDonjonADV() {
            var _this = _super.call(this) || this;
            _this.style.position = "absolute";
            _this.style.left = "50%";
            _this.style.top = "0";
            _this.style.transform = "translate(-50%)";
            _this.style.textAlign = "center";
            _this.modeFenetre(Trad801_1.default.trad("$DonjonRechercheJoueursEnCours"));
            _this.afficherFondCadre().defLargeurMin(400);
            _this.texteStatut = new I_Texte_1.I_Texte();
            _this.texteStatut.style.padding = "16px";
            var boutonQuitter = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonQuitterRechercheJoueurs"));
            boutonQuitter.rendreCliquable(InterfaceStatutRechercheJoueursDonjonADV.demandeAnnulerRecherche);
            _this.ajouterElement(_this.texteStatut, boutonQuitter);
            return _this;
        }
        InterfaceStatutRechercheJoueursDonjonADV.afficher = function (MSG) {
            if (!InterfaceStatutRechercheJoueursDonjonADV.instance) {
                InterfaceStatutRechercheJoueursDonjonADV.instance = new InterfaceStatutRechercheJoueursDonjonADV();
            }
            InterfaceStatutRechercheJoueursDonjonADV.instance.initialisation(MSG);
            TFMAdventure_1.default.ajouterInterface(InterfaceStatutRechercheJoueursDonjonADV.instance.elementHTML);
        };
        InterfaceStatutRechercheJoueursDonjonADV.demandeAnnulerRecherche = function () {
            InterfaceStatutRechercheJoueursDonjonADV.fermer();
            TFMAdventure_1.default.instance.envoyer(ProtoADV_1.default.annulerLancementDonjon());
        };
        InterfaceStatutRechercheJoueursDonjonADV.fermer = function () {
            if (InterfaceStatutRechercheJoueursDonjonADV.instance) {
                InterfaceStatutRechercheJoueursDonjonADV.instance.elementHTML.remove();
            }
        };
        InterfaceStatutRechercheJoueursDonjonADV.prototype.initialisation = function (MSG) {
            var infoDonjon = InfoDonjon.deserialisation(MSG);
            var difficulte = MSG.l8();
            var nombreJoueurs = MSG.l8();
            this.texteStatut.defTexte(InterfaceStatutRechercheJoueursDonjonADV.recupContenuStatut(infoDonjon, difficulte, nombreJoueurs));
        };
        InterfaceStatutRechercheJoueursDonjonADV.recupNomDonjon = function (INFO_DONJON) {
            return Trad801_1.default.trad("$Donjon_" + INFO_DONJON.nom);
        };
        InterfaceStatutRechercheJoueursDonjonADV.recupNomDifficulte = function (DIFFICULTE) {
            return Trad801_1.default.trad("$DonjonEtape " + (DIFFICULTE + 1));
        };
        InterfaceStatutRechercheJoueursDonjonADV.recupContenuStatut = function (INFO_DONJON, DIFFICULTE, NOMBRE_JOUEURS) {
            return InterfaceStatutRechercheJoueursDonjonADV.recupNomDonjon(INFO_DONJON)
                + " – "
                + InterfaceStatutRechercheJoueursDonjonADV.recupNomDifficulte(DIFFICULTE)
                + " – "
                + NOMBRE_JOUEURS
                + "/"
                + InterfaceStatutRechercheJoueursDonjonADV.NOMBRE_JOUEURS_MAX
                + "...";
        };
        InterfaceStatutRechercheJoueursDonjonADV.NOMBRE_JOUEURS_MAX = 4;
        return InterfaceStatutRechercheJoueursDonjonADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceStatutRechercheJoueursDonjonADV = InterfaceStatutRechercheJoueursDonjonADV;
    var InfoDonjon = (function () {
        function InfoDonjon(NOM) {
            this.nom = NOM;
        }
        InfoDonjon.deserialisation = function (MSG) {
            var nom = MSG.lChaine();
            return new InfoDonjon(nom);
        };
        return InfoDonjon;
    }());
});
//# sourceMappingURL=InterfaceStatutRechercheJoueursDonjonADV.js.map