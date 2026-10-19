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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/outils/UtilHTML"], function (require, exports, I_Conteneur_1, I_Texte_1, I_Bouton_1, I_Image_1, TFMAdventure_1, Trad801_1, UtilHTML_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceKickstarterADV = (function (_super) {
        __extends(InterfaceKickstarterADV, _super);
        function InterfaceKickstarterADV(TYPE) {
            var _this = _super.call(this, "colonne") || this;
            _this.modeFenetre("", function () {
                _this.retirer();
            });
            _this.defLargeurMin("20em").centrerAuto(0.5, 0.4);
            if (TYPE == 1) {
                _this.conteneur = new I_Conteneur_1.I_Conteneur();
                _this.ajouterElement(_this.conteneur);
                var texte = new I_Texte_1.I_Texte(Trad801_1.default.trad("$AideKS.aimer"));
                _this.conteneur.ajouterElement(texte);
                var ligne = _this.conteneur.nouvelleLigne();
                ligne.etirerContenu(true);
                ligne.ajouterElement(new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$adore"), function () {
                    _this.reponse(true);
                }));
                ligne.ajouterElement(new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bof"), function () {
                    _this.reponse(false);
                }));
            }
            else if (TYPE == 2) {
                _this.alignementEnfants("center");
                var jourRestant = Math.floor((1559923200000 - Date.now()) / 86400000);
                var image = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/flyerKS.jpg"));
                var texte1 = new I_Texte_1.I_Texte();
                texte1.defTexteHTML(Trad801_1.default.trad("$flyer.countdown", "<font color='#F79337'>" + jourRestant + "</font>"));
                texte1.style.textAlign = "center";
                var texte2 = new I_Texte_1.I_Texte(Trad801_1.default.trad("$flyer.texte"));
                texte2.style.textAlign = "center";
                var btn = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.AideKS"), function () {
                    UtilHTML_1.default.ouvrirLien("https://www.kickstarter.com/projects/atelier801/transformice-adventures");
                    _this.retirer();
                });
                btn.style.width = "100%";
                _this.ajouterElement(image, texte1, texte2, btn);
                var btn2 = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.fermer"), function () {
                    _this.retirer();
                });
                btn2.style.width = "100%";
                _this.ajouterElement(btn2);
            }
            return _this;
        }
        InterfaceKickstarterADV.prototype.reponse = function (OUI) {
            var _this = this;
            this.conteneur.vider();
            if (OUI) {
                var ligne = this.conteneur.nouvelleLigne();
                ligne.ajouterElement(new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/sourisks.png")).defHauteur(316));
                ligne.nouvelleColonne(function (COLONNE) {
                    COLONNE.justifierEnfants("space-between");
                    _this.defTitreFenetre(Trad801_1.default.trad("$super") + " ❤️");
                    var texte = new I_Texte_1.I_Texte(Trad801_1.default.trad("$AideKS"));
                    COLONNE.ajouterElement(texte);
                    COLONNE.ajouterElement(new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.AideKS"), function () {
                        UtilHTML_1.default.ouvrirLien("https://www.kickstarter.com/projects/atelier801/transformice-adventures");
                        _this.retirer();
                    }));
                });
            }
            else {
                this.defTitreFenetre(Trad801_1.default.trad("$dommage") + " 😢 ");
                var texte = new I_Texte_1.I_Texte(Trad801_1.default.trad("$AideKS"));
                this.conteneur.ajouterElement(texte);
                this.conteneur.ajouterElement(new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.AideKS"), function () {
                    UtilHTML_1.default.ouvrirLien("https://www.kickstarter.com/projects/atelier801/transformice-adventures");
                    _this.retirer();
                }));
            }
        };
        return InterfaceKickstarterADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceKickstarterADV;
});
//# sourceMappingURL=InterfaceKickstarterDV.js.map