define(["require", "exports", "../_monde/_mobile/MobileADV", "../_monde/MondeADV", "./TFMAdventure", "./ProtoADV", "../../../Souritheque-client/src/outils/controles/Clavier", "../interfaces/admin/AdminADV", "../../../Souritheque-client/src/outils/divers/Chips", "../interfaces/InterfaceEmoteADV", "../gameplay/InterfaceCompetenceADV", "../interfaces/InterfaceMenuADV"], function (require, exports, MobileADV_1, MondeADV_1, TFMAdventure_1, ProtoADV_1, Clavier_1, AdminADV_1, Chips_1, InterfaceEmoteADV_1, InterfaceCompetenceADV_1, InterfaceMenuADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ClavierADV = (function () {
        function ClavierADV() {
            var _this = this;
            this.droiteEnCours = false;
            this.gaucheEnCours = false;
            this.hautEnCours = false;
            this.basEnCours = false;
            this.deplacementBloque = false;
            this.dernierVecteurDeplacement = -1;
            this.dernierAngleManette = 0;
            this.derniereForceManette = 0;
            this.derniereAttaque = 0;
            this.modeSansInterface = false;
            ClavierADV.instance = this;
            Clavier_1.Clavier.defPerteFocus(function () {
                _this.droiteEnCours = false;
                _this.gaucheEnCours = false;
                _this.basEnCours = false;
                _this.hautEnCours = false;
                if (MobileADV_1.MobileADV.joueurPrincipal) {
                    _this.compilationDeplacementJoueurPrincipal();
                    if (MobileADV_1.MobileADV.joueurPrincipal.mainGauche != null) {
                        MobileADV_1.MobileADV.joueurPrincipal.mainGauche.finClique();
                    }
                    if (MobileADV_1.MobileADV.joueurPrincipal.mainDroite != null) {
                        MobileADV_1.MobileADV.joueurPrincipal.mainDroite.finClique();
                    }
                }
            });
            var contexte = new Clavier_1.ContexteClavier();
            contexte.defAppuyerEmplacement("Escape", function () {
                InterfaceMenuADV_1.default.afficher(!InterfaceMenuADV_1.default.estAffiche());
            });
            Clavier_1.Clavier.ajouterContexte(contexte);
        }
        ClavierADV.prototype.ajouterContexteJeu = function () {
            var _this = this;
            var contexte = new Clavier_1.ContexteClavier();
            contexte.defAppuyerTouche("Enter", function () {
                _this.droiteEnCours = false;
                _this.gaucheEnCours = false;
                _this.hautEnCours = false;
                _this.basEnCours = false;
                _this.compilationDeplacementJoueurPrincipal();
                if (TFMAdventure_1.default.instance.chat) {
                    TFMAdventure_1.default.instance.chat.focusChat();
                }
            });
            contexte.defAppuyerEmplacement("KeyP", function () {
                _this.modeSansInterface = !_this.modeSansInterface;
                TFMAdventure_1.default.instance.coucheInterfacePixi.visible = !_this.modeSansInterface;
                if (_this.modeSansInterface) {
                    TFMAdventure_1.default.instance.chat.style.display = "none";
                    TFMAdventure_1.default.instance.coucheInterface.style.display = "none";
                    if (TFMAdventure_1.default.instance.manetteVirtuelle) {
                        TFMAdventure_1.default.instance.manetteVirtuelle.visible = false;
                    }
                    TFMAdventure_1.default.instance.clipDeck.visible = false;
                    MondeADV_1.MondeADV.instance.coucheMobileInterface.visible = false;
                    Chips_1.Chips.afficher(false);
                }
                else {
                    TFMAdventure_1.default.instance.chat.style.display = "flex";
                    TFMAdventure_1.default.instance.coucheInterface.style.display = "flex";
                    if (TFMAdventure_1.default.instance.manetteVirtuelle) {
                        TFMAdventure_1.default.instance.manetteVirtuelle.visible = true;
                    }
                    MondeADV_1.MondeADV.instance.coucheMobileInterface.visible = true;
                    TFMAdventure_1.default.instance.clipDeck.visible = true;
                }
            }, false, true);
            contexte.defAppuyerEmplacement(["KeyD", "ArrowRight"], function () {
                _this.droiteEnCours = true;
                _this.compilationDeplacementJoueurPrincipal();
            });
            contexte.defRelacherEmplacement(["KeyD", "ArrowRight"], function () {
                _this.droiteEnCours = false;
                _this.compilationDeplacementJoueurPrincipal();
            });
            contexte.defAppuyerEmplacement(["KeyA", "ArrowLeft"], function () {
                _this.gaucheEnCours = true;
                _this.compilationDeplacementJoueurPrincipal();
            });
            contexte.defRelacherEmplacement(["KeyA", "ArrowLeft"], function () {
                _this.gaucheEnCours = false;
                _this.compilationDeplacementJoueurPrincipal();
            });
            contexte.defAppuyerEmplacement(["KeyW", "ArrowUp"], function () {
                _this.hautEnCours = true;
                _this.compilationDeplacementJoueurPrincipal();
            });
            contexte.defRelacherEmplacement(["KeyW", "ArrowUp"], function () {
                _this.hautEnCours = false;
                _this.compilationDeplacementJoueurPrincipal();
            });
            contexte.defAppuyerEmplacement(["KeyS", "ArrowDown"], function () {
                _this.basEnCours = true;
                _this.compilationDeplacementJoueurPrincipal();
            });
            contexte.defRelacherEmplacement(["KeyS", "ArrowDown"], function () {
                _this.basEnCours = false;
                _this.compilationDeplacementJoueurPrincipal();
            });
            if (TFMAdventure_1.default.DEBUG) {
                contexte.defAppuyerEmplacement("KeyX", function () {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.ouvertureEditeur());
                });
                contexte.defAppuyerEmplacement("KeyZ", function () {
                    if (AdminADV_1.AdminADV.estAffiche()) {
                        AdminADV_1.AdminADV.fermer();
                    }
                    else {
                        AdminADV_1.AdminADV.afficher();
                    }
                });
                contexte.defAppuyerEmplacement("KeyF", function () {
                    InterfaceEmoteADV_1.InterfaceEmoteADV.afficher();
                });
            }
            contexte.defAppuyerEmplacement("KeyI", function () {
                Chips_1.Chips.afficher(!Chips_1.Chips.estAffiche);
            }, true);
            Clavier_1.Clavier.ajouterContexte(contexte);
        };
        ClavierADV.prototype.lancementAttaqueJoueurPrincipal = function () {
        };
        ClavierADV.prototype.finAttaqueJoueurPrincipal = function () {
        };
        ClavierADV.prototype.cliqueMonde = function (GAUCHE, OUI) {
            var joueur = MobileADV_1.MobileADV.joueurPrincipal;
            var main = GAUCHE ? joueur.mainDroite : joueur.mainGauche;
            if (!main) {
                return;
            }
            if (OUI) {
                if (InterfaceCompetenceADV_1.InterfaceCompetenceADV.instance.fonctionCliqueMonde) {
                    InterfaceCompetenceADV_1.InterfaceCompetenceADV.instance.fonctionCliqueMonde();
                    return;
                }
                main.debutClique();
                if (main.mainDroite && joueur.mainGauche) {
                    joueur.mainGauche.interruptionInterne();
                }
                if (!main.mainDroite && joueur.mainDroite) {
                    joueur.mainDroite.interruptionInterne();
                }
            }
            else {
                main.finClique();
            }
        };
        ClavierADV.prototype.bloquerDeplacement = function (OUI) {
            if (OUI != this.deplacementBloque) {
                this.deplacementBloque = OUI;
                this.compilationDeplacementJoueurPrincipal();
            }
        };
        ClavierADV.prototype.compilationDeplacementManette = function (ANGLE, FORCE) {
            if (FORCE == this.derniereForceManette && ANGLE == this.dernierAngleManette) {
                return;
            }
            this.derniereForceManette = FORCE;
            this.dernierAngleManette = ANGLE;
            if (FORCE) {
                MobileADV_1.MobileADV.joueurPrincipal.deplacementVers(ANGLE);
            }
            else {
                MobileADV_1.MobileADV.joueurPrincipal.arreterDeplacement();
            }
            MobileADV_1.MobileADV.synchronisationJoueurPrincipal(MobileADV_1.MobileADV.joueurPrincipal.positionServeur, ANGLE / 0.02617993);
        };
        ClavierADV.prototype.enDeplacementOuProjection = function () {
            return MobileADV_1.MobileADV.joueurPrincipal.enCoursDeDeplacement || MobileADV_1.MobileADV.joueurPrincipal.projectionEnCours;
        };
        ClavierADV.prototype.compilationDeplacementJoueurPrincipal = function () {
            var joueur = MobileADV_1.MobileADV.joueurPrincipal;
            if (!joueur) {
                return;
            }
            var blocageArme = false;
            if (joueur.mainDroite && !joueur.mainDroite.deplacementPossible) {
                blocageArme = true;
            }
            else if (joueur.mainGauche && !joueur.mainGauche.deplacementPossible) {
                blocageArme = true;
            }
            var nouvelAngleDeplacement = 255;
            if (!joueur.paradeEnCours && !this.deplacementBloque && !blocageArme && !joueur.estMort) {
                if (this.droiteEnCours && this.hautEnCours) {
                    nouvelAngleDeplacement = 210;
                }
                else if (this.gaucheEnCours && this.hautEnCours) {
                    nouvelAngleDeplacement = 150;
                }
                else if (this.gaucheEnCours && this.basEnCours) {
                    nouvelAngleDeplacement = 90;
                }
                else if (this.droiteEnCours && this.basEnCours) {
                    nouvelAngleDeplacement = 30;
                }
                else if (this.droiteEnCours) {
                    nouvelAngleDeplacement = 0;
                }
                else if (this.hautEnCours) {
                    nouvelAngleDeplacement = 180;
                }
                else if (this.gaucheEnCours) {
                    nouvelAngleDeplacement = 120;
                }
                else if (this.basEnCours) {
                    nouvelAngleDeplacement = 60;
                }
            }
            if (this.dernierVecteurDeplacement != nouvelAngleDeplacement) {
                this.dernierVecteurDeplacement = nouvelAngleDeplacement;
                if (nouvelAngleDeplacement == 255) {
                    joueur.arreterDeplacement();
                }
                else {
                    if (joueur.mainGauche) {
                        joueur.mainGauche.deplacement();
                    }
                    if (joueur.mainDroite) {
                        joueur.mainDroite.deplacement();
                    }
                    joueur.deplacementVers(nouvelAngleDeplacement * 0.02617993);
                }
                MobileADV_1.MobileADV.synchronisationJoueurPrincipal(joueur.positionServeur, nouvelAngleDeplacement);
            }
        };
        return ClavierADV;
    }());
    exports.default = ClavierADV;
});
//# sourceMappingURL=ClavierADV.js.map