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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Module801", "../_tfmAdventure/ProtoADV", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/outils/son/MoteurSon"], function (require, exports, I_Conteneur_1, I_Bouton_1, Trad801_1, I_Image_1, I_Texte_1, Module801_1, ProtoADV_1, TFMAdventure_1, MoteurSon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceRecompenseRencontre = (function (_super) {
        __extends(InterfaceRecompenseRencontre, _super);
        function InterfaceRecompenseRencontre() {
            var _this = _super.call(this) || this;
            _this.idCoffre = -1;
            _this.donSelectionne = null;
            _this.conteneursDon = {};
            _this.modeFenetre(Trad801_1.default.trad("$donsElisah"), InterfaceRecompenseRencontre.fermer);
            _this.centrerAuto(0.5, 0.4);
            _this.defLargeurMin(200);
            _this.conteneurDons = new I_Conteneur_1.I_Conteneur("ligne");
            _this.boutonValider = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.valider"), _this.clicBoutonValider.bind(_this)).desactiver(true);
            var boutonFermer = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.fermer"), function () { return InterfaceRecompenseRencontre.fermer(); });
            _this.ajouterElement(_this.conteneurDons, _this.boutonValider, boutonFermer);
            return _this;
        }
        InterfaceRecompenseRencontre.afficher = function (MSG) {
            if (!this.instance) {
                this.instance = new InterfaceRecompenseRencontre();
            }
            this.instance.initialisation(MSG);
            TFMAdventure_1.default.ajouterInterface(this.instance.elementHTML);
            MoteurSon_1.default.jouerEffet("coffre2", 0.7);
        };
        InterfaceRecompenseRencontre.fermer = function () {
            if (InterfaceRecompenseRencontre.instance) {
                InterfaceRecompenseRencontre.instance.elementHTML.remove();
            }
        };
        InterfaceRecompenseRencontre.prototype.initialisation = function (MSG) {
            var _this = this;
            this.idCoffre = MSG.l32s();
            this.donSelectionne = null;
            var nbDons = MSG.l8();
            var codesDons = [];
            for (var i = 0; i < nbDons; i++) {
                codesDons.push({
                    identifiant: MSG.l32s(),
                    categorie: MSG.l32s()
                });
            }
            this.conteneurDons.vider();
            this.conteneursDon = {};
            var _loop_1 = function (i) {
                var infoDon = codesDons[i];
                var conteneurDon = new I_Conteneur_1.I_Conteneur("colonne");
                conteneurDon.afficherFondUni("#000000" + "50", "0.2em", 5);
                conteneurDon.alignementEnfants("center");
                conteneurDon.style.margin = "0.5em";
                conteneurDon.style.minWidth = "10em";
                conteneurDon.style.maxWidth = "15em";
                conteneurDon.style.display = "flex";
                var conteneurIconeDon = new I_Conteneur_1.I_Conteneur();
                conteneurIconeDon.defLargeur(100).defHauteur(100);
                conteneurIconeDon.alignementEnfants("center").justifierEnfants("center");
                var imageCadre = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/dons/cadres/" + infoDon.categorie + ".png"));
                imageCadre.style.position = "absolute";
                var iconeDon = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/dons/" + infoDon.identifiant + ".jpg"));
                conteneurIconeDon.ajouterElement(imageCadre);
                conteneurIconeDon.ajouterElement(iconeDon);
                var champNomDon = new I_Texte_1.I_Texte(Trad801_1.default.trad("$don." + infoDon.identifiant + ".nom"));
                champNomDon.defCouleur("#FFD991");
                champNomDon.style.textAlign = "center";
                champNomDon.style.wordBreak = "break-word";
                champNomDon.style.width = "100%";
                champNomDon.style.minWidth = "100px";
                champNomDon.style.fontSize = "1.1em";
                champNomDon.style.textTransform = "capitalize";
                var champDescriptionDon = new I_Texte_1.I_Texte(Trad801_1.default.trad("$don." + infoDon.identifiant + ".description"));
                champDescriptionDon.style.display = "flex";
                champDescriptionDon.style.marginTop = "1em";
                champDescriptionDon.style.fontSize = "0.8em";
                champDescriptionDon.style.lineHeight = "1.5em";
                champDescriptionDon.style.textAlign = "center";
                champDescriptionDon.style.justifyContent = "center";
                champDescriptionDon.style.wordSpacing = "-0.1em";
                champDescriptionDon.style.flexGrow = "1";
                champDescriptionDon.style.alignItems = "center";
                conteneurDon.ajouterElement(champNomDon, conteneurIconeDon, champDescriptionDon);
                this_1.conteneurDons.ajouterElement(conteneurDon);
                conteneurDon.style.boxSizing = "border-box";
                conteneurDon.style.padding = "calc(0.5em + 4px)";
                conteneurDon.rendreCliquable(function () {
                    var ancienCodeDonSelectionne = _this.donSelectionne;
                    _this.donSelectionne = ancienCodeDonSelectionne == infoDon ? null : infoDon;
                    _this.boutonValider.desactiver(_this.donSelectionne == null);
                    if (ancienCodeDonSelectionne != null) {
                        var ancienConteneurDonSelectionne = _this.conteneursDon[ancienCodeDonSelectionne.identifiant];
                        ancienConteneurDonSelectionne.style.boxShadow = "";
                        ancienConteneurDonSelectionne.style.border = "";
                        ancienConteneurDonSelectionne.style.padding = "calc(0.5em + 4px)";
                    }
                    if (_this.donSelectionne != null) {
                        conteneurDon.style.border = "4px solid #ffd74f";
                        conteneurDon.style.boxShadow = "0px 0px 30px #ffd74f";
                        conteneurDon.style.padding = "0.5em";
                    }
                });
                this_1.conteneursDon[infoDon.identifiant] = conteneurDon;
            };
            var this_1 = this;
            for (var i = 0; i < codesDons.length; i++) {
                _loop_1(i);
            }
        };
        InterfaceRecompenseRencontre.prototype.clicBoutonValider = function () {
            if (this.donSelectionne == null) {
                return;
            }
            Module801_1.default.instance.envoyer(ProtoADV_1.default.selectionRecompenseCoffre(this.idCoffre, this.donSelectionne.identifiant));
            InterfaceRecompenseRencontre.fermer();
        };
        return InterfaceRecompenseRencontre;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceRecompenseRencontre;
});
//# sourceMappingURL=InterfaceRecompenseRencontre.js.map