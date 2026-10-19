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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/interface/souruis/elements/I_Element", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../_tfmAdventure/ProtoADV", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ConfigADV", "./BarreXPADV", "../../../Souritheque-client/src/interface/souruis/elements/I_Tooltip"], function (require, exports, I_Conteneur_1, Trad801_1, I_Element_1, I_Texte_1, I_Image_1, I_Bouton_1, ProtoADV_1, TFMAdventure_1, ConfigADV_1, BarreXPADV_1, I_Tooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TypeArbre;
    (function (TypeArbre) {
        TypeArbre[TypeArbre["ARMES"] = 0] = "ARMES";
        TypeArbre[TypeArbre["COMPETENCES"] = 1] = "COMPETENCES";
        TypeArbre[TypeArbre["SOURIS"] = 2] = "SOURIS";
    })(TypeArbre || (TypeArbre = {}));
    var InterfaceTalents = (function (_super) {
        __extends(InterfaceTalents, _super);
        function InterfaceTalents() {
            var _this = _super.call(this, "ligne") || this;
            _this.indexTypesArbres = {};
            _this.pointsADepenser = 0;
            _this.typeArbresEnCours = -1;
            _this.arbres = {};
            _this.modeFenetre(Trad801_1.default.trad("$talents"), _this.retirer);
            _this.afficherFondUni("#000000" + "7F", "0.2em", 10);
            _this.defHauteur("65%").defHauteurMax(600);
            _this.centrerAuto(0.5, 0.5);
            var conteneurGlobalArbres = new I_Conteneur_1.I_Conteneur("colonne")
                .defLargeurMin("455px")
                .defCSS("overflow", "hidden");
            var conteneurTypesArbre = new I_Conteneur_1.I_Conteneur("ligne").justifierEnfants("space-around");
            var _loop_1 = function (cleTypeArbre) {
                if (isNaN(cleTypeArbre)) {
                    return "continue";
                }
                var codeTypeArbre = parseInt(cleTypeArbre, 10);
                var champTypeArbre = new I_Texte_1.I_Texte(Trad801_1.default.trad("$talent.type." + codeTypeArbre)).defCSS({
                    padding: "0.4em 0.5em",
                    borderRadius: "0.6em",
                    flexBasis: "30%"
                }).defAlignement("center");
                conteneurTypesArbre.ajouterElement(champTypeArbre);
                this_1.indexTypesArbres[codeTypeArbre] = champTypeArbre;
                champTypeArbre.rendreCliquable(function () {
                    var infoTalentEnCours = _this.talents[_this.talentEnCours];
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeAffichageInterfaceTalents(codeTypeArbre, infoTalentEnCours ? infoTalentEnCours.arbre : 0, infoTalentEnCours ? infoTalentEnCours.palier : 0));
                });
            };
            var this_1 = this;
            for (var _i = 0, _a = Object.keys(TypeArbre); _i < _a.length; _i++) {
                var cleTypeArbre = _a[_i];
                _loop_1(cleTypeArbre);
            }
            _this.conteneurListeArbres = new I_Conteneur_1.I_Conteneur("colonne").defCSS("flexGrow", "1").activerAscenseur(true);
            conteneurGlobalArbres.ajouterElement(conteneurTypesArbre, _this.conteneurListeArbres);
            var conteneurInfos = new I_Conteneur_1.I_Conteneur("colonne").defCSS("flexGrow", "1");
            conteneurInfos.defLargeur("560px");
            var conteneurExperience = new I_Conteneur_1.I_Conteneur("colonne")
                .alignementEnfants("center");
            var conteneurNiveau = new I_Conteneur_1.I_Conteneur().defHauteur(84).alignementEnfants("center").justifierEnfants("center").defCSS("position", "relative").defCSS("marginBottom", "-50px");
            _this.champNiveau = new I_Texte_1.I_Texte().defTaille("1.85em").defPolice("police-nom,Verdana").defCSS({
                position: "absolute",
                webkitTextStrokeWidth: "2px",
                webkitTextStrokeColor: "black",
                color: "#F79337"
            });
            var fondNiveau = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "interface/xp_niveau.png").defLargeur(100).defHauteur(84).defCSS("position", "absolute");
            conteneurNiveau.appendChild(fondNiveau);
            conteneurNiveau.appendChild(_this.champNiveau);
            var conteneurJaugeExperience = new I_Conteneur_1.I_Conteneur().defLargeur("100%")
                .defLargeurMax(549).defHauteur(114)
                .defCSS({
                position: "relative"
            });
            var conteneurBarreJaugeExperience = new I_Conteneur_1.I_Conteneur().defCSS({
                height: "18px",
                background: "#" + BarreXPADV_1.BarreXPADV.COULEUR_FOND.toString(16),
                position: "relative",
                width: "95%",
                margin: "auto",
            });
            _this.jaugeExperience = new I_Element_1.I_Element("span").defCSS({
                display: "block",
                height: "100%",
                backgroundColor: "#" + BarreXPADV_1.BarreXPADV.COULEUR.toString(16),
                boxShadow: "inset 0 2px 9px rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.4)",
                position: "relative",
                overflow: "hidden",
                margin: "unset",
                maxWidth: "100%",
            });
            _this.champJauge = new I_Texte_1.I_Texte().defTaille("0.85em").defCSS({
                position: "absolute",
                left: "0",
                right: "0",
                height: "100%",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
            }).defPolice("police-nom,Verdana");
            conteneurBarreJaugeExperience.appendChild(_this.jaugeExperience);
            conteneurBarreJaugeExperience.appendChild(_this.champJauge);
            var fondJauge = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "interface/cadre_xp.png").defLargeur("100%").defLargeurMax(549).defHauteur(114).defCSS("position", "absolute");
            conteneurJaugeExperience.appendChild(conteneurBarreJaugeExperience);
            conteneurJaugeExperience.appendChild(fondJauge);
            conteneurExperience.appendChild(conteneurNiveau);
            conteneurExperience.appendChild(conteneurJaugeExperience);
            var textePointsADepenser = new I_Texte_1.I_Texte("").defAlignement("center");
            _this.champNbPointsADepenser = new I_Texte_1.I_Texte();
            textePointsADepenser.appendChild(_this.champNbPointsADepenser);
            var tradNbPointsADepenser = Trad801_1.default.trad("$talents.pointsRestant");
            var posRemplacement = tradNbPointsADepenser.indexOf("%1");
            _this.champNbPointsADepenser.elementHTML.insertAdjacentText("beforebegin", tradNbPointsADepenser.substring(0, posRemplacement));
            _this.champNbPointsADepenser.elementHTML.insertAdjacentText("afterend", tradNbPointsADepenser.substring(posRemplacement + 2));
            _this.conteneurDescriptionTalentEtBoutonDepense = new I_Conteneur_1.I_Conteneur("colonne").defCSS("flexGrow", "1");
            _this.conteneurDescriptionTalent = new I_Conteneur_1.I_Conteneur("colonne").defCSS("flexGrow", "1");
            _this.conteneurDescriptionTalent.afficherFondUni("#000000" + "50");
            _this.imageTalent = new I_Image_1.I_Image().defHauteur(62).defLargeur(62);
            _this.titreTalent = new I_Texte_1.I_Texte().defTaille("1.2em");
            _this.titreTalent.defCouleur("#7BBD40");
            _this.titreTalent.style.fontWeight = "bold";
            _this.descriptionTalent = new I_Texte_1.I_Texte().multiligne(true);
            var tradDepenserPoint = Trad801_1.default.trad("$talents.obtenir");
            posRemplacement = tradDepenserPoint.indexOf("%1");
            _this.boutonAcquisitionTalent = new I_Bouton_1.I_Bouton(".");
            var champOrigineAcquisitionTalent = _this.boutonAcquisitionTalent.recupChamp();
            champOrigineAcquisitionTalent.style.color = "#F79337";
            champOrigineAcquisitionTalent.style.fontWeight = "bold";
            var texteBoutonAcquisitionTalent = document.createElement("span");
            _this.boutonAcquisitionTalent.elementHTML.replaceChild(texteBoutonAcquisitionTalent, champOrigineAcquisitionTalent);
            texteBoutonAcquisitionTalent.appendChild(_this.boutonAcquisitionTalent.recupChamp());
            champOrigineAcquisitionTalent.insertAdjacentText("beforebegin", tradDepenserPoint.substring(0, posRemplacement));
            champOrigineAcquisitionTalent.insertAdjacentText("afterend", tradDepenserPoint.substring(posRemplacement + 2));
            _this.boutonAcquisitionTalent.style.margin = "0.2em 0";
            _this.conteneurDescriptionTalent.nouvelleLigne(function (LIGNE) {
                LIGNE.alignementEnfants("center");
                LIGNE.ajouterElement(_this.imageTalent, _this.titreTalent);
            });
            _this.conteneurDescriptionTalent.ajouterElement(_this.descriptionTalent);
            _this.conteneurDescriptionTalentEtBoutonDepense.ajouterElement(_this.conteneurDescriptionTalent);
            conteneurInfos.ajouterElement(conteneurExperience, textePointsADepenser, _this.conteneurDescriptionTalentEtBoutonDepense);
            _this.ajouterElement(conteneurGlobalArbres, conteneurInfos);
            return _this;
        }
        InterfaceTalents.afficher = function (MSG) {
            if (!this.instance) {
                this.instance = new InterfaceTalents();
            }
            this.instance.initialisation(MSG);
            var scrollTop = this.instance.conteneurListeArbres.elementHTML.scrollTop;
            TFMAdventure_1.default.ajouterInterface(this.instance.elementHTML);
            this.instance.conteneurListeArbres.elementHTML.scrollTop = scrollTop;
        };
        InterfaceTalents.prototype.initialisation = function (MSG) {
            var _this = this;
            var codeTypeArbres = MSG.l8();
            for (var _i = 0, _a = Object.keys(this.indexTypesArbres); _i < _a.length; _i++) {
                var codeTypeArbreEnCours = _a[_i];
                var texteTypeArbre = this.indexTypesArbres[codeTypeArbreEnCours];
                var estTypeArbreSelectionne = +codeTypeArbreEnCours == codeTypeArbres;
                texteTypeArbre.style.backgroundColor = estTypeArbreSelectionne ? "#44662c" : "#00000050";
                texteTypeArbre.activerSouris(!estTypeArbreSelectionne);
            }
            var typeArbresDifferent = this.typeArbresEnCours != codeTypeArbres;
            this.typeArbresEnCours = codeTypeArbres;
            if (typeArbresDifferent) {
                this.conteneurListeArbres.vider();
                this.paliers = {};
            }
            this.arbres = {};
            this.talents = {};
            this.talentEnCours = MSG.l16();
            var nbArbres = MSG.l16();
            for (var i = 0; i < nbArbres; i++) {
                var infoArbre = {};
                infoArbre.id = MSG.l16();
                infoArbre.paliers = [];
                var nbTalents = MSG.l8();
                for (var i_1 = 0; i_1 < nbTalents; i_1++) {
                    var infoTalent = {
                        talent: MSG.l16(),
                        arbre: infoArbre.id,
                        palier: i_1 + 1,
                        estPossede: MSG.lBool(),
                        debloquable: MSG.lBool()
                    };
                    infoArbre.paliers.push(infoTalent);
                    this.talents[infoTalent.talent] = infoTalent;
                }
                this.arbres[infoArbre.id] = infoArbre;
                if (typeArbresDifferent) {
                    var infoConteneurArbre = this.afficherArbre(infoArbre);
                    this.paliers[infoArbre.id] = infoConteneurArbre.paliers;
                    this.conteneurListeArbres.ajouterElement(infoConteneurArbre.arbre);
                }
                else {
                    for (var _b = 0, _c = Object.keys(this.paliers[infoArbre.id]); _b < _c.length; _b++) {
                        var clePalier = _c[_b];
                        if (isNaN(clePalier)) {
                            continue;
                        }
                        var codePalier = parseInt(clePalier, 10);
                        var infoTalent = infoArbre.paliers[codePalier - 1];
                        var infoPaliers = this.paliers[infoArbre.id][codePalier];
                        this.majApparenceTalent(infoPaliers.image, infoTalent);
                    }
                }
            }
            if (typeArbresDifferent) {
                this.conteneurListeArbres.defilementHaut();
            }
            this.pointsADepenser = MSG.l16();
            this.champNbPointsADepenser.defTexte(this.pointsADepenser);
            this.niveau = MSG.l16();
            this.experienceEnCours = MSG.l32s();
            this.experienceRequise = MSG.l32s();
            this.champNiveau.defTexte(this.niveau);
            this.jaugeExperience.defCSS("width", (this.experienceEnCours * 100 / this.experienceRequise) + "%");
            this.champJauge.defTexte(this.experienceEnCours + " / " + this.experienceRequise);
            this.conteneurDescriptionTalentEtBoutonDepense.vider();
            if (this.talentEnCours != 0) {
                this.imageTalent.chargerImage(TFMAdventure_1.default.recupImageDistance("interface/talent/" + this.talentEnCours + ".png"));
                this.titreTalent.defTexte(Trad801_1.default.trad("$talent." + this.talentEnCours + ".nom"));
                this.descriptionTalent.defTexte(Trad801_1.default.trad("$talent." + this.talentEnCours + ".description"));
                this.conteneurDescriptionTalentEtBoutonDepense.ajouterElement(this.conteneurDescriptionTalent);
                var infoTalentEnCours = this.talents[this.talentEnCours];
                if (infoTalentEnCours) {
                    var palierEnCours = infoTalentEnCours.palier;
                    var prixTalent = 1 + Math.round(2 * (palierEnCours - 1) / 3);
                    if ([2, 3, 5, 6].indexOf(palierEnCours) != -1) {
                        var palierAutreTalentDeMemeNiveau = palierEnCours + ((palierEnCours == 2 || palierEnCours == 5) ? 1 : -1);
                        if (this.arbres[infoTalentEnCours.arbre].paliers[palierAutreTalentDeMemeNiveau - 1].estPossede) {
                            prixTalent = 0;
                        }
                    }
                    this.boutonAcquisitionTalent.defTexte("" + prixTalent);
                    this.conteneurDescriptionTalentEtBoutonDepense.ajouterElement(this.boutonAcquisitionTalent);
                    if (infoTalentEnCours.debloquable) {
                        this.boutonAcquisitionTalent.desactiver(false);
                        this.boutonAcquisitionTalent.rendreCliquable(function () {
                            var infoTalentEnCours = _this.talents[_this.talentEnCours];
                            if (infoTalentEnCours) {
                                TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeActivationTalent(infoTalentEnCours.arbre, infoTalentEnCours.palier));
                            }
                        });
                    }
                    else {
                        this.boutonAcquisitionTalent.desactiver(true);
                    }
                }
            }
        };
        InterfaceTalents.prototype.afficherArbre = function (INFO_ARBRE) {
            var _this = this;
            var conteneurArbre = new I_Conteneur_1.I_Conteneur("colonne");
            var titreArbre = new I_Texte_1.I_Texte(Trad801_1.default.trad("$talent.arbre." + INFO_ARBRE.id)).defAlignement("center").defCSS({
                background: "url(" + TFMAdventure_1.default.recupImageDistance("interface/titre-talent.png") + ") no-repeat",
                backgroundSize: "cover",
                margin: "0.2em 0 0"
            });
            titreArbre.style.lineHeight = "40px";
            titreArbre.style.borderTopLeftRadius = "0.5em";
            titreArbre.style.borderTopRightRadius = "0.5em";
            conteneurArbre.ajouterElement(titreArbre);
            var conteneurPaliers = new I_Conteneur_1.I_Conteneur("ligne").defHauteur(200).defHauteurMin(200).defCSS({
                margin: "0",
                backgroundColor: "#00000050"
            }).justifierEnfants("center");
            conteneurPaliers.style.borderBottomLeftRadius = "0.5em";
            conteneurPaliers.style.borderBottomRightRadius = "0.5em";
            var paliers = {};
            var indexPalier = 0;
            for (var indexNiveau = 0; indexNiveau < 4; indexNiveau++) {
                var conteneurNiveau = new I_Conteneur_1.I_Conteneur("colonne").defLargeur((100 / 5) + "%").justifierEnfants("space-around").alignementEnfants("center");
                conteneurNiveau.style.position = "relative";
                var nbPaliers = (indexNiveau == 1 || indexNiveau == 3) ? 2 : 1;
                var _loop_2 = function (indexPalierDuNiveau) {
                    indexPalier++;
                    var palierEnCours = indexPalier;
                    var infoTalent = INFO_ARBRE.paliers[palierEnCours - 1];
                    var talentEnCours = infoTalent.talent;
                    var prixTalent = 1 + Math.round(2 * (palierEnCours - 1) / 3);
                    var conteneurPalier = new I_Conteneur_1.I_Conteneur().defHauteur(62).defLargeur(62);
                    conteneurPalier.style.position = "relative";
                    var imageTalent = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "interface/talent/" + talentEnCours + ".png");
                    imageTalent.style.borderRadius = "20px";
                    imageTalent.style.position = "absolute";
                    conteneurPalier.appendChild(imageTalent);
                    conteneurNiveau.appendChild(conteneurPalier);
                    this_2.majApparenceTalent(imageTalent, infoTalent);
                    conteneurPalier.rendreCliquable(function () { return TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeAffichageInterfaceTalents(_this.typeArbresEnCours, INFO_ARBRE.id, palierEnCours)); });
                    paliers[indexPalier] = { conteneur: conteneurPalier, image: imageTalent };
                    if (prixTalent == 4) {
                        var cadenas = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/petit-cadenas.png"));
                        cadenas.style.position = "absolute";
                        cadenas.style.right = "-15px";
                        cadenas.style.bottom = "-15px";
                        conteneurPalier.appendChild(cadenas);
                        I_Tooltip_1.default.afficher(conteneurPalier, Trad801_1.default.trad("$talents.palierNonDisponibleDemo"));
                    }
                };
                var this_2 = this;
                for (var indexPalierDuNiveau = 0; indexPalierDuNiveau < nbPaliers; indexPalierDuNiveau++) {
                    _loop_2(indexPalierDuNiveau);
                }
                conteneurPaliers.appendChild(conteneurNiveau);
            }
            conteneurArbre.ajouterElement(conteneurPaliers);
            return { arbre: conteneurArbre, paliers: paliers };
        };
        InterfaceTalents.prototype.majApparenceTalent = function (ELEMENT, TALENT) {
            if (TALENT.talent == this.talentEnCours) {
                ELEMENT.defCSS({
                    border: "2px solid #ffd74f",
                    boxShadow: "0px 0px 8px #ffd74f"
                });
                if (TALENT.estPossede) {
                    ELEMENT.style.filter = "";
                }
            }
            else {
                ELEMENT.defCSS({
                    border: "2px solid transparent",
                    boxShadow: ""
                });
                if (TALENT.estPossede) {
                    ELEMENT.style.border = "2px solid " + "#45b667";
                    ELEMENT.style.filter = "";
                }
                else if (TALENT.debloquable) {
                    ELEMENT.style.filter = "sepia(0.9) brightness(0.8)";
                }
                else {
                    ELEMENT.style.filter = "grayscale(1) brightness(0.3)";
                }
            }
        };
        return InterfaceTalents;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceTalents;
});
//# sourceMappingURL=InterfaceTalents.js.map