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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/interface/souruis/elements/I_ChampTexte", "../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV"], function (require, exports, I_Conteneur_1, I_Bouton_1, Trad801_1, I_Texte_1, I_ChampTexte_1, ClipAnim_1, TFMAdventure_1, ProtoADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceEcurie = (function (_super) {
        __extends(InterfaceEcurie, _super);
        function InterfaceEcurie() {
            var _this = _super.call(this, "colonne") || this;
            _this.idFamilierSelectionne = -1;
            _this.idFamilierEnCours = -1;
            _this.modeFenetre(Trad801_1.default.trad("$ecurie"), _this.retirer);
            _this.afficherFondUni("#000000" + "7F", "0.2em", 10);
            _this.defLargeurMin("38em").defLargeurMax("52em").defLargeur("80%");
            _this.defHauteur("22em");
            _this.centrerAuto(0.5, 0.5);
            var conteneurPrincipal = new I_Conteneur_1.I_Conteneur("ligne").defHauteur(0);
            conteneurPrincipal.style.flexGrow = "1";
            var conteneurDetails = new I_Conteneur_1.I_Conteneur("colonne");
            var pourcentageTailleDetails = 40;
            conteneurDetails.style.flexBasis = pourcentageTailleDetails + "%";
            _this.conteneurClip = new I_Conteneur_1.I_Conteneur();
            _this.conteneurClip.style.height = "0";
            _this.conteneurClip.style.flexGrow = "1";
            _this.conteneurClip.afficherFondUni("#00000050");
            var conteneurNomEtDescription = new I_Conteneur_1.I_Conteneur("colonne");
            conteneurNomEtDescription.style.margin = "";
            _this.conteneurNom = new I_Conteneur_1.I_Conteneur("ligne");
            _this.champNom = new I_ChampTexte_1.I_ChampTexte().defTexteAide(Trad801_1.default.trad("$texte.nom")).defChangement(function () {
                if (!_this.boutonValidationNom.elementHTML.parentNode) {
                    _this.conteneurNom.ajouterElement(_this.boutonValidationNom);
                }
            });
            _this.champNom.style.flexGrow = "1";
            _this.boutonValidationNom = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.valider"), _this.cliqueBoutonChangementNom.bind(_this));
            _this.conteneurNom.ajouterElement(_this.champNom);
            var conteneurDescription = new I_Conteneur_1.I_Conteneur();
            conteneurDescription.afficherFondUni("#00000050");
            _this.champDescription = new I_Texte_1.I_Texte();
            _this.champDescription.defHauteurMin("3em");
            conteneurDescription.ajouterElement(_this.champDescription);
            conteneurNomEtDescription.ajouterElement(_this.conteneurNom, conteneurDescription);
            conteneurDetails.ajouterElement(_this.conteneurClip, conteneurNomEtDescription);
            conteneurNomEtDescription.style.margin = "";
            var conteneurListeEtBoutonAppel = new I_Conteneur_1.I_Conteneur("colonne");
            conteneurListeEtBoutonAppel.style.flexGrow = "1";
            _this.conteneurListeFamiliers = new I_Conteneur_1.I_Conteneur("ligne").multiligne(true);
            _this.conteneurListeFamiliers.defHauteur("100%");
            _this.boutonAppel = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$ecurie.invoquerFamilier"), _this.cliqueBoutonAppel.bind(_this));
            conteneurListeEtBoutonAppel.ajouterElement(_this.conteneurListeFamiliers, _this.boutonAppel);
            conteneurPrincipal.ajouterElement(conteneurDetails, conteneurListeEtBoutonAppel);
            _this.ajouterElement(conteneurPrincipal);
            return _this;
        }
        InterfaceEcurie.afficher = function (MSG) {
            if (!this.instance) {
                this.instance = new InterfaceEcurie();
            }
            this.instance.initialisation(MSG);
            this.changerFamilierEnCours(MSG.l16());
            TFMAdventure_1.default.instance.coucheInterface.appendChild(this.instance.elementHTML);
        };
        InterfaceEcurie.changerNom = function (ID_FAMILIER, NOM) {
            if (!this.instance) {
                return;
            }
            this.instance.validationChangementNom(ID_FAMILIER, NOM);
        };
        InterfaceEcurie.changerFamilierEnCours = function (ID_FAMILIER) {
            if (!this.instance) {
                return;
            }
            this.instance.changementFamilierEnCours(ID_FAMILIER);
        };
        InterfaceEcurie.prototype.initialisation = function (MSG) {
            var _this = this;
            this.listeFamiliers = {};
            this.reinitialiserSelection();
            var nbFamiliers = MSG.l32s();
            for (var i = 0; i < nbFamiliers; i++) {
                this.listeFamiliers[i] = {
                    familier: {
                        id: i,
                        codeMonstre: MSG.l8(),
                        nom: MSG.lChaine(),
                        clipAnim: new ClipAnim_1.ClipAnim(MSG)
                    },
                    conteneur: null
                };
            }
            this.conteneurListeFamiliers.vider();
            var _loop_1 = function (indexFamilier) {
                var infoFamilier = this_1.listeFamiliers[indexFamilier];
                var conteneurFamilier = new I_Conteneur_1.I_Conteneur();
                conteneurFamilier.defLargeur(120).defHauteur(120);
                conteneurFamilier.afficherFondUni("#00000050");
                var conteneurImage = infoFamilier.familier.clipAnim.recupElementInterface();
                conteneurFamilier.ajouterElementCentre(conteneurImage);
                this_1.conteneurListeFamiliers.ajouterElement(conteneurFamilier);
                conteneurFamilier.rendreCliquable(function () { return _this.selectionFamilier(infoFamilier.familier); });
                infoFamilier.conteneur = conteneurFamilier;
            };
            var this_1 = this;
            for (var _i = 0, _a = Object.keys(this.listeFamiliers); _i < _a.length; _i++) {
                var indexFamilier = _a[_i];
                _loop_1(indexFamilier);
            }
            if (this.idFamilierEnCours != -1 && this.listeFamiliers[this.idFamilierEnCours]) {
                this.selectionFamilier(this.listeFamiliers[this.idFamilierEnCours].familier);
            }
        };
        InterfaceEcurie.prototype.reinitialiserSelection = function () {
            if (this.idFamilierSelectionne != -1) {
                if (this.listeFamiliers[this.idFamilierSelectionne]) {
                    var conteneurSelectionne = this.listeFamiliers[this.idFamilierSelectionne].conteneur;
                    conteneurSelectionne.style.boxShadow = "";
                    conteneurSelectionne.style.border = "";
                    conteneurSelectionne.style.padding = "4px";
                }
                this.idFamilierSelectionne = -1;
                this.majBoutonAppel();
            }
            this.boutonAppel.desactiver(true);
            this.champNom.defTexte("");
            this.champNom.champ.disabled = true;
            this.boutonValidationNom.retirer();
            this.conteneurClip.vider();
        };
        InterfaceEcurie.prototype.selectionFamilier = function (INFO_FAMILIER) {
            var ancienIndexFamilierSelectionner = this.idFamilierSelectionne;
            this.reinitialiserSelection();
            if (INFO_FAMILIER != null && INFO_FAMILIER.id != ancienIndexFamilierSelectionner) {
                var conteneurSelectionne = this.listeFamiliers[INFO_FAMILIER.id].conteneur;
                conteneurSelectionne.style.border = "4px solid #ffd74f";
                conteneurSelectionne.style.boxShadow = "0px 0px 30px #ffd74f";
                conteneurSelectionne.style.padding = "0";
                this.idFamilierSelectionne = INFO_FAMILIER.id;
                this.boutonAppel.desactiver(false);
                this.majBoutonAppel();
                this.champNom.defTexte(INFO_FAMILIER.nom);
                this.champNom.champ.disabled = false;
                var conteneurImageFamilier = INFO_FAMILIER.clipAnim.recupElementInterface(200, 200);
                this.conteneurClip.ajouterElementCentre(conteneurImageFamilier);
            }
        };
        InterfaceEcurie.prototype.cliqueBoutonChangementNom = function () {
            if (this.idFamilierSelectionne != -1) {
                var infoFamilier = this.listeFamiliers[this.idFamilierSelectionne].familier;
                var nouveauNom = this.champNom.recupTexte().trim();
                if (nouveauNom != infoFamilier.nom) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.changerNomFamilier(infoFamilier.id, nouveauNom));
                }
            }
        };
        InterfaceEcurie.prototype.cliqueBoutonAppel = function () {
            if (this.idFamilierSelectionne != -1) {
                if (this.idFamilierSelectionne == this.idFamilierEnCours) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.rappelerFamilier());
                }
                else {
                    var infoFamilier = this.listeFamiliers[this.idFamilierSelectionne].familier;
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.spawnerFamilier(infoFamilier.id));
                    InterfaceEcurie.instance.retirer();
                }
            }
        };
        InterfaceEcurie.prototype.validationChangementNom = function (ID_FAMILIER, NOM) {
            var infoFamilier = this.listeFamiliers[this.idFamilierSelectionne].familier;
            infoFamilier.nom = NOM;
            if (ID_FAMILIER == this.idFamilierSelectionne) {
                this.champNom.defTexte(NOM);
                this.boutonValidationNom.retirer();
            }
        };
        InterfaceEcurie.prototype.changementFamilierEnCours = function (ID_FAMILIER) {
            if (this.idFamilierEnCours == ID_FAMILIER) {
                return;
            }
            if (this.listeFamiliers[ID_FAMILIER]) {
                this.idFamilierEnCours = ID_FAMILIER;
            }
            else {
                this.idFamilierEnCours = -1;
            }
            this.majBoutonAppel();
        };
        InterfaceEcurie.prototype.majBoutonAppel = function () {
            this.boutonAppel.defTexte(this.idFamilierEnCours == this.idFamilierSelectionne ? Trad801_1.default.trad("$ecurie.rappelerFamilier") : Trad801_1.default.trad("$ecurie.invoquerFamilier"));
        };
        return InterfaceEcurie;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceEcurie;
});
//# sourceMappingURL=InterfaceEcurie.js.map