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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "../../../Souritheque-client/src/interface/souruis/elements/I_ImagePixi", "../../../Souritheque-client/src/outils/affichage/animation/Look", "../gameplay/armes/OutilsArmeADV", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/outils/Module801", "../_tfmAdventure/ProtoADV", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../_enums/SlotEquipementADV", "./types/EquipementADV", "../_tfmAdventure/ConfigADV", "../../../Souritheque-client/src/interface/souruis/elements/I_Tooltip", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/interface/souruis/elements/I_BoutonChoixMultiples", "../../../Souritheque-client/src/interface/Couleur", "../../../Souritheque-client/src/interface/souruis/elements/I_BoutonEtat"], function (require, exports, I_Conteneur_1, ClipAnim_1, I_ImagePixi_1, Look_1, OutilsArmeADV_1, I_Bouton_1, Module801_1, ProtoADV_1, Trad801_1, I_Texte_1, I_Image_1, SlotEquipementADV_1, EquipementADV_1, ConfigADV_1, I_Tooltip_1, TFMAdventure_1, I_BoutonChoixMultiples_1, Couleur_1, I_BoutonEtat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceJoueurADV = (function (_super) {
        __extends(InterfaceJoueurADV, _super);
        function InterfaceJoueurADV() {
            var _this = _super.call(this, "colonne") || this;
            _this.largeurImage = 250;
            _this.hauteurImage = 310;
            _this.listeEquipementGauche = [SlotEquipementADV_1.default.TETE, SlotEquipementADV_1.default.COU, SlotEquipementADV_1.default.CORPS, SlotEquipementADV_1.default.GANT, SlotEquipementADV_1.default.FOURRURE];
            _this.listeEquipementDroite = [SlotEquipementADV_1.default.COIFFURE, SlotEquipementADV_1.default.LUNETTE, SlotEquipementADV_1.default.BOUCHE, SlotEquipementADV_1.default.OREILLE, SlotEquipementADV_1.default.QUEUE];
            _this.modeFenetre(Trad801_1.default.trad("$texte.profil"), _this.retirer.bind(_this));
            _this.centrerAuto(0.5, 0.4);
            _this.afficherFondCadre()
                .defLargeur(800)
                .defLargeurMax("90%")
                .defHauteurMax("calc(90vh - 30px)");
            _this.conteneurPrincipal = new I_Conteneur_1.I_Conteneur("ligne").justifierEnfants("space-around");
            _this.conteneurGauche = new I_Conteneur_1.I_Conteneur("colonne");
            _this.conteneurEquipementsMains = new I_Conteneur_1.I_Conteneur("colonne").multiligne();
            _this.imagePixi = new I_ImagePixi_1.I_ImagePixi(_this.largeurImage, _this.hauteurImage);
            _this.imagePixi.style.position = "relative";
            _this.imagePixi.activerSouris(true);
            _this.imagePixi.defCSS({
                borderRadius: "10px",
                backgroundColor: "#000000" + "50",
                width: _this.largeurImage + "px",
                position: "relative"
            });
            _this.imagePixi.appPixi.view.style.display = "block";
            _this.imagePixi.ajouterBoucle(function () {
                if (_this.imagePixi.scene.children.length) {
                    for (var _i = 0, _a = _this.imagePixi.scene.children; _i < _a.length; _i++) {
                        var clip = _a[_i];
                        if (clip instanceof ClipAnim_1.ClipAnim) {
                            clip.boucle(Date.now());
                        }
                    }
                }
            });
            var partieHaute = _this.conteneurGauche.nouvelleLigne();
            _this.conteneurEquipementGauche = partieHaute.nouvelleColonne();
            _this.conteneurEquipementGauche.espacement(1);
            var colonneCentrale = partieHaute.nouvelleColonne();
            _this.conteneurEquipementDroite = partieHaute.nouvelleColonne();
            _this.conteneurEquipementDroite.espacement(1);
            colonneCentrale.ajouterElement(_this.imagePixi);
            var partieBasse = _this.conteneurGauche.nouvelleLigne().justifierEnfants("center");
            _this.conteneurEquipementsMains = partieBasse.nouvelleLigne();
            _this.conteneurEquipementsMains.espacement(1);
            _this.btnTalents = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$talents"), function () {
                if (_this.modificationPossible) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.interfaceTalent());
                }
            });
            _this.btnTalents.ajouterIcone(new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/talents.png"), ""));
            partieBasse.ajouterElement(_this.btnTalents);
            _this.btnTalents.style.padding = "0px";
            _this.btnTalents.style.paddingLeft = "0.3em";
            _this.btnTalents.style.paddingRight = "0.5em";
            _this.btnMaquillage = new I_BoutonEtat_1.I_BoutonEtat("", function (ACTIF) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.majMaquillage(ACTIF));
            });
            _this.btnMaquillage.style.position = "absolute";
            _this.btnMaquillage.style.left = "0.5em";
            _this.btnMaquillage.style.bottom = "0.5em";
            _this.imagePixi.appendChild(_this.btnMaquillage);
            _this.iconeMetierPrincipal = new I_Image_1.I_Image().defCSS({
                position: "absolute",
                left: "-9px",
                top: "-7px"
            });
            _this.iconeMetierSecondaire = new I_Image_1.I_Image().defCSS({
                position: "absolute",
                left: "31px",
                top: "-15px",
                transform: "scale(0.75)"
            });
            var conteneurInfos = new I_Conteneur_1.I_Conteneur("colonne").defLargeur("20em").afficherFondUni("#00000050")
                .defLargeur("100%").defLargeurMin("10em").defCSS("flexGrow", "1");
            _this.champPseudo = new I_Texte_1.I_Texte().defTaille("1.5em").defCouleur("#F79337");
            _this.champPseudo.style.fontFamily = "police-nom,Verdana";
            _this.champHashTag = new I_Texte_1.I_Texte().defTaille("0.8em").defCouleur("#7a6644");
            var conteneurNom = conteneurInfos.nouvelleLigne().defHauteur("3.5em");
            conteneurNom.alignementEnfants("baseline");
            conteneurNom.ajouterElement(_this.champPseudo, _this.champHashTag);
            _this.champInscriptions = new I_Texte_1.I_Texte().defCouleur("#7BBD40");
            var sousConteneurInfos = conteneurInfos.nouvelleColonne().justifierEnfants("space-between").defCSS("flexGrow", "1");
            var conteneurDetails = sousConteneurInfos.nouvelleColonne();
            conteneurDetails.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$texte.dateInscription") + ": "));
                LIGNE.ajouterElement(_this.champInscriptions);
            });
            _this.conteneurChampGenre = new I_Texte_1.I_Texte(Trad801_1.default.trad("$texte.genre") + ": ");
            _this.champGenre = new I_Texte_1.I_Texte();
            _this.conteneurChampGenre.appendChild(_this.champGenre);
            conteneurDetails.appendChild(_this.conteneurChampGenre);
            _this.conteneurChampTribu = new I_Texte_1.I_Texte(Trad801_1.default.trad("$texte.tribu") + ": ");
            _this.champTribu = new I_Texte_1.I_Texte().defCouleur("#BABD2F");
            _this.conteneurChampTribu.appendChild(_this.champTribu);
            conteneurDetails.appendChild(_this.conteneurChampTribu);
            _this.champNiveau = new I_Texte_1.I_Texte().defCouleur("#7BBD40");
            _this.champNbFamiliers = new I_Texte_1.I_Texte().defCouleur("#7BBD40");
            conteneurDetails.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$profil.niveau")));
                LIGNE.ajouterElement(_this.champNiveau);
            });
            conteneurDetails.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$profil.familiers")));
                LIGNE.ajouterElement(_this.champNbFamiliers);
            });
            _this.conteneurTitreEnCours = new I_Conteneur_1.I_Conteneur("ligne").defLargeur("100%").alignementEnfants("baseline");
            _this.champTitreEnCours = new I_Texte_1.I_Texte().defCouleur(Couleur_1.Couleur.BLEU).etirer();
            _this.selecteurTitreEnCours = new I_BoutonChoixMultiples_1.default().defChangement(function (CODE_TITRE) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.changerTitre(CODE_TITRE));
            }).etirer();
            _this.conteneurTitreEnCours.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$profil.titreEnCours")).defCSS({
                margin: "0.2em 0.2em 0.2em 0",
                lineHeight: "1.5em"
            }), _this.champTitreEnCours, _this.selecteurTitreEnCours);
            _this.conteneurTitreEnCours.defCSS("margin", "");
            sousConteneurInfos.ajouterElement(_this.conteneurTitreEnCours);
            _this.conteneurPrincipal.ajouterElement(_this.conteneurGauche, conteneurInfos);
            _this.ajouterElement(_this.conteneurPrincipal);
            return _this;
        }
        InterfaceJoueurADV.afficher = function (MSG) {
            if (!InterfaceJoueurADV.instance) {
                InterfaceJoueurADV.instance = new InterfaceJoueurADV();
            }
            InterfaceJoueurADV.instance.initialisation(MSG);
            TFMAdventure_1.default.ajouterInterface(InterfaceJoueurADV.instance.elementHTML);
        };
        InterfaceJoueurADV.afficherEquipements = function (SLOT, EQUIPEMENTS, EQUIPEMENTS_NON_EQUIPABLES, EQUIPEMENT_EN_COURS) {
            if (!this.instance) {
                return;
            }
            this.instance.afficherEquipementsSlot(SLOT, EQUIPEMENTS, EQUIPEMENTS_NON_EQUIPABLES, EQUIPEMENT_EN_COURS);
        };
        InterfaceJoueurADV.changementTitre = function (CODE_TITRE) {
            if (this.instance && this.instance.elementHTML.parentNode) {
                this.instance.changerTitre(CODE_TITRE);
            }
        };
        InterfaceJoueurADV.estAffiche = function () {
            return Boolean(InterfaceJoueurADV.instance && InterfaceJoueurADV.instance.elementHTML.parentNode);
        };
        InterfaceJoueurADV.fermer = function () {
            if (InterfaceJoueurADV.instance) {
                InterfaceJoueurADV.instance.retirer();
            }
        };
        InterfaceJoueurADV.prototype.initialisation = function (MSG) {
            this.imagePixi.creerAppPixi();
            this.conteneurEquipementsMains.vider();
            this.conteneurEquipementGauche.vider();
            this.conteneurEquipementDroite.vider();
            this.modificationPossible = MSG.lBool();
            var nomJoueur = MSG.lChaine();
            var maquillage = MSG.lBool();
            this.defTitreFenetre(Trad801_1.default.trad("$texte.profil"));
            this.btnTalents.desactiver(!this.modificationPossible);
            this.btnMaquillage.style.visibility = this.modificationPossible ? "visible" : "hidden";
            this.btnMaquillage.cocher(maquillage);
            var clipJoueur = new ClipAnim_1.ClipAnim(MSG);
            clipJoueur.defLook(new Look_1.Look(MSG));
            clipJoueur.jouerAnimation("statique");
            var armeDroite = OutilsArmeADV_1.OutilsArmeADV.recupArme(MSG, null);
            var armeGauche = OutilsArmeADV_1.OutilsArmeADV.recupArme(MSG, null);
            if (armeDroite && armeDroite.apparence) {
                clipJoueur.ajouterElementLook(armeDroite.apparence);
            }
            if (armeGauche && armeGauche.apparence) {
                clipJoueur.ajouterElementLook(armeGauche.apparence);
            }
            this.imagePixi.scene.addChildAt(clipJoueur, 0);
            clipJoueur.position.set(this.largeurImage / 2, this.hauteurImage - 50);
            this.equipementsEnCours = {};
            var nbEquipementsEnCours = MSG.l8();
            for (var i = 0; i < nbEquipementsEnCours; i++) {
                var codeSlot = MSG.l8();
                this.equipementsEnCours[codeSlot] = EquipementADV_1.default.deserialiser(MSG);
            }
            this.peutChangerEquipements = MSG.lBool();
            var aUnFamilier = MSG.lBool();
            if (aUnFamilier) {
                var clipFamilier = new ClipAnim_1.ClipAnim(MSG);
                clipFamilier.scale.set(1, 1);
                clipFamilier.jouerAnimation("statique");
                this.imagePixi.scene.addChild(clipFamilier);
                clipFamilier.position.set(1.75 * this.largeurImage / 5, this.hauteurImage - 40);
                clipJoueur.position.set(2.75 * this.largeurImage / 5, this.hauteurImage - 50);
            }
            var codeFond = MSG.l16();
            this.imagePixi.style.background = "url(" + TFMAdventure_1.default.recupImageDistance("interface/profil/f" + codeFond + ".png") + ") no-repeat";
            this.afficherListeEquipement(this.conteneurEquipementGauche, this.listeEquipementGauche);
            this.afficherListeEquipement(this.conteneurEquipementDroite, this.listeEquipementDroite);
            var boutonArmeGauche;
            if (this.equipementsEnCours[SlotEquipementADV_1.default.MAIN_GAUCHE]) {
                boutonArmeGauche = this.equipementsEnCours[SlotEquipementADV_1.default.MAIN_GAUCHE].recupSpriteHTML(SlotEquipementADV_1.default.MAIN_GAUCHE);
            }
            else {
                boutonArmeGauche = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/icones/equipement" + SlotEquipementADV_1.default.MAIN_GAUCHE + ".png")).defLargeur(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT).defHauteur(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT);
            }
            var boutonArmeDroite;
            if (this.equipementsEnCours[SlotEquipementADV_1.default.MAIN_DROITE]) {
                boutonArmeDroite = this.equipementsEnCours[SlotEquipementADV_1.default.MAIN_DROITE].recupSpriteHTML(SlotEquipementADV_1.default.MAIN_DROITE);
            }
            else {
                boutonArmeDroite = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/icones/equipement" + SlotEquipementADV_1.default.MAIN_DROITE + ".png")).defLargeur(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT).defHauteur(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT);
            }
            this.conteneurEquipementsMains.ajouterElement(boutonArmeDroite, boutonArmeGauche);
            if (this.modificationPossible && this.peutChangerEquipements) {
                boutonArmeGauche.rendreCliquable(function () {
                    Module801_1.default.instance.envoyer(ProtoADV_1.default.demandeAffichageEquipements(SlotEquipementADV_1.default.MAIN_GAUCHE));
                });
                boutonArmeDroite.rendreCliquable(function () {
                    Module801_1.default.instance.envoyer(ProtoADV_1.default.demandeAffichageEquipements(SlotEquipementADV_1.default.MAIN_DROITE));
                });
            }
            var codeMetierPrincipal = MSG.l16();
            var codeMetierSecondaire = MSG.l16();
            this.iconeMetierPrincipal.elementHTML.remove();
            this.iconeMetierSecondaire.elementHTML.remove();
            if (codeMetierPrincipal) {
                this.iconeMetierPrincipal.chargerImage(TFMAdventure_1.default.recupImageDistance("interface/metiers/icone-metier-" + codeMetierPrincipal + ".png"));
                this.imagePixi.appendChild(this.iconeMetierPrincipal);
            }
            if (codeMetierSecondaire) {
                this.iconeMetierSecondaire.chargerImage(TFMAdventure_1.default.recupImageDistance("interface/metiers/icone-metier-" + codeMetierSecondaire + ".png"));
                this.imagePixi.appendChild(this.iconeMetierSecondaire);
            }
            this.champPseudo.defTexte(TFMAdventure_1.default.nomSansTag(nomJoueur));
            if (nomJoueur.indexOf("#") != -1) {
                this.champHashTag.defTexte("#" + TFMAdventure_1.default.nomUniquementTag(nomJoueur));
            }
            else {
                this.champHashTag.defTexte("");
            }
            var dateInscription = new Date(MSG.l32s() * 1000);
            this.champInscriptions.defTexte(dateInscription.toLocaleDateString("fr", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }));
            var codeGenre = MSG.l8();
            if (codeGenre == 1) {
                this.champGenre.defTexte(Trad801_1.default.trad("$texte.fille")).defCouleur("#FEB1FC").defCSS("display", "inline");
            }
            else if (codeGenre == 2) {
                this.champGenre.defTexte(Trad801_1.default.trad("$texte.garcon")).defCouleur("#98E2EB").defCSS("display", "inline");
            }
            else {
                this.champGenre.defTexte("");
                this.conteneurChampGenre.defCSS("display", "none");
            }
            var nomTribu = MSG.lChaine();
            this.champTribu.defTexte(nomTribu);
            this.conteneurChampTribu.defCSS("display", nomTribu.length == 0 ? "none" : "inline");
            this.champNiveau.defTexte(MSG.l16());
            this.champNbFamiliers.defTexte(MSG.l8());
            var codeTitreEnCours = MSG.l16();
            this.selecteurTitreEnCours.vider();
            if (this.modificationPossible) {
                this.selecteurTitreEnCours.ajouterOption(Trad801_1.default.trad("$titre.0"), 0);
            }
            var nbTitres = MSG.l16();
            for (var i = 0; i < nbTitres; i++) {
                var codeTitre = MSG.l16();
                if (this.modificationPossible) {
                    this.selecteurTitreEnCours.ajouterOption(Trad801_1.default.trad("$titre." + codeTitre), codeTitre);
                }
            }
            if (this.modificationPossible) {
                this.selecteurTitreEnCours.selectionnerParValeur(codeTitreEnCours);
                this.champTitreEnCours.elementHTML.remove();
                this.conteneurTitreEnCours.appendChild(this.selecteurTitreEnCours);
            }
            else {
                this.champTitreEnCours.defTexte(Trad801_1.default.trad("$titre." + codeTitreEnCours));
                this.selecteurTitreEnCours.elementHTML.remove();
                this.conteneurTitreEnCours.appendChild(this.champTitreEnCours);
            }
        };
        InterfaceJoueurADV.prototype.afficherListeEquipement = function (CONTENEUR, LISTE) {
            var _loop_1 = function (slot) {
                var nomSlot = SlotEquipementADV_1.default[slot];
                var boutonEquipement = void 0;
                if (this_1.equipementsEnCours[slot] != null) {
                    boutonEquipement = this_1.equipementsEnCours[slot].recupSpriteHTML(slot);
                }
                else {
                    boutonEquipement = new I_Conteneur_1.I_Conteneur();
                    boutonEquipement.ajouterElementCentre(new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/icones/equipement" + slot + ".png")).defLargeur(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT).defHauteur(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT));
                }
                CONTENEUR.ajouterElement(boutonEquipement);
                if (this_1.modificationPossible && this_1.peutChangerEquipements) {
                    boutonEquipement.rendreCliquable(function () {
                        Module801_1.default.instance.envoyer(ProtoADV_1.default.demandeAffichageEquipements(slot));
                    });
                }
            };
            var this_1 = this;
            for (var _i = 0, LISTE_1 = LISTE; _i < LISTE_1.length; _i++) {
                var slot = LISTE_1[_i];
                _loop_1(slot);
            }
        };
        InterfaceJoueurADV.prototype.changerTitre = function (CODE_TITRE) {
            this.selecteurTitreEnCours.selectionnerParValeur(CODE_TITRE, false);
        };
        InterfaceJoueurADV.prototype.afficherEquipementsSlot = function (SLOT, EQUIPEMENTS, EQUIPEMENTS_NON_EQUIPABLES, EQUIPEMENT_EN_COURS) {
            var _this = this;
            if (this.popupSelectionEquipement) {
                this.popupSelectionEquipement.elementHTML.remove();
            }
            var codeEquipementSelectionne = EQUIPEMENT_EN_COURS ? EQUIPEMENT_EN_COURS.code : 0;
            this.indexIconesEquipement = {};
            this.popupSelectionEquipement = new I_Conteneur_1.I_Conteneur("colonne");
            this.popupSelectionEquipement.afficherFondCadre()
                .defLargeurMin("30em")
                .defLargeurMax("80vw")
                .defHauteurMax("calc(80vh - 30px)");
            this.popupSelectionEquipement.centrerAuto(0.5, "calc(50% - 30px)");
            this.popupSelectionEquipement.style.position = "absolute";
            this.popupSelectionEquipement.modeFenetre(Trad801_1.default.trad("$SlotEquipement" + SLOT), function () { return _this.popupSelectionEquipement.elementHTML.remove(); });
            var conteneurBoutons = new I_Conteneur_1.I_Conteneur("ligne").etirerContenu();
            var boutonValider = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.valider"), function () {
                Module801_1.default.instance.envoyer(ProtoADV_1.default.selectionnerEquipement(SLOT, codeEquipementSelectionne));
                _this.popupSelectionEquipement.elementHTML.remove();
            }).desactiver(true);
            var boutonAnnuler = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.annuler"), function () {
                _this.popupSelectionEquipement.elementHTML.remove();
            });
            conteneurBoutons.ajouterElement(boutonValider, boutonAnnuler);
            var conteneurEquipementEnCours = new I_Conteneur_1.I_Conteneur("ligne").justifierEnfants("center");
            this.remplirConteneurEquipementEnCours(conteneurEquipementEnCours, EQUIPEMENT_EN_COURS, SLOT);
            this.popupSelectionEquipement.ajouterElement(conteneurEquipementEnCours);
            var indexEquipements = {};
            var conteneurEquipementsPossedes = new I_Conteneur_1.I_Conteneur("colonne").activerAscenseur(true);
            for (var _i = 0, _a = Object.keys(EQUIPEMENTS).map(function (elm) { return parseInt(elm); }); _i < _a.length; _i++) {
                var typeArme = _a[_i];
                var conteneurTypeArme = new I_Conteneur_1.I_Conteneur("ligne");
                conteneurTypeArme.alignementEnfants("center");
                var iconeSousCategorie = void 0;
                if (typeArme != 0) {
                    iconeSousCategorie = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/icones/arme" + typeArme + ".png"));
                }
                else {
                    iconeSousCategorie = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/icones/equipement" + SLOT + ".png"));
                }
                iconeSousCategorie.defLargeur(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT).defHauteur(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT);
                iconeSousCategorie.defLargeurMin(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT);
                conteneurTypeArme.ajouterElement(iconeSousCategorie);
                var grilleEquipements = new I_Conteneur_1.I_Conteneur().afficherFondUni("#00000050");
                grilleEquipements.defLargeur("100%").defHauteur("100%");
                grilleEquipements.style.overflowY = "auto";
                grilleEquipements.style.display = "grid";
                grilleEquipements.style.justifyItems = "center";
                grilleEquipements.style.alignItems = "center";
                grilleEquipements.style.gridTemplateColumns = "repeat(auto-fill, minmax(80px, 1fr))";
                EQUIPEMENTS[typeArme].sort(function (e1, e2) { return e1.code - e2.code; });
                var _loop_2 = function (equipement) {
                    indexEquipements[equipement.code] = equipement;
                    var icone = equipement.recupSpriteHTML(SLOT);
                    icone.style.borderRadius = "7px";
                    this_2.indexIconesEquipement[equipement.code] = icone;
                    var estEquipementEnCours = equipement.code == codeEquipementSelectionne;
                    if (estEquipementEnCours) {
                        icone.defCSS(InterfaceJoueurADV.STYLE_SELECTIONNE);
                    }
                    else {
                        icone.defCSS(InterfaceJoueurADV.STYLE_NON_SELECTIONNE);
                    }
                    if (EQUIPEMENTS_NON_EQUIPABLES[equipement.code]) {
                        icone.style.cursor = "not-allowed";
                        icone.style.filter = "grayscale(1) brightness(0.5)";
                        I_Tooltip_1.default.afficher(icone, Trad801_1.default.trad("$profil.armeNonEquipable"));
                    }
                    else {
                        icone.rendreCliquable(function () {
                            codeEquipementSelectionne = codeEquipementSelectionne == equipement.code ? 0 : equipement.code;
                            for (var _i = 0, _a = Object.keys(_this.indexIconesEquipement); _i < _a.length; _i++) {
                                var codeEquipement = _a[_i];
                                var icone_1 = _this.indexIconesEquipement[codeEquipement];
                                if (codeEquipementSelectionne == +codeEquipement) {
                                    icone_1.defCSS(InterfaceJoueurADV.STYLE_SELECTIONNE);
                                }
                                else {
                                    icone_1.defCSS(InterfaceJoueurADV.STYLE_NON_SELECTIONNE);
                                }
                            }
                            var codeEquipementInitial = EQUIPEMENT_EN_COURS ? EQUIPEMENT_EN_COURS.code : 0;
                            boutonValider.desactiver(codeEquipementSelectionne == codeEquipementInitial);
                            _this.remplirConteneurEquipementEnCours(conteneurEquipementEnCours, indexEquipements[codeEquipementSelectionne], SLOT);
                        });
                    }
                    grilleEquipements.ajouterElement(icone);
                };
                var this_2 = this;
                for (var _b = 0, _c = EQUIPEMENTS[typeArme]; _b < _c.length; _b++) {
                    var equipement = _c[_b];
                    _loop_2(equipement);
                }
                conteneurTypeArme.ajouterElement(grilleEquipements);
                conteneurEquipementsPossedes.ajouterElement(conteneurTypeArme);
            }
            this.popupSelectionEquipement.ajouterElement(conteneurEquipementsPossedes);
            this.popupSelectionEquipement.ajouterElement(conteneurBoutons);
            this.elementHTML.appendChild(this.popupSelectionEquipement.elementHTML);
        };
        InterfaceJoueurADV.prototype.remplirConteneurEquipementEnCours = function (CONTENEUR_EQUIPEMENT_EN_COURS, EQUIPEMENT_EN_COURS, SLOT) {
            CONTENEUR_EQUIPEMENT_EN_COURS.vider();
            if (EQUIPEMENT_EN_COURS != null) {
                var icone = EQUIPEMENT_EN_COURS.recupSpriteHTML(SLOT);
                CONTENEUR_EQUIPEMENT_EN_COURS.ajouterElement(icone);
                var colonneInfosEquipement = new I_Conteneur_1.I_Conteneur("colonne");
                colonneInfosEquipement.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$equipement." + EQUIPEMENT_EN_COURS.code + ".nom")));
                for (var _i = 0, _a = Object.keys(EQUIPEMENT_EN_COURS.stats); _i < _a.length; _i++) {
                    var cleStat = _a[_i];
                    if (isNaN(cleStat)) {
                        continue;
                    }
                    var codeStat = Number(cleStat);
                    colonneInfosEquipement.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad.apply(null, [].concat("$statequipement." + codeStat).concat(EQUIPEMENT_EN_COURS.stats[codeStat]))).defTaille("0.85em").defCouleur(Couleur_1.Couleur.ARGENT));
                }
                CONTENEUR_EQUIPEMENT_EN_COURS.ajouterElement(colonneInfosEquipement);
            }
            else {
                var icone = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "interface/icones/equipement" + SLOT + ".png")
                    .defLargeur(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT).defHauteur(InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT);
                CONTENEUR_EQUIPEMENT_EN_COURS.ajouterElement(icone);
            }
        };
        InterfaceJoueurADV.TAILLE_ICONE_EQUIPEMENT = 62;
        InterfaceJoueurADV.STYLE_SELECTIONNE = {
            border: "2px solid #ffd74f",
            boxShadow: "0px 0px 8px #ffd74f"
        };
        InterfaceJoueurADV.STYLE_NON_SELECTIONNE = {
            border: "",
            boxShadow: ""
        };
        return InterfaceJoueurADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceJoueurADV = InterfaceJoueurADV;
});
//# sourceMappingURL=InterfaceJoueurADV.js.map