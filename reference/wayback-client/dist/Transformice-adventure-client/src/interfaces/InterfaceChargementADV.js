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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Element", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../_tfmAdventure/TFMAdventure", "../_monde/MondeADV", "../_tfmAdventure/ConfigADV", "../../../Souritheque-client/src/outils/reseau/Msg801", "../../../Souritheque-client/src/outils/reseau/ProtoM801"], function (require, exports, I_Conteneur_1, I_Element_1, I_Image_1, I_Texte_1, TFMAdventure_1, MondeADV_1, ConfigADV_1, Msg801_1, ProtoM801_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceChargementADV = (function (_super) {
        __extends(InterfaceChargementADV, _super);
        function InterfaceChargementADV() {
            var _this = _super.call(this) || this;
            _this.listeModule = [];
            _this.finAuto = false;
            _this.fermetureEnCours = false;
            _this.alphaFermeture = 1;
            _this.derniereBoucle = 0;
            _this.fermerInterface = _this.fermerInterface.bind(_this);
            _this.cliqueInterface = _this.cliqueInterface.bind(_this);
            _this.boucle = _this.boucle.bind(_this);
            _this.style.zIndex = "100";
            _this.style.position = "absolute";
            _this.style.top = "0px";
            _this.style.left = "0px";
            _this.justifierEnfants("center");
            _this.defLargeur("100%").defHauteur("100%");
            _this.style.backgroundColor = "#111111";
            _this.conteneurLogo = new I_Conteneur_1.I_Conteneur();
            _this.conteneurLogo.alignementEnfants("center");
            _this.ligneHaut = new I_Element_1.I_Element();
            _this.ligneHaut.defLargeur("100%");
            _this.ligneHaut.defHauteur("2px");
            _this.ligneHaut.style.backgroundColor = "#7BBD40";
            _this.ligneBas = new I_Element_1.I_Element();
            _this.ligneBas.defLargeur("100%");
            _this.ligneBas.defHauteur("2px");
            _this.ligneBas.style.backgroundColor = "#7BBD40";
            _this.logo = new I_Image_1.I_Image("tfmadv/interface/intro/logo.png");
            _this.logo.defLargeur("100%");
            _this.logo.defLargeurMax(1127);
            _this.texteChargement = new I_Texte_1.I_Texte();
            _this.texteChargement.style.fontFamily = "police-nom,Verdana,sans-serif";
            _this.texteChargement.defCouleur("#7BBD40");
            _this.texteChargement.style.marginTop = "1em";
            _this.texteChargement.style.height = "1em";
            _this.texteChargementSecondaire = new I_Texte_1.I_Texte().defTaille("0.8em");
            _this.texteChargementSecondaire.defCouleur("#488fbd");
            _this.texteChargementSecondaire.style.height = "0.8em";
            _this.texteChargementSecondaire.style.marginTop = "0.6em";
            _this.conteneurLogo.appendChild(_this.ligneHaut);
            _this.conteneurLogo.appendChild(_this.logo);
            _this.conteneurLogo.appendChild(_this.ligneBas);
            _this.conteneurLogo.appendChild(_this.texteChargement);
            _this.conteneurLogo.appendChild(_this.texteChargementSecondaire);
            _this.ajouterElement(_this.conteneurLogo);
            return _this;
        }
        InterfaceChargementADV.afficher = function () {
            if (!InterfaceChargementADV.instance) {
                InterfaceChargementADV.instance = new InterfaceChargementADV();
            }
            document.body.appendChild(InterfaceChargementADV.instance.elementHTML);
            InterfaceChargementADV.instance.initialisation();
        };
        InterfaceChargementADV.ajouterModule = function (MODULE) {
            if (!InterfaceChargementADV.instance) {
                InterfaceChargementADV.instance = new InterfaceChargementADV();
            }
            MODULE.interface = InterfaceChargementADV.instance;
            MODULE.texte = InterfaceChargementADV.defTexte;
            MODULE.texteSecondaire = InterfaceChargementADV.defTexteSecondaire;
            InterfaceChargementADV.instance.listeModule.push(MODULE);
            if (!MODULE.finAuto) {
                InterfaceChargementADV.instance.finAuto = false;
            }
            if (!InterfaceChargementADV.estAffiche()) {
                InterfaceChargementADV.afficher();
            }
            if (InterfaceChargementADV.instance.moduleEnCours == null) {
                InterfaceChargementADV.instance.lancerModuleSuivant();
            }
        };
        InterfaceChargementADV.recupModule = function (CLASSE) {
            if (InterfaceChargementADV.instance) {
                for (var _i = 0, _a = InterfaceChargementADV.instance.listeModule; _i < _a.length; _i++) {
                    var module_1 = _a[_i];
                    if (module_1 instanceof CLASSE) {
                        return module_1;
                    }
                }
            }
            return null;
        };
        InterfaceChargementADV.estAffiche = function () {
            return Boolean(InterfaceChargementADV.instance && InterfaceChargementADV.instance.elementHTML.parentNode);
        };
        InterfaceChargementADV.fermer = function () {
            if (InterfaceChargementADV.instance) {
                InterfaceChargementADV.instance.elementHTML.remove();
            }
        };
        InterfaceChargementADV.defTexte = function (TEXTE) {
            InterfaceChargementADV.instance.texteChargement.defTexte("⚙️ " + TEXTE);
        };
        InterfaceChargementADV.defTexteSecondaire = function (TEXTE) {
            InterfaceChargementADV.instance.texteChargementSecondaire.defTexte(TEXTE);
        };
        InterfaceChargementADV.finChargement = function (FIN) {
            if (FIN) {
                InterfaceChargementADV.instance.elementHTML.style.cursor = "pointer";
                InterfaceChargementADV.instance.elementHTML.onmousedown = function () {
                    InterfaceChargementADV.instance.cliqueInterface();
                };
                InterfaceChargementADV.instance.elementHTML.onpointerdown = function () {
                    InterfaceChargementADV.instance.cliqueInterface();
                };
                document.body.addEventListener("keydown", InterfaceChargementADV.instance.cliqueInterface);
                InterfaceChargementADV.instance.fonctionFin = FIN;
            }
            else {
                InterfaceChargementADV.fermer();
            }
        };
        InterfaceChargementADV.prototype.boucle = function () {
            if (!this.elementHTML.parentNode) {
                return;
            }
            requestAnimationFrame(this.boucle);
            var temps = Date.now();
            var tempsEcoule = temps - this.derniereBoucle;
            var delta = tempsEcoule / 16.6666;
            this.derniereBoucle = temps;
            if (this.listeModule.length) {
                if (!this.moduleEnCours) {
                    this.lancerModuleSuivant();
                }
                this.moduleEnCours.boucle(temps);
                if (this.moduleEnCours.estTermine) {
                    this.moduleEnCours.fin();
                    this.listeModule.shift();
                    this.moduleEnCours = null;
                    if (!this.listeModule.length && !this.finAuto) {
                        InterfaceChargementADV.defTexte("Click to continue");
                    }
                }
            }
            else if (this.finAuto) {
                this.fermerInterface();
            }
            if (this.fermetureEnCours) {
                this.alphaFermeture -= this.alphaFermeture * 0.1 * delta;
                this.style.opacity = String(this.alphaFermeture);
                if (this.alphaFermeture <= 0.01) {
                    InterfaceChargementADV.fermer();
                }
            }
        };
        InterfaceChargementADV.prototype.lancerModuleSuivant = function () {
            if (this.listeModule.length) {
                this.moduleEnCours = this.listeModule[0];
                this.texteChargement.defTexte("");
                this.texteChargementSecondaire.defTexte("");
                this.moduleEnCours.depart();
            }
        };
        InterfaceChargementADV.prototype.fermerInterface = function () {
            if (this.fermetureEnCours) {
                return;
            }
            this.texteChargement.defTexte("");
            this.texteChargementSecondaire.defTexte("");
            if (MondeADV_1.MondeADV.instance) {
                MondeADV_1.MondeADV.instance.afficherTransition();
            }
            this.elementHTML.onmousedown = null;
            this.elementHTML.onpointerdown = null;
            document.body.removeEventListener("keydown", InterfaceChargementADV.instance.cliqueInterface);
            if (this.fonctionFin) {
                this.fonctionFin();
                this.fonctionFin = null;
            }
            this.fermetureEnCours = true;
            this.alphaFermeture = 1;
        };
        InterfaceChargementADV.prototype.initialisation = function () {
            if (MondeADV_1.MondeADV.instance) {
                MondeADV_1.MondeADV.instance.afficherTransition(false);
            }
            this.finAuto = true;
            this.fermetureEnCours = false;
            this.alphaFermeture = 1;
            this.style.opacity = "1";
            this.texteChargement.defTexte("");
            this.texteChargementSecondaire.defTexte("");
            this.elementHTML.style.cursor = "auto";
            this.elementHTML.onmousedown = null;
            this.elementHTML.onpointerdown = null;
            document.body.removeEventListener("keydown", InterfaceChargementADV.instance.cliqueInterface);
            this.derniereBoucle = Date.now();
            this.boucle();
        };
        InterfaceChargementADV.prototype.cliqueInterface = function () {
            if (!this.listeModule.length && !this.moduleEnCours) {
                this.fermerInterface();
            }
        };
        return InterfaceChargementADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceChargementADV = InterfaceChargementADV;
    var ModuleChargementADV = (function () {
        function ModuleChargementADV() {
            this.estTermine = false;
            this.finAuto = true;
        }
        ModuleChargementADV.prototype.boucle = function (TEMPS) {
        };
        ModuleChargementADV.prototype.depart = function () {
        };
        ModuleChargementADV.prototype.fin = function () {
        };
        return ModuleChargementADV;
    }());
    exports.ModuleChargementADV = ModuleChargementADV;
    var ModuleChargementImageClipAnimADV = (function (_super) {
        __extends(ModuleChargementImageClipAnimADV, _super);
        function ModuleChargementImageClipAnimADV() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.listeAnim = [];
            return _this;
        }
        ModuleChargementImageClipAnimADV.prototype.depart = function () {
            this.texte("Préchargement des images");
        };
        ModuleChargementImageClipAnimADV.prototype.ajouterAnim = function (ANIM) {
            this.listeAnim.push(ANIM);
            if (ANIM.listeAnim) {
                for (var _i = 0, _a = ANIM.listeAnim; _i < _a.length; _i++) {
                    var sousAnim = _a[_i];
                    this.listeAnim.push(sousAnim);
                }
            }
        };
        ModuleChargementImageClipAnimADV.prototype.boucle = function (TEMPS) {
            var _this = this;
            if (!this.listeAnim.length) {
                this.estTermine = true;
                return;
            }
            if (!this.animEnCours) {
                this.animEnCours = this.listeAnim.shift();
                var chargeur = this.animEnCours.prechargement(function () {
                    _this.animEnCours = null;
                });
                if (chargeur) {
                    chargeur.on("load", function (CHARGEUR, RESSOURCE) {
                        var chaine = RESSOURCE.name;
                        if (chaine.indexOf("/") != -1) {
                            var decoupe = chaine.split("/");
                            chaine = decoupe[decoupe.length - 1];
                            _this.texteSecondaire(chaine.split("?")[0]);
                        }
                        else {
                            _this.texteSecondaire(RESSOURCE.name);
                        }
                    });
                }
            }
        };
        return ModuleChargementImageClipAnimADV;
    }(ModuleChargementADV));
    exports.ModuleChargementImageClipAnimADV = ModuleChargementImageClipAnimADV;
    var ModuleChargementDonneBinaire = (function (_super) {
        __extends(ModuleChargementDonneBinaire, _super);
        function ModuleChargementDonneBinaire() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModuleChargementDonneBinaire.prototype.depart = function () {
            var _this = this;
            this.texte("Chargement des données binaires");
            var oReq = new XMLHttpRequest();
            oReq.open("GET", "./ressources/data.bin?v" + ConfigADV_1.default.VERSION, true);
            oReq.responseType = "arraybuffer";
            oReq.onload = function () {
                var arrayBuffer = oReq.response;
                if (arrayBuffer) {
                    var msg = new Msg801_1.default(new Uint8Array(arrayBuffer));
                    var c1 = msg.l8();
                    var c2 = msg.l8();
                    var code = (c1 << 8) | (c2 & 0xFF);
                    ProtoM801_1.default.receptionMessage(code, msg);
                }
                _this.estTermine = true;
            };
            oReq.send(null);
        };
        return ModuleChargementDonneBinaire;
    }(ModuleChargementADV));
    exports.ModuleChargementDonneBinaire = ModuleChargementDonneBinaire;
    var ChargementLangue = (function (_super) {
        __extends(ChargementLangue, _super);
        function ChargementLangue(COMMUNAUTE) {
            var _this = _super.call(this) || this;
            _this.finAuto = false;
            _this.communaute = COMMUNAUTE;
            return _this;
        }
        ChargementLangue.prototype.depart = function () {
            this.estTermine = true;
        };
        return ChargementLangue;
    }(ModuleChargementADV));
    exports.ChargementLangue = ChargementLangue;
    var ModuleChargementFXADV = (function (_super) {
        __extends(ModuleChargementFXADV, _super);
        function ModuleChargementFXADV() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.listeFX = [];
            return _this;
        }
        ModuleChargementFXADV.prototype.depart = function () {
            this.texte("Rastérisation des effets spéciaux");
        };
        ModuleChargementFXADV.prototype.ajouterFX = function (ANIM) {
            this.listeFX.push(ANIM);
        };
        ModuleChargementFXADV.prototype.boucle = function (TEMPS) {
            var _this = this;
            if (!this.listeFX.length) {
                this.estTermine = true;
                return;
            }
            if (!this.animEnCours) {
                this.animEnCours = this.listeFX.shift();
                var chargeur = this.animEnCours.prechargement(function () {
                    _this.animEnCours.rasterisation(TFMAdventure_1.default.instance.app);
                    _this.animEnCours = null;
                });
                if (chargeur) {
                    chargeur.on("load", function (CHARGEUR, RESSOURCE) {
                        var chaine = RESSOURCE.name;
                        if (chaine.indexOf("/") != -1) {
                            var decoupe = chaine.split("/");
                            chaine = decoupe[decoupe.length - 1];
                            _this.texteSecondaire(chaine.split("?")[0]);
                        }
                        else {
                            _this.texteSecondaire(RESSOURCE.name);
                        }
                    });
                }
            }
        };
        return ModuleChargementFXADV;
    }(ModuleChargementADV));
    exports.ModuleChargementFXADV = ModuleChargementFXADV;
    var ModuleChargementMondeADV = (function (_super) {
        __extends(ModuleChargementMondeADV, _super);
        function ModuleChargementMondeADV() {
            return _super.call(this) || this;
        }
        ModuleChargementMondeADV.prototype.depart = function () {
            this.texte("Chargement du monde");
        };
        return ModuleChargementMondeADV;
    }(ModuleChargementADV));
    exports.ModuleChargementMondeADV = ModuleChargementMondeADV;
});
//# sourceMappingURL=InterfaceChargementADV.js.map