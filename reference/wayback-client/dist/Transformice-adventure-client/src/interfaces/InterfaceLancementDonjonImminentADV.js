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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV", "../../../Souritheque-client/src/outils/son/MoteurSon"], function (require, exports, I_Conteneur_1, I_Bouton_1, I_Texte_1, Trad801_1, TFMAdventure_1, ProtoADV_1, MoteurSon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceLancementDonjonImminentADV = (function (_super) {
        __extends(InterfaceLancementDonjonImminentADV, _super);
        function InterfaceLancementDonjonImminentADV() {
            var _this = _super.call(this) || this;
            _this.dateFin = Number.MAX_VALUE;
            _this.dernierCompteAReboursAffiche = Number.MAX_VALUE;
            _this.fonctionBoucle = _this.boucle.bind(_this);
            _this.style.position = "absolute";
            _this.style.left = "50%";
            _this.style.top = "0";
            _this.style.transform = "translate(-50%)";
            _this.style.textAlign = "center";
            _this.modeFenetre(Trad801_1.default.trad("$DonjonPartieVaCommencer"));
            _this.afficherFondCadre().defLargeurMin(400);
            _this.texteCompteARebours = new I_Texte_1.I_Texte(Trad801_1.default.trad("$DonjonCompteAReboursDebut", 20));
            _this.texteJoueursPrets = new I_Texte_1.I_Texte(Trad801_1.default.trad("$DonjonNombreJoueursPrets", 1, 1));
            _this.texteStatutPret = new I_Texte_1.I_Texte(Trad801_1.default.trad("$DonjonVousNEtesPasPret"));
            _this.boutonPret = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonValidationPret"));
            _this.boutonPret.rendreCliquable(InterfaceLancementDonjonImminentADV.indiquerPret);
            var boutonQuitter = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.annuler"));
            boutonQuitter.rendreCliquable(InterfaceLancementDonjonImminentADV.demandeAnnuler);
            _this.ajouterElement(_this.texteCompteARebours, _this.texteJoueursPrets, _this.texteStatutPret, _this.boutonPret, boutonQuitter);
            _this.fonctionBoucle = _this.boucle.bind(_this);
            return _this;
        }
        InterfaceLancementDonjonImminentADV.afficher = function (MSG) {
            if (!InterfaceLancementDonjonImminentADV.instance) {
                InterfaceLancementDonjonImminentADV.instance = new InterfaceLancementDonjonImminentADV();
            }
            InterfaceLancementDonjonImminentADV.instance.initialisation(MSG);
            TFMAdventure_1.default.ajouterInterface(InterfaceLancementDonjonImminentADV.instance.elementHTML);
        };
        InterfaceLancementDonjonImminentADV.indiquerPret = function () {
            TFMAdventure_1.default.instance.envoyer(ProtoADV_1.default.joueurPretPourDonjon());
        };
        InterfaceLancementDonjonImminentADV.demandeAnnuler = function () {
            TFMAdventure_1.default.instance.envoyer(ProtoADV_1.default.annulerLancementDonjon());
            InterfaceLancementDonjonImminentADV.fermer();
        };
        InterfaceLancementDonjonImminentADV.fermer = function () {
            if (InterfaceLancementDonjonImminentADV.instance) {
                InterfaceLancementDonjonImminentADV.instance.elementHTML.remove();
                TFMAdventure_1.default.instance.app.ticker.remove(InterfaceLancementDonjonImminentADV.instance.fonctionBoucle);
            }
        };
        InterfaceLancementDonjonImminentADV.prototype.initialisation = function (MSG) {
            MoteurSon_1.default.jouerEffet("pret", 0.8);
            var debuterCompteARebours = MSG.lBool();
            if (debuterCompteARebours) {
                TFMAdventure_1.default.instance.app.ticker.remove(this.fonctionBoucle);
                this.dateFin = Date.now() + InterfaceLancementDonjonImminentADV.DUREE_COMPTE_A_REBOURS_SECONDES * 1000;
                this.dernierCompteAReboursAffiche = InterfaceLancementDonjonImminentADV.DUREE_COMPTE_A_REBOURS_SECONDES;
                this.texteCompteARebours.defTexte(Trad801_1.default.trad("$DonjonCompteAReboursDebut", InterfaceLancementDonjonImminentADV.DUREE_COMPTE_A_REBOURS_SECONDES));
            }
            TFMAdventure_1.default.instance.app.ticker.add(this.fonctionBoucle);
            var nombreJoueursPrets = MSG.l8();
            var nombreJoueurs = MSG.l8();
            var pret = MSG.lBool();
            this.boutonPret.desactiver(pret);
            this.texteJoueursPrets.defTexte(Trad801_1.default.trad("$DonjonNombreJoueursPrets", nombreJoueursPrets, nombreJoueurs));
            if (pret) {
                var texte = "✔️ " + Trad801_1.default.trad("$DonjonVousEtesPret");
                this.texteStatutPret.defTexte(texte);
                this.texteStatutPret.defCouleur(InterfaceLancementDonjonImminentADV.COULEUR_PRET);
            }
            else {
                this.texteStatutPret.defTexte("❌ " + Trad801_1.default.trad("$DonjonVousNEtesPasPret"));
                this.texteStatutPret.defCouleur(InterfaceLancementDonjonImminentADV.COULEUR_PAS_PRET);
            }
        };
        InterfaceLancementDonjonImminentADV.prototype.boucle = function () {
            var temps = Date.now();
            if (temps >= this.dateFin) {
                TFMAdventure_1.default.instance.app.ticker.remove(this.fonctionBoucle);
                return;
            }
            var compteAReboursAffiche = Math.max(0, Math.ceil((this.dateFin - temps) * 0.001));
            if (compteAReboursAffiche != this.dernierCompteAReboursAffiche) {
                this.texteCompteARebours.defTexte(Trad801_1.default.trad("$DonjonCompteAReboursDebut", compteAReboursAffiche));
                this.dernierCompteAReboursAffiche = compteAReboursAffiche;
            }
        };
        InterfaceLancementDonjonImminentADV.DUREE_COMPTE_A_REBOURS_SECONDES = 20;
        InterfaceLancementDonjonImminentADV.COULEUR_PRET = "#008800";
        InterfaceLancementDonjonImminentADV.COULEUR_PAS_PRET = "#991100";
        return InterfaceLancementDonjonImminentADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceLancementDonjonImminentADV = InterfaceLancementDonjonImminentADV;
});
//# sourceMappingURL=InterfaceLancementDonjonImminentADV.js.map