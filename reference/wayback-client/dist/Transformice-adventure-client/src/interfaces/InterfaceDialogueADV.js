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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../_monde/MondeADV", "../../../Souritheque-client/src/outils/affichage/animation/AnimMath", "../../../Souritheque-client/src/interface/souruis/elements/I_ImagePixi", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV"], function (require, exports, I_Conteneur_1, I_Texte_1, MondeADV_1, AnimMath_1, I_ImagePixi_1, I_Image_1, TFMAdventure_1, ProtoADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceDialogueADV = (function (_super) {
        __extends(InterfaceDialogueADV, _super);
        function InterfaceDialogueADV() {
            var _this = _super.call(this) || this;
            _this.finAffichage = false;
            _this.visible = false;
            _this.fermetureEnCours = false;
            _this.retourFin = false;
            _this.boucle = _this.boucle.bind(_this);
            _this.clique = _this.clique.bind(_this);
            _this.defLargeur(600);
            _this.elementHTML.style.position = "absolute";
            _this.style.bottom = "100px";
            _this.style.left = "50%";
            _this.elementHTML.style.transform = "translate(-50%,-50%)";
            _this.style.margin = "0.3em";
            _this.style.borderImage = "url(\"" + I_Image_1.I_Image.BASE_IMAGE + "tfmadv/interface/dialogue/par9dialoguePNJ.png\") 70 / 100 / 0 repeat";
            _this.style.background = "url(\"ressources/bois2.png\") repeat";
            _this.style.borderStyle = "solid";
            _this.style.borderWidth = "1px";
            _this.style.borderRadius = "40px";
            _this.style.filter = "drop-shadow(2px 2px 4px rgba(0, 0, 0, 1))";
            _this.champTexte = _this.creerChampTexte();
            _this.champTexte.style.margin = "20px";
            _this.champTexte.style.marginLeft = "150px";
            _this.champTexte.defHauteur(InterfaceDialogueADV.HAUTEUR_TEXTE);
            _this.ajouterElement(_this.champTexte);
            var conteneurPortrait = new I_Conteneur_1.I_Conteneur();
            conteneurPortrait.defLargeur("100%");
            conteneurPortrait.style.alignSelf = "flex-end";
            conteneurPortrait.defHauteur(0);
            _this.remplirConteneurPortrait(conteneurPortrait);
            _this.ajouterElement(conteneurPortrait);
            _this.rendreCliquable(_this.clique);
            return _this;
        }
        InterfaceDialogueADV.prototype.remplirConteneurPortrait = function (CONTENEUR) {
            var conteneurNom = new I_Conteneur_1.I_Conteneur("ligne");
            conteneurNom.style.position = "relative";
            conteneurNom.style.left = "-50px";
            conteneurNom.style.top = "-35px";
            this.portrait = new I_ImagePixi_1.I_ImagePixi(InterfaceDialogueADV.LARGEUR_PORTRAIT, InterfaceDialogueADV.HAUTEUR_PORTRAIT);
            this.portrait.style.cssFloat = "left";
            this.portrait.style.position = "absolute";
            this.portrait.style.top = "-150px";
            this.portrait.style.left = "30px";
            this.portrait.style.zIndex = "-1";
            this.portrait.style.filter = "drop-shadow(2px 2px 4px rgba(0, 0, 0, 1))";
            conteneurNom.ajouterElement(this.portrait);
            var gauche = new I_Conteneur_1.I_Conteneur();
            gauche.style.background = "url(\"" + I_Image_1.I_Image.BASE_IMAGE + "tfmadv/interface/dialogue/noms_left.png\")";
            gauche.defLargeur(40);
            gauche.defHauteur(71);
            gauche.style.margin = "0px";
            conteneurNom.ajouterElement(gauche);
            var milieu = new I_Conteneur_1.I_Conteneur();
            milieu.style.background = "url(\"" + I_Image_1.I_Image.BASE_IMAGE + "tfmadv/interface/dialogue/noms_mid.png\")";
            milieu.defHauteur(71);
            milieu.style.margin = "0px";
            milieu.style.paddingLeft = "20px";
            milieu.style.paddingRight = "20px";
            milieu.style.justifyContent = "center";
            this.champNom = new I_Texte_1.I_Texte();
            this.champNom.style.fontFamily = "police-nom,Verdana";
            this.champNom.style.fontSize = "26px";
            this.champNom.style.lineHeight = "1";
            milieu.ajouterElement(this.champNom);
            conteneurNom.ajouterElement(milieu);
            var droite = new I_Conteneur_1.I_Conteneur();
            droite.style.background = "url(\"" + I_Image_1.I_Image.BASE_IMAGE + "tfmadv/interface/dialogue/noms_right.png\")";
            droite.defLargeur(40);
            droite.defHauteur(71);
            droite.style.margin = "0px";
            conteneurNom.ajouterElement(droite);
            CONTENEUR.ajouterElement(conteneurNom);
        };
        InterfaceDialogueADV.afficher = function (IDENTIFIANT, MOBILE, NOM, CLIP, TEXTE, RETOUR_FIN) {
            if (!InterfaceDialogueADV.instance) {
                InterfaceDialogueADV.instance = new InterfaceDialogueADV();
            }
            InterfaceDialogueADV.instance.initialisation(IDENTIFIANT, MOBILE, NOM, CLIP, TEXTE, RETOUR_FIN);
            TFMAdventure_1.default.ajouterInterface(InterfaceDialogueADV.instance.elementHTML);
            this.instance.pageSuivante();
        };
        InterfaceDialogueADV.prototype.initialisation = function (IDENTIFIANT, MOBILE, NOM, CLIP, TEXTE, RETOUR_FIN) {
            var _this = this;
            if (this.identifiantUnique && this.retourFin) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.finDialogue(this.identifiantUnique));
            }
            this.identifiantUnique = IDENTIFIANT;
            this.retourFin = RETOUR_FIN;
            var copieClip = CLIP;
            var rect = copieClip.getBounds();
            copieClip.x = ((InterfaceDialogueADV.LARGEUR_PORTRAIT - rect.width) / 2) - rect.x - 10;
            copieClip.y = ((InterfaceDialogueADV.HAUTEUR_PORTRAIT - rect.height) / 2) - rect.y + 10;
            this.portrait.creerAppPixi();
            this.portrait.scene.removeChildren();
            this.portrait.scene.addChild(copieClip);
            this.fermetureEnCours = false;
            this.texteRestant = TEXTE;
            this.texteEnCours = "";
            this.chaineNom = "";
            this.finAffichage = false;
            this.champNom.defTexteHTML(NOM);
            this.champTexte.defTexteHTML("");
            this.mobile = MOBILE;
            this.dateDebutEcriture = 0;
            this.visible = true;
            if (this.animEnCours) {
                this.animEnCours.estTerminee = true;
            }
            this.animEnCours = AnimMath_1.default.animBoucle(600, function (PROGRESSION) {
                _this.style.bottom = (100 - (20 * (1 - PROGRESSION))) + "px";
            }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
            this.style.opacity = "1";
            MondeADV_1.MondeADV.instance.ajouterBoucle("InterfaceDialogueADV", this.boucle);
        };
        InterfaceDialogueADV.prototype.pageSuivante = function (CALLBACK) {
            var _this = this;
            if (!this.decouperDialogue(this.texteRestant, function (DECOUPAGE) {
                _this.texteEnCours = DECOUPAGE[0];
                _this.texteRestant = DECOUPAGE[1];
                _this.champTexte.defTexteHTML("");
                _this.dateDebutEcriture = Date.now();
                _this.finAffichage = false;
                _this.majTexte();
                if (CALLBACK != null) {
                    CALLBACK();
                }
            })) {
                this.animDepart();
            }
        };
        InterfaceDialogueADV.prototype.fermer = function () {
            this.fermetureEnCours = false;
            this.elementHTML.remove();
            this.visible = false;
            MondeADV_1.MondeADV.instance.supprimerBoucle("InterfaceDialogueADV");
        };
        InterfaceDialogueADV.prototype.clique = function (EVT) {
            if (this.finAffichage) {
                this.pageSuivante();
            }
            else {
                this.champTexte.defTexteHTML(this.texteEnCours.replace(new RegExp("\n", 'g'), "<br>"));
                this.finAffichage = true;
            }
        };
        InterfaceDialogueADV.prototype.animDepart = function () {
            var _this = this;
            if (!this.fermetureEnCours) {
                if (this.retourFin) {
                    this.retourFin = false;
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.finDialogue(this.identifiantUnique));
                }
                MondeADV_1.MondeADV.instance.supprimerBoucle("InterfaceDialogueADV");
                this.fermetureEnCours = true;
                if (this.animEnCours) {
                    this.animEnCours.estTerminee = true;
                }
                this.animEnCours = AnimMath_1.default.animBoucle(600, function (PROGRESSION) {
                    _this.style.opacity = String(1 - PROGRESSION);
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto().defFonctionFin(function () {
                    _this.fermer();
                });
            }
        };
        InterfaceDialogueADV.prototype.boucle = function () {
            if (this.mobile.distanceCarreJoueurPrincipal > InterfaceDialogueADV.DISTANCE_AFFICHAGE * InterfaceDialogueADV.DISTANCE_AFFICHAGE) {
                this.animDepart();
                return;
            }
            if (!this.finAffichage && this.texteEnCours) {
                this.majTexte();
            }
        };
        InterfaceDialogueADV.prototype.majTexte = function () {
            var dureeEcriture = this.texteEnCours.length / InterfaceDialogueADV.LETTRES_PAR_SECONDES * 1000;
            if (this.dateDebutEcriture != 0 && Date.now() < this.dateDebutEcriture + dureeEcriture) {
                var ratioEcriture = (Date.now() - this.dateDebutEcriture) / dureeEcriture;
                var texteVisible = this.texteEnCours.substr(0, this.texteEnCours.length * ratioEcriture).replace(new RegExp("\n", 'g'), "<br>");
                var texteRestant = this.texteEnCours.substr(this.texteEnCours.length * ratioEcriture).replace(new RegExp("\n", 'g'), "<br>");
                this.champTexte.defTexteHTML(texteVisible + "<span style=\"opacity: 0; font-size: inherit;\">" + texteRestant + "</span>");
            }
            else {
                this.champTexte.defTexteHTML(this.texteEnCours.replace(new RegExp("\n", 'g'), "<br>"));
                this.finAffichage = true;
            }
        };
        InterfaceDialogueADV.prototype.decouperDialogue = function (TEXTE, CALLBACK) {
            var _this = this;
            if (TEXTE.length == 0) {
                return false;
            }
            var ret = [TEXTE, ""];
            var idx = TEXTE.indexOf("_P_");
            if (idx != -1) {
                ret[0] = TEXTE.substr(0, idx).trim();
                ret[1] = TEXTE.substr(idx + 3).trim();
            }
            var hauteurMax = InterfaceDialogueADV.HAUTEUR_TEXTE;
            var callbackDecoupageLignes;
            callbackDecoupageLignes = function (HAUTEUR) {
                if (HAUTEUR > hauteurMax) {
                    var idx_1 = ret[0].lastIndexOf("\n");
                    if (idx_1 == -1) {
                        idx_1 = ret[0].lastIndexOf(" ");
                    }
                    if (idx_1 != -1) {
                        ret[1] = ret[0].substr(idx_1) + ret[1];
                        ret[0] = ret[0].substr(0, idx_1).trim();
                        _this.calculNombreLignes(ret[0], callbackDecoupageLignes);
                        return;
                    }
                }
                CALLBACK(ret);
            };
            this.calculNombreLignes(ret[0], callbackDecoupageLignes);
            return true;
        };
        InterfaceDialogueADV.prototype.calculNombreLignes = function (TEXTE, CALLBACK) {
            var champTexte = this.creerChampTexte();
            champTexte.style.visibility = "hidden";
            champTexte.defTexteHTML(TEXTE.replace(new RegExp("\n", 'g'), "<br>"));
            champTexte.defLargeur(this.champTexte.elementHTML.getBoundingClientRect().width);
            champTexte.elementHTML.style.position = "absolute";
            TFMAdventure_1.default.ajouterInterface(champTexte.elementHTML);
            setTimeout(function (EV) {
                var hauteur = champTexte.elementHTML.getBoundingClientRect().height;
                return CALLBACK(hauteur);
            }, 10);
        };
        InterfaceDialogueADV.prototype.creerChampTexte = function () {
            var champTexte = new I_Texte_1.I_Texte();
            champTexte.style.fontSize = InterfaceDialogueADV.TAILLE_TEXTE;
            champTexte.multiligne();
            champTexte.style.lineHeight = InterfaceDialogueADV.HAUTEUR_ESPACEMENT;
            champTexte.style.lineHeight = "120%";
            return champTexte;
        };
        InterfaceDialogueADV.LETTRES_PAR_SECONDES = 70;
        InterfaceDialogueADV.DISTANCE_AFFICHAGE = 300;
        InterfaceDialogueADV.TAILLE_TEXTE = "20px";
        InterfaceDialogueADV.HAUTEUR_ESPACEMENT = "1";
        InterfaceDialogueADV.LARGEUR_PORTRAIT = 200;
        InterfaceDialogueADV.HAUTEUR_PORTRAIT = 200;
        InterfaceDialogueADV.DECALAGE_Y_PORTRAIT = 0;
        InterfaceDialogueADV.HAUTEUR_TEXTE = 110;
        return InterfaceDialogueADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceDialogueADV = InterfaceDialogueADV;
});
//# sourceMappingURL=InterfaceDialogueADV.js.map