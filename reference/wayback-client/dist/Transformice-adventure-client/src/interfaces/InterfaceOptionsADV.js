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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/outils/Trad801", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../Souritheque-client/src/outils/son/MoteurSon", "../_tfmAdventure/ConfigADV", "../../../Souritheque-client/src/interface/souruis/elements/I_Element", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/interface/Couleur", "../../../Souritheque-client/src/interface/souruis/elements/I_BoutonEtat", "../_tfmAdventure/OptionsADV"], function (require, exports, I_Conteneur_1, Trad801_1, TFMAdventure_1, I_Image_1, MoteurSon_1, ConfigADV_1, I_Element_1, I_Texte_1, Couleur_1, I_BoutonEtat_1, OptionsADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceOptionsADV = (function (_super) {
        __extends(InterfaceOptionsADV, _super);
        function InterfaceOptionsADV() {
            var _this = _super.call(this, "colonne") || this;
            _this.defLargeurMax("85vw").defHauteurMax("65vh").defLargeurMin("23em").centrerAuto(0.5, 0.45);
            _this.modeFenetre(Trad801_1.default.trad("$texte.options"), _this.retirer);
            var conteneurSon = new I_Conteneur_1.I_Conteneur("colonne");
            var sousConteneurSon = new I_Element_1.I_Element("fieldset").defCSS({
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#7f744e",
                borderRadius: "15px",
                padding: "0 0.5em"
            });
            conteneurSon.appendChild(sousConteneurSon);
            var legendeSon = new I_Element_1.I_Element("legend").defCSS({
                color: "#" + Couleur_1.Couleur.DORE.toString(16),
                padding: "0px 5px",
                marginLeft: "15px"
            });
            legendeSon.elementHTML.innerText = Trad801_1.default.trad("$option.sons");
            sousConteneurSon.appendChild(legendeSon);
            var grilleSons = new I_Conteneur_1.I_Conteneur().defCSS({
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(9em, min-content))",
                padding: "0 1.5em",
                gridColumnGap: "1em",
                alignItems: "center",
                gridAutoRows: "minmax(0.2em, max-content)"
            });
            var conteneurControleurSonGlobal = new I_Conteneur_1.I_Conteneur("ligne").alignementEnfants("flex-end");
            _this.imageSonGlobal = new I_Image_1.I_Image().defLargeur(32).defHauteur(32).rendreCliquable(function () {
                _this.controleurSonGlobal.changerPosition(MoteurSon_1.default.volume == 0 ? 0.7 : 0);
            });
            _this.controleurSonGlobal = new ControleurVolume().definirFonctionChangement(OptionsADV_1.default.changerVolumeGlobal);
            conteneurControleurSonGlobal.ajouterElement(_this.imageSonGlobal, _this.controleurSonGlobal);
            var conteneurControleurSonMusique = new I_Conteneur_1.I_Conteneur("ligne").alignementEnfants("flex-end");
            _this.imageSonMusique = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "interface/sons/music.png").defLargeur(32).defHauteur(32);
            _this.controleurSonMusique = new ControleurVolume().definirFonctionChangement(OptionsADV_1.default.changerVolumeMusique);
            conteneurControleurSonMusique.ajouterElement(_this.imageSonMusique, _this.controleurSonMusique);
            var conteneurControleurSonFX = new I_Conteneur_1.I_Conteneur("ligne").alignementEnfants("flex-end");
            _this.imageSonFX = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "interface/sons/soundeffects.png").defLargeur(32).defHauteur(32);
            _this.controleurSonFX = new ControleurVolume().definirFonctionChangement(OptionsADV_1.default.changerVolumeFX);
            conteneurControleurSonFX.ajouterElement(_this.imageSonFX, _this.controleurSonFX);
            grilleSons.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$option.volumeGlobal")));
            grilleSons.ajouterElement(conteneurControleurSonGlobal);
            grilleSons.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$option.volumeMusique")));
            grilleSons.ajouterElement(conteneurControleurSonMusique);
            grilleSons.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$option.volumeFX")));
            grilleSons.ajouterElement(conteneurControleurSonFX);
            I_Conteneur_1.I_Conteneur.prototype.ajouterElement.call(sousConteneurSon, grilleSons);
            var conteneurEffets = new I_Conteneur_1.I_Conteneur("colonne");
            var sousConteneurEffets = new I_Element_1.I_Element("fieldset").defCSS({
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#7f744e",
                borderRadius: "15px",
                padding: "0 0.5em"
            });
            conteneurEffets.appendChild(sousConteneurEffets);
            var legendeEffets = new I_Element_1.I_Element("legend").defCSS({
                color: "#" + Couleur_1.Couleur.DORE.toString(16),
                padding: "0px 5px",
                marginLeft: "15px"
            });
            legendeEffets.elementHTML.innerText = Trad801_1.default.trad("$option.effets");
            sousConteneurEffets.appendChild(legendeEffets);
            var grilleEffets = new I_Conteneur_1.I_Conteneur().defCSS({
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(9em, min-content))",
                padding: "0 1.5em",
                gridColumnGap: "1em",
                alignItems: "center",
                gridAutoRows: "minmax(0.2em, max-content)"
            });
            _this.boutonLumiere = new I_BoutonEtat_1.I_BoutonEtat(Trad801_1.default.trad("$texte.activer"), OptionsADV_1.default.activerShaderLumieres);
            _this.boutonLumiere.recupChamp().style.flexGrow = "";
            _this.boutonEau = new I_BoutonEtat_1.I_BoutonEtat(Trad801_1.default.trad("$texte.activer"), OptionsADV_1.default.activerShaderEau);
            _this.boutonEau.recupChamp().style.flexGrow = "";
            _this.btnOptimisationAuto = new I_BoutonEtat_1.I_BoutonEtat(Trad801_1.default.trad("$texte.activer"), OptionsADV_1.default.activerOptimAuto);
            _this.btnOptimisationAuto.recupChamp().style.flexGrow = "";
            grilleEffets.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$option.effetLumiere")));
            grilleEffets.ajouterElement(_this.boutonLumiere.defCSS("margin", "0.2em 0.4em"));
            grilleEffets.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$option.effetEau")));
            grilleEffets.ajouterElement(_this.boutonEau.defCSS("margin", "0.2em 0.4em"));
            grilleEffets.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$option.optimAuto")));
            grilleEffets.ajouterElement(_this.btnOptimisationAuto.defCSS("margin", "0.2em 0.4em"));
            I_Conteneur_1.I_Conteneur.prototype.ajouterElement.call(sousConteneurEffets, grilleEffets);
            var conteneurAutre = new I_Conteneur_1.I_Conteneur("colonne");
            var sousConteneurAutre = new I_Element_1.I_Element("fieldset").defCSS({
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#7f744e",
                borderRadius: "15px",
                padding: "0 0.5em"
            });
            conteneurAutre.appendChild(sousConteneurAutre);
            var legendeAutre = new I_Element_1.I_Element("legend").defCSS({
                color: "#" + Couleur_1.Couleur.DORE.toString(16),
                padding: "0px 5px",
                marginLeft: "15px"
            });
            legendeAutre.elementHTML.innerText = Trad801_1.default.trad("$option.divers");
            sousConteneurAutre.appendChild(legendeAutre);
            var grilleAutre = new I_Conteneur_1.I_Conteneur().defCSS({
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(9em, min-content))",
                padding: "0 1.5em",
                gridColumnGap: "1em",
                alignItems: "center",
                gridAutoRows: "minmax(0.2em, max-content)"
            });
            _this.boutonPleinEcran = new I_BoutonEtat_1.I_BoutonEtat(Trad801_1.default.trad("$texte.activer"), function (ACTIF) {
                OptionsADV_1.default.activerPleinEcran(ACTIF, true, true);
            });
            _this.boutonPleinEcran.recupChamp().style.flexGrow = "";
            grilleAutre.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$option.pleinEcran")));
            grilleAutre.ajouterElement(_this.boutonPleinEcran.defCSS("margin", "0.2em 0.4em"));
            _this.boutonAfficherPseudo = new I_BoutonEtat_1.I_BoutonEtat(Trad801_1.default.trad("$texte.activer"), function (ACTIF) {
                OptionsADV_1.default.afficherPseudoJoueurPrincipal(ACTIF, true);
            });
            _this.boutonAfficherPseudo.recupChamp().style.flexGrow = "";
            grilleAutre.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$option.afficherPseudo")));
            grilleAutre.ajouterElement(_this.boutonAfficherPseudo.defCSS("margin", "0.2em 0.4em"));
            I_Conteneur_1.I_Conteneur.prototype.ajouterElement.call(sousConteneurAutre, grilleAutre);
            var conteneurGlobal = new I_Conteneur_1.I_Conteneur("colonne").defHauteur("100%");
            conteneurGlobal.ajouterElement(conteneurSon, conteneurEffets, conteneurAutre);
            conteneurGlobal.activerAscenseur();
            _this.ajouterElement(conteneurGlobal);
            return _this;
        }
        InterfaceOptionsADV.afficher = function (OUI) {
            if (OUI === void 0) { OUI = true; }
            if (OUI) {
                if (!this.instance) {
                    this.instance = new InterfaceOptionsADV();
                }
                this.instance.majInterface();
                document.body.appendChild(this.instance.elementHTML);
            }
            else {
                if (this.instance) {
                    this.instance.elementHTML.remove();
                }
            }
        };
        InterfaceOptionsADV.estAffiche = function () {
            return Boolean(InterfaceOptionsADV.instance && InterfaceOptionsADV.instance.elementHTML.parentNode);
        };
        InterfaceOptionsADV.cocherPleinEcran = function (OUI) {
            if (!InterfaceOptionsADV.instance) {
                return;
            }
            InterfaceOptionsADV.instance.boutonPleinEcran.cocher(OUI);
        };
        InterfaceOptionsADV.changerVolumeGlobal = function (VOLUME) {
            if (!InterfaceOptionsADV.instance) {
                return;
            }
            InterfaceOptionsADV.instance.controleurSonGlobal.changerPosition(VOLUME, false);
            InterfaceOptionsADV.instance.imageSonGlobal.chargerImage(ConfigADV_1.default.DATA_TFMADV + "interface/sons/" + (VOLUME == 0 ? "general_coupe.png" : "general.png"));
        };
        InterfaceOptionsADV.changerVolumeMusique = function (VOLUME) {
            if (!InterfaceOptionsADV.instance) {
                return;
            }
            InterfaceOptionsADV.instance.controleurSonMusique.changerPosition(VOLUME, false);
        };
        InterfaceOptionsADV.changerVolumeFX = function (VOLUME) {
            if (!InterfaceOptionsADV.instance) {
                return;
            }
            InterfaceOptionsADV.instance.controleurSonFX.changerPosition(VOLUME, false);
        };
        InterfaceOptionsADV.prototype.majInterface = function () {
            this.controleurSonGlobal.changerPosition(MoteurSon_1.default.volume, true);
            this.controleurSonMusique.changerPosition(MoteurSon_1.default.volumeCanal(MoteurSon_1.default.CANAL_MUSIQUE), true);
            this.controleurSonFX.changerPosition(MoteurSon_1.default.volumeCanal(MoteurSon_1.default.CANAL_EFFET), true);
            this.boutonLumiere.cocher(TFMAdventure_1.default.instance.performance.recupActivationOptionShaderLumiere());
            this.boutonEau.cocher(TFMAdventure_1.default.instance.performance.recupActivationOptionShaderEau());
            this.btnOptimisationAuto.cocher(TFMAdventure_1.default.instance.performance.optimisationAuto);
            this.boutonPleinEcran.cocher(window.electron ? window.estFullscreen() : document.fullscreenElement == document.documentElement);
            this.boutonAfficherPseudo.cocher(OptionsADV_1.default.options.affichagePseudoJoueurPrincipal);
        };
        return InterfaceOptionsADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceOptionsADV;
    var ControleurVolume = (function (_super) {
        __extends(ControleurVolume, _super);
        function ControleurVolume() {
            var _this = _super.call(this) || this;
            _this.valeur = 0;
            _this.style.position = "relative";
            var fond = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "interface/sons/fondjauge.png").defLargeur(161).defHauteur(37);
            var canvas = new I_Element_1.I_Element("canvas").defCSS({
                position: "absolute",
                top: (ControleurVolume.POSITION_CANVAS_Y - ControleurVolume.HAUTEUR_CONTROLEUR) + "px",
                left: "6px"
            });
            canvas.elementHTML.width = ControleurVolume.LARGEUR_CONTROLEUR;
            canvas.elementHTML.height = ControleurVolume.HAUTEUR_CONTROLEUR;
            _this.ctxCanvas = canvas.elementHTML.getContext('2d');
            _this.tirette = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "interface/sons/curseur.png").defLargeur(12).defHauteur(40).defCSS({
                position: "absolute",
                top: ControleurVolume.POSITION_TIRETTE_Y + "px",
                left: "6px"
            });
            _this.tirette.rendreDeplacable(null, (function (changePosition, X, Y) {
                this.style.top = ControleurVolume.POSITION_TIRETTE_Y + "px";
                if (this.decalageDeplacementX < ControleurVolume.DEPART_TIRETTE_X || this.decalageDeplacementX > ControleurVolume.FIN_TIRETTE_X) {
                    this.decalageDeplacementX = this.decalageDeplacementX < ControleurVolume.DEPART_TIRETTE_X ? ControleurVolume.DEPART_TIRETTE_X : ControleurVolume.FIN_TIRETTE_X;
                    this.style.left = this.decalageDeplacementX + "px";
                }
                var pourcentage = Math.round((this.decalageDeplacementX + 2) / ControleurVolume.LONGUEUR_TIRETTE_X * 100) / 100;
                changePosition(pourcentage);
            }).bind(_this.tirette, _this.changerPosition.bind(_this)));
            _this.appendChild(fond);
            _this.appendChild(canvas);
            _this.appendChild(_this.tirette);
            return _this;
        }
        ControleurVolume.prototype.changerPosition = function (POURCENTAGE, ACTION_CHANGEMENT) {
            if (ACTION_CHANGEMENT === void 0) { ACTION_CHANGEMENT = true; }
            this.valeur = POURCENTAGE;
            if (this.valeur < 0)
                this.valeur = 0;
            if (this.valeur > 1)
                this.valeur = 1;
            var posTirette = ControleurVolume.DEPART_TIRETTE_X + ControleurVolume.LONGUEUR_TIRETTE_X * this.valeur;
            this.tirette.style.left = posTirette + "px";
            this.ctxCanvas.clearRect(0, 0, 1000, 1000);
            this.ctxCanvas.beginPath();
            this.ctxCanvas.fillStyle = "#44662C";
            var largeurRemplissage = ControleurVolume.LARGEUR_CONTROLEUR * this.valeur;
            var hauteurRemplissage = ControleurVolume.DECALAGE_COIN_HAUT_GAUCHE_Y + (ControleurVolume.HAUTEUR_CONTROLEUR - ControleurVolume.DECALAGE_COIN_HAUT_GAUCHE_Y) * this.valeur;
            this.ctxCanvas.moveTo(0, ControleurVolume.HAUTEUR_CONTROLEUR);
            this.ctxCanvas.lineTo(Math.min(largeurRemplissage, ControleurVolume.LARGEUR_CONTROLEUR - 2), ControleurVolume.HAUTEUR_CONTROLEUR);
            var arrondiCoin = 3;
            if (largeurRemplissage > ControleurVolume.LARGEUR_CONTROLEUR - arrondiCoin) {
                var differenceArrondiCoin = arrondiCoin - (ControleurVolume.LARGEUR_CONTROLEUR - largeurRemplissage);
                this.ctxCanvas.lineTo(largeurRemplissage, ControleurVolume.HAUTEUR_CONTROLEUR - differenceArrondiCoin);
                this.ctxCanvas.lineTo(largeurRemplissage, ControleurVolume.HAUTEUR_CONTROLEUR - hauteurRemplissage + differenceArrondiCoin);
            }
            this.ctxCanvas.lineTo(Math.min(largeurRemplissage, ControleurVolume.LARGEUR_CONTROLEUR - 2), ControleurVolume.HAUTEUR_CONTROLEUR - hauteurRemplissage);
            if (largeurRemplissage > ControleurVolume.POS_DECALAGE_COIN_HAUT_GAUCHE_X) {
                this.ctxCanvas.lineTo(ControleurVolume.POS_DECALAGE_COIN_HAUT_GAUCHE_X, ControleurVolume.HAUTEUR_CONTROLEUR - ControleurVolume.DECALAGE_COIN_HAUT_GAUCHE_Y);
            }
            this.ctxCanvas.fill();
            if (this.fonctionChangement && ACTION_CHANGEMENT) {
                this.fonctionChangement(this.valeur);
            }
            return this;
        };
        ControleurVolume.prototype.recupValeur = function () {
            return this.valeur;
        };
        ControleurVolume.prototype.definirFonctionChangement = function (FONCTION_CHANGEMENT) {
            this.fonctionChangement = FONCTION_CHANGEMENT;
            return this;
        };
        ControleurVolume.LARGEUR_CONTROLEUR = 149;
        ControleurVolume.HAUTEUR_CONTROLEUR = 27;
        ControleurVolume.POSITION_CANVAS_Y = 32;
        ControleurVolume.POSITION_TIRETTE_Y = -2;
        ControleurVolume.POS_DECALAGE_COIN_HAUT_GAUCHE_X = 2;
        ControleurVolume.DECALAGE_COIN_HAUT_GAUCHE_Y = 3;
        ControleurVolume.DEPART_TIRETTE_X = -2;
        ControleurVolume.LONGUEUR_TIRETTE_X = 154;
        ControleurVolume.FIN_TIRETTE_X = ControleurVolume.LONGUEUR_TIRETTE_X - ControleurVolume.DEPART_TIRETTE_X;
        return ControleurVolume;
    }(I_Conteneur_1.I_Conteneur));
});
//# sourceMappingURL=InterfaceOptionsADV.js.map