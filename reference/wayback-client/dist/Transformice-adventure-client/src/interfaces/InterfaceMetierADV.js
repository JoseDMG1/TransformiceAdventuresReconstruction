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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../_tfmAdventure/ProtoADV", "../../../Souritheque-client/src/interface/Couleur"], function (require, exports, I_Conteneur_1, Trad801_1, I_Image_1, TFMAdventure_1, I_Texte_1, I_Bouton_1, ProtoADV_1, Couleur_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceMetierADV = (function (_super) {
        __extends(InterfaceMetierADV, _super);
        function InterfaceMetierADV() {
            var _this = _super.call(this) || this;
            _this.metiers = [];
            _this.mode = 0;
            _this.modeFenetre(Trad801_1.default.trad("$ui.metiers"), function () {
                InterfaceMetierADV.fermer();
            });
            _this.centrerAuto();
            _this.defLargeur(800);
            _this.defHauteurMax(600);
            _this.etirerContenu();
            _this.conteneurPrincipal = new I_Conteneur_1.I_Conteneur("ligne");
            _this.conteneurPrincipal.activerAscenseur();
            _this.ajouterElement(_this.conteneurPrincipal);
            return _this;
        }
        InterfaceMetierADV.afficher = function (MSG) {
            if (!this.instance) {
                this.instance = new InterfaceMetierADV();
            }
            this.instance.majInterface(MSG);
        };
        InterfaceMetierADV.prototype.majInterface = function (MSG) {
            this.metiers = [];
            var afficher = MSG.lBool();
            if (afficher) {
                this.mode = InterfaceMetierADV.MODE_CHOIX;
            }
            var metierPrincipal = MSG.l16();
            this.metierSecondaireDebloque = MSG.lBool();
            var metierSecondaire = MSG.l16();
            this.competenceSecondaire = MSG.l16();
            var nombreMetiers = MSG.l8();
            this.metierPrincipal = null;
            this.metierSecondaire = null;
            for (var i = 0; i < nombreMetiers; i++) {
                var idMetier = MSG.l8();
                var idCompetence1 = MSG.l16();
                var idCompetence2 = MSG.l16();
                var metier = { identifiant: idMetier, competences: [idCompetence1, idCompetence2] };
                if (idMetier == metierPrincipal) {
                    this.metierPrincipal = metier;
                }
                if (idMetier == metierSecondaire) {
                    this.metierSecondaire = metier;
                }
                this.metiers.push(metier);
            }
            switch (this.mode) {
                case InterfaceMetierADV.MODE_CHOIX:
                    this.afficherModeChoix();
                    break;
                case InterfaceMetierADV.MODE_PRINCIPAL:
                    this.afficherModePrincipal();
                    break;
                case InterfaceMetierADV.MODE_SECONDAIRE:
                    this.afficherModeSecondaire();
                    break;
            }
            if (afficher) {
                TFMAdventure_1.default.ajouterInterface(this.elementHTML);
            }
        };
        InterfaceMetierADV.prototype.afficherModeChoix = function () {
            var _this = this;
            this.boutonFermer.rendreCliquable(function (EVT) {
                InterfaceMetierADV.fermer();
            });
            this.defTitreFenetre(Trad801_1.default.trad("$ui.metiers"));
            this.conteneurPrincipal.vider();
            this.conteneurPrincipal.modeLigne(true);
            this.conteneurPrincipal.justifierEnfants("space-around");
            this.conteneurPrincipal.nouvelleColonne(function (COLONNE) {
                _this.remplirConteneurModeChoix(COLONNE, _this.metierPrincipal, false, function (EVT) {
                    _this.afficherModePrincipal();
                });
            });
            this.conteneurPrincipal.nouvelleColonne(function (COLONNE) {
                _this.remplirConteneurModeChoix(COLONNE, _this.metierSecondaire, true, function (EVT) {
                    _this.afficherModeSecondaire();
                });
            });
        };
        InterfaceMetierADV.prototype.afficherModePrincipal = function () {
            var _this = this;
            this.defTitreFenetre(Trad801_1.default.trad("$ui.metierPrincipal"));
            this.conteneurPrincipal.vider();
            this.conteneurPrincipal.modeLigne(false);
            this.conteneurPrincipal.justifierEnfants("flex-start");
            this.boutonFermer.rendreCliquable(function (EVT) {
                _this.afficherModeChoix();
            });
            for (var _i = 0, _a = this.metiers; _i < _a.length; _i++) {
                var metier = _a[_i];
                var conteneurMetier = this.creerConteneurMetier(metier, false);
                this.conteneurPrincipal.ajouterElement(conteneurMetier);
                conteneurMetier.style.marginBottom = "2em";
            }
        };
        InterfaceMetierADV.prototype.afficherModeSecondaire = function () {
            var _this = this;
            this.defTitreFenetre(Trad801_1.default.trad("$ui.metierSecondaire"));
            this.conteneurPrincipal.vider();
            this.conteneurPrincipal.modeLigne(false);
            this.conteneurPrincipal.justifierEnfants("flex-start");
            this.boutonFermer.rendreCliquable(function (EVT) {
                _this.afficherModeChoix();
            });
            for (var _i = 0, _a = this.metiers; _i < _a.length; _i++) {
                var metier = _a[_i];
                if (metier != this.metierPrincipal) {
                    var conteneurMetier = this.creerConteneurMetier(metier, true);
                    this.conteneurPrincipal.ajouterElement(conteneurMetier);
                    conteneurMetier.style.marginBottom = "2em";
                }
            }
        };
        InterfaceMetierADV.prototype.remplirConteneurModeChoix = function (CONTENEUR, METIER, SECONDAIRE, CALLBACK) {
            CONTENEUR.justifierEnfants("center");
            var texte = new I_Texte_1.I_Texte(Trad801_1.default.trad(SECONDAIRE ? "$ui.metierSecondaire" : "$ui.metierPrincipal"));
            texte.defCouleur(Couleur_1.Couleur.DORE);
            texte.defTaille("1.3em");
            texte.defAlignement("center");
            CONTENEUR.ajouterElement(texte);
            var vignetteMetier = this.creerVignetteMetier(METIER, SECONDAIRE, true);
            CONTENEUR.ajouterElement(vignetteMetier);
            var bouton = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$ui.modifier"));
            bouton.defClique(CALLBACK);
            if (SECONDAIRE && !this.metierSecondaireDebloque) {
                bouton.desactiver();
            }
            CONTENEUR.ajouterElement(bouton);
            bouton.style.width = "150px";
            bouton.style.alignSelf = "center";
        };
        InterfaceMetierADV.prototype.creerConteneurMetier = function (METIER, METIER_SECONDAIRE) {
            var _this = this;
            var conteneur = new I_Conteneur_1.I_Conteneur("ligne");
            conteneur.nouvelleColonne(function (COLONNE) {
                COLONNE.ajouterElement(_this.creerVignetteMetier(METIER, METIER_SECONDAIRE, !METIER_SECONDAIRE));
            });
            if (METIER_SECONDAIRE) {
                conteneur.nouvelleColonne(function (COLONNE) {
                    _this.remplirVignetteCompetence(COLONNE, METIER, METIER.competences[0]);
                });
                conteneur.nouvelleColonne(function (COLONNE) {
                    _this.remplirVignetteCompetence(COLONNE, METIER, METIER.competences[1]);
                });
            }
            else {
                conteneur.nouvelleColonne(function (COLONNE) {
                    var conteneurDescription = new I_Conteneur_1.I_Conteneur("ligne");
                    conteneurDescription.afficherFondUni("#000000" + "4C", "0.5em");
                    conteneurDescription.activerAscenseur();
                    var texteDescription = new I_Texte_1.I_Texte(Trad801_1.default.trad("$metier.desc." + METIER.identifiant));
                    texteDescription.multiligne();
                    texteDescription.style.width = "100%";
                    texteDescription.style.marginRight = "30px";
                    conteneurDescription.ajouterElement(texteDescription);
                    conteneurDescription.defLargeur("480px");
                    conteneurDescription.defHauteur("200px");
                    COLONNE.ajouterElement(conteneurDescription);
                    var texteChoisir = METIER == _this.metierPrincipal ? Trad801_1.default.trad("$ui.metierActif") : Trad801_1.default.trad("$ui.choisir");
                    var boutonChoisir = new I_Bouton_1.I_Bouton(Trad801_1.default.trad(texteChoisir), function (EVT) {
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeChangementMetier(true, METIER.identifiant));
                    });
                    boutonChoisir.style.transform = "translate(0, -75%)";
                    if (METIER == _this.metierPrincipal) {
                        boutonChoisir.desactiver();
                    }
                    COLONNE.ajouterElement(boutonChoisir);
                    boutonChoisir.style.width = "150px";
                    boutonChoisir.style.alignSelf = "center";
                });
            }
            return conteneur;
        };
        InterfaceMetierADV.prototype.remplirVignetteCompetence = function (CONTENEUR, METIER, COMPETENCE) {
            var iconeCompetence = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("comp/" + COMPETENCE + ".png"));
            iconeCompetence.style.objectFit = "none";
            iconeCompetence.style.position = "relative";
            CONTENEUR.ajouterElement(iconeCompetence);
            var conteneurDescription = new I_Conteneur_1.I_Conteneur("ligne");
            conteneurDescription.afficherFondUni("#000000" + "4C", "0.5em");
            var texteDescription = new I_Texte_1.I_Texte(Trad801_1.default.trad("$comp.desc." + COMPETENCE));
            texteDescription.multiligne();
            texteDescription.activerSouris(true);
            texteDescription.style.overflow = "hidden auto";
            texteDescription.style.width = "100%";
            texteDescription.style.marginRight = "30px";
            conteneurDescription.ajouterElement(texteDescription);
            conteneurDescription.defLargeur("220px");
            conteneurDescription.defHauteur("140px");
            conteneurDescription.style.marginTop = "-40px";
            conteneurDescription.style.paddingTop = "40px";
            conteneurDescription.style.paddingBottom = "1em";
            CONTENEUR.ajouterElement(conteneurDescription);
            var texteChoisir = COMPETENCE == this.competenceSecondaire ? Trad801_1.default.trad("$ui.competenceActive") : Trad801_1.default.trad("$ui.choisir");
            var boutonChoisir = new I_Bouton_1.I_Bouton(Trad801_1.default.trad(texteChoisir), function (EVT) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeChangementMetier(false, METIER.identifiant, COMPETENCE));
            });
            boutonChoisir.style.transform = "translate(0, -75%)";
            if (COMPETENCE == this.competenceSecondaire) {
                boutonChoisir.desactiver();
            }
            CONTENEUR.ajouterElement(boutonChoisir);
            boutonChoisir.style.width = "150px";
            boutonChoisir.style.alignSelf = "center";
        };
        InterfaceMetierADV.prototype.creerVignetteMetier = function (METIER, SECONDAIRE, AFFICHER_SKILLS) {
            var _this = this;
            var conteneur = new I_Conteneur_1.I_Conteneur("colonne");
            conteneur.defHauteur(280);
            conteneur.defLargeur(240);
            if ((!SECONDAIRE || this.metierSecondaireDebloque) && METIER) {
                conteneur.nouvelleLigne(function (LIGNE) {
                    LIGNE.afficherFondUni("#000000" + "4C", "0.5em");
                    LIGNE.style.marginLeft = "20px";
                    var iconeMetier = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/metiers/icone-metier-" + METIER.identifiant + ".png"));
                    LIGNE.ajouterElement(iconeMetier);
                    iconeMetier.style.marginTop = "-15px";
                    iconeMetier.style.marginBottom = "-15px";
                    iconeMetier.style.marginLeft = "-30px";
                    var texteMetier = new I_Texte_1.I_Texte(Trad801_1.default.trad("$metier.nom." + METIER.identifiant));
                    texteMetier.defCouleur(Couleur_1.Couleur._ORANGE);
                    texteMetier.style.alignSelf = "center";
                    texteMetier.defTaille("1.2em");
                    LIGNE.ajouterElement(texteMetier);
                });
                var imagePreview = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/metiers/preview-metier-" + METIER.identifiant + ".png"));
                conteneur.ajouterElement(imagePreview);
                imagePreview.defLargeur("auto");
                imagePreview.defHauteur("auto");
                imagePreview.style.marginTop = "-9px";
                imagePreview.style.zIndex = "-1";
                imagePreview.style.objectFit = "none";
                if (AFFICHER_SKILLS) {
                    conteneur.nouvelleLigne(function (LIGNE) {
                        LIGNE.style.justifyContent = "center";
                        if (!SECONDAIRE || METIER.competences[0] == _this.competenceSecondaire) {
                            var iconeCompetence1 = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("comp/" + METIER.competences[0] + ".png"));
                            LIGNE.ajouterElement(iconeCompetence1);
                            iconeCompetence1.style.marginRight = "20px";
                        }
                        if (!SECONDAIRE || (METIER.competences[1] == _this.competenceSecondaire && METIER.competences[0] != METIER.competences[1])) {
                            var iconeCompetence2 = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("comp/" + METIER.competences[1] + ".png"));
                            LIGNE.ajouterElement(iconeCompetence2);
                        }
                        LIGNE.style.marginTop = "-40px";
                    });
                }
            }
            else {
                conteneur.defHauteur("230px");
                conteneur.afficherFondUni("#000000" + "4C", "0.5em");
                conteneur.style.marginLeft = "20px";
                var texte = this.metierSecondaireDebloque ? Trad801_1.default.trad("$ui.aucun") : Trad801_1.default.trad("$ui.nonDisponible");
                var texteMetier = new I_Texte_1.I_Texte(texte);
                texteMetier.style.paddingTop = "2px";
                texteMetier.defLargeur("100%");
                texteMetier.defAlignement("center");
                texteMetier.defTaille("1.2em");
                conteneur.ajouterElement(texteMetier);
                if (!this.metierSecondaireDebloque) {
                    var iconeCadenas = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/metiers/cadenas.png"));
                    conteneur.ajouterElement(iconeCadenas);
                    iconeCadenas.flexAlignement("center");
                    iconeCadenas.style.marginTop = "45px";
                }
            }
            return conteneur;
        };
        InterfaceMetierADV.fermer = function () {
            if (this.instance && this.instance.elementHTML) {
                this.instance.elementHTML.remove();
            }
        };
        InterfaceMetierADV.MODE_CHOIX = 0;
        InterfaceMetierADV.MODE_PRINCIPAL = 1;
        InterfaceMetierADV.MODE_SECONDAIRE = 2;
        return InterfaceMetierADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceMetierADV;
});
//# sourceMappingURL=InterfaceMetierADV.js.map