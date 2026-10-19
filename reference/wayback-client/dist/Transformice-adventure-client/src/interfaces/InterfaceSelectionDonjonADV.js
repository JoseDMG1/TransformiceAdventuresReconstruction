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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV", "../../../Souritheque-client/src/interface/souruis/elements/I_BoutonChoixMultiples", "../../../Souritheque-client/src/interface/Couleur"], function (require, exports, I_Conteneur_1, I_Bouton_1, I_Image_1, I_Texte_1, Trad801_1, TFMAdventure_1, ProtoADV_1, I_BoutonChoixMultiples_1, Couleur_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceSelectionDonjonADV = (function (_super) {
        __extends(InterfaceSelectionDonjonADV, _super);
        function InterfaceSelectionDonjonADV() {
            var _this = _super.call(this, "colonne") || this;
            _this.nomsCliquablesDonjons = {};
            _this.modeFenetre(Trad801_1.default.trad("$DonjonSelectionner"), InterfaceSelectionDonjonADV.annuler);
            _this.centrerAuto(0.5, 0.4);
            _this.afficherFondCadre()
                .defLargeurMin(700)
                .defLargeurMax(700);
            var conteneurImageEtNom = new I_Conteneur_1.I_Conteneur("colonne");
            conteneurImageEtNom.style.position = "relative";
            conteneurImageEtNom.style.borderRight = "2px solid #32221B";
            _this.conteneurCadreDonjon = new I_Conteneur_1.I_Conteneur();
            _this.conteneurCadreDonjon.defLargeurMax(InterfaceSelectionDonjonADV.LARGEUR_CADRE_MINIATURE);
            _this.conteneurCadreDonjon.defHauteurMax(InterfaceSelectionDonjonADV.HAUTEUR_CADRE_MINIATURE);
            _this.conteneurCadreDonjon.margeAuto();
            _this.conteneurCadreDonjon.style.backgroundPosition = "center center";
            _this.conteneurCadreDonjon.style.backgroundSize = InterfaceSelectionDonjonADV.LARGEUR_MINIATURE + "px " + InterfaceSelectionDonjonADV.HAUTEUR_MINIATURE + "px";
            _this.conteneurCadreDonjon.style.backgroundRepeat = "no-repeat";
            var imageCadre = new I_Image_1.I_Image("tfmadv/interface/donjon/miniature/cadre-miniature.png");
            imageCadre.style.margin = "0";
            _this.conteneurCadreDonjon.ajouterElement(imageCadre);
            _this.libelleNomDonjon = new I_Texte_1.I_Texte().defAlignement("center").defCouleur(Couleur_1.Couleur.DORE);
            _this.libelleNomDonjon.style.position = "absolute";
            _this.libelleNomDonjon.style.left = "50%";
            _this.libelleNomDonjon.style.bottom = "0em";
            _this.libelleNomDonjon.style.transform = "translate(-50%, -50%)";
            conteneurImageEtNom.ajouterElement(_this.conteneurCadreDonjon);
            conteneurImageEtNom.appendChild(_this.libelleNomDonjon);
            var conteneurDonjonsEtDifficulte = new I_Conteneur_1.I_Conteneur("colonne");
            conteneurDonjonsEtDifficulte.defLargeur("100%");
            _this.conteneurDonjons = new I_Conteneur_1.I_Conteneur("colonne");
            _this.conteneurDonjons.etirer();
            _this.conteneurDonjons.activerAscenseur();
            _this.boutonDifficulte = new I_BoutonChoixMultiples_1.default();
            for (var i = 0; i < InterfaceSelectionDonjonADV.NOMBRE_NIVEAUX_DIFFICULTE; i++) {
                var difficulte = i + 1;
                _this.boutonDifficulte.ajouterOption(InterfaceSelectionDonjonADV.recupNomDifficulte(difficulte), difficulte);
            }
            _this.boutonDifficulte.defChangement(function (VALEUR) {
                _this.difficulteChoisie = VALEUR;
            });
            var conteneurDonjon = new I_Conteneur_1.I_Conteneur("ligne");
            conteneurDonjon.afficherFondUni("#000000" + "4C", "0.5em");
            conteneurDonjon.ajouterElement(conteneurImageEtNom, conteneurDonjonsEtDifficulte);
            conteneurDonjonsEtDifficulte.ajouterElement(_this.conteneurDonjons, _this.boutonDifficulte);
            _this.selectionnerDifficulte(1);
            var boutonValider = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.valider"));
            boutonValider.defClique(function () {
                InterfaceSelectionDonjonADV.validerDonjon(_this.infoDonjonChoisi, _this.difficulteChoisie);
                InterfaceSelectionDonjonADV.fermer();
            });
            var boutonAnnuler = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.annuler"));
            boutonAnnuler.defClique(InterfaceSelectionDonjonADV.annuler);
            _this.ajouterElement(conteneurDonjon, boutonValider, boutonAnnuler);
            return _this;
        }
        InterfaceSelectionDonjonADV.afficher = function (MSG) {
            if (!InterfaceSelectionDonjonADV.instance) {
                InterfaceSelectionDonjonADV.instance = new InterfaceSelectionDonjonADV();
            }
            InterfaceSelectionDonjonADV.instance.initialisation(MSG);
            TFMAdventure_1.default.ajouterInterface(InterfaceSelectionDonjonADV.instance.elementHTML);
        };
        InterfaceSelectionDonjonADV.validerDonjon = function (INFO_DONJON, DIFFICULTE_CHOISIE) {
            TFMAdventure_1.default.envoyer(ProtoADV_1.default.selectionnerDonjon(INFO_DONJON.nom, DIFFICULTE_CHOISIE));
        };
        InterfaceSelectionDonjonADV.annuler = function () {
            InterfaceSelectionDonjonADV.fermer();
            TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeInterfaceLancementDonjon());
        };
        InterfaceSelectionDonjonADV.fermer = function () {
            if (InterfaceSelectionDonjonADV.instance) {
                InterfaceSelectionDonjonADV.instance.elementHTML.remove();
            }
        };
        InterfaceSelectionDonjonADV.prototype.initialisation = function (MSG) {
            this.conteneurDonjons.vider();
            this.nomsCliquablesDonjons = {};
            var donjonChoisi = MSG.lChaine();
            var difficulteChoisie = MSG.l8();
            var nombreDonjons = MSG.l8();
            for (var i = 0; i < nombreDonjons; i++) {
                var infoDonjon = InfoDonjon.deserialisation(MSG);
                this.ajouterDonjon(infoDonjon);
                if (infoDonjon.nom === donjonChoisi) {
                    this.selectionnerDonjon(infoDonjon);
                }
            }
            this.selectionnerDifficulte(difficulteChoisie);
        };
        InterfaceSelectionDonjonADV.prototype.ajouterDonjon = function (INFO_DONJON) {
            var _this = this;
            var nomCliquableDonjon = new I_Texte_1.I_Texte("⚔️ " + InterfaceSelectionDonjonADV.recupNomDonjon(INFO_DONJON));
            nomCliquableDonjon.rendreCliquable(function () {
                _this.selectionnerDonjon(INFO_DONJON);
            });
            this.conteneurDonjons.ajouterElement(nomCliquableDonjon);
            this.nomsCliquablesDonjons[INFO_DONJON.nom] = nomCliquableDonjon;
        };
        InterfaceSelectionDonjonADV.prototype.selectionnerDonjon = function (INFO_DONJON) {
            this.modifierMiniatureDonjon(InterfaceSelectionDonjonADV.recupCheminMiniature(INFO_DONJON.nom));
            this.libelleNomDonjon.defTexte(InterfaceSelectionDonjonADV.recupNomDonjon(INFO_DONJON));
            if (this.nomCliquableDonjonChoisi) {
                this.nomCliquableDonjonChoisi.style.color = "";
            }
            this.nomCliquableDonjonChoisi = this.nomsCliquablesDonjons[INFO_DONJON.nom];
            this.nomCliquableDonjonChoisi.style.color = Couleur_1.Couleur._VERT_POMME;
            this.infoDonjonChoisi = INFO_DONJON;
        };
        InterfaceSelectionDonjonADV.prototype.selectionnerDifficulte = function (DIFFICULTE) {
            this.boutonDifficulte.selectionner(DIFFICULTE - 1);
            this.difficulteChoisie = DIFFICULTE;
        };
        InterfaceSelectionDonjonADV.prototype.modifierMiniatureDonjon = function (URL) {
            this.conteneurCadreDonjon.style.backgroundImage = "url(\"" + URL + "\")";
        };
        InterfaceSelectionDonjonADV.recupCheminMiniature = function (NOM_DONJON) {
            return I_Image_1.I_Image.BASE_IMAGE + "tfmadv/interface/donjon/miniature/" + NOM_DONJON + ".jpg";
        };
        InterfaceSelectionDonjonADV.recupNomDifficulte = function (DIFFICULTE) {
            return Trad801_1.default.trad("$DifficulteDonjon" + DIFFICULTE);
        };
        InterfaceSelectionDonjonADV.recupNomDonjon = function (INFO_DONJON) {
            return Trad801_1.default.trad("$Donjon_" + INFO_DONJON.nom);
        };
        InterfaceSelectionDonjonADV.NOMBRE_NIVEAUX_DIFFICULTE = 1;
        InterfaceSelectionDonjonADV.LARGEUR_MINIATURE = 400;
        InterfaceSelectionDonjonADV.HAUTEUR_MINIATURE = 300;
        InterfaceSelectionDonjonADV.LARGEUR_CADRE_MINIATURE = 404;
        InterfaceSelectionDonjonADV.HAUTEUR_CADRE_MINIATURE = 310;
        return InterfaceSelectionDonjonADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceSelectionDonjonADV = InterfaceSelectionDonjonADV;
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
//# sourceMappingURL=InterfaceSelectionDonjonADV.js.map