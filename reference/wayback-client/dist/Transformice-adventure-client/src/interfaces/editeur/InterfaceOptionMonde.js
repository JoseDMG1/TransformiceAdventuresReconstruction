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
define(["require", "exports", "../../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../../Souritheque-client/src/outils/reseau/Msg801", "../../../../Souritheque-client/src/interface/souruis/elements/I_ChampTexte", "../../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../_tfmAdventure/TFMAdventure", "../../_tfmAdventure/ProtoADV", "../../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../_monde/MondeADV", "../../_monde/_mobile/MobileADV"], function (require, exports, I_Conteneur_1, Msg801_1, I_ChampTexte_1, I_Bouton_1, TFMAdventure_1, ProtoADV_1, I_Texte_1, MondeADV_1, MobileADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceOptionMonde = (function (_super) {
        __extends(InterfaceOptionMonde, _super);
        function InterfaceOptionMonde() {
            var _this = _super.call(this) || this;
            _this.modeFenetre("Options du monde", InterfaceOptionMonde.fermer);
            _this.centrerAuto();
            _this.defLargeur(500);
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Couleur de fond :").flexAlignement("center"));
                _this.champCouleurFond = new I_ChampTexte_1.I_ChampTexte();
                _this.champCouleurFond.activerSelecteurCouleur();
                _this.champCouleurFond.etirer();
                LIGNE.ajouterElement(_this.champCouleurFond);
            });
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Lumière globale :").flexAlignement("center"));
                _this.champCouleur = new I_ChampTexte_1.I_ChampTexte("Couleur");
                _this.champCouleur.activerSelecteurCouleur();
                _this.champCouleur.etirer(2);
                LIGNE.ajouterElement(_this.champCouleur);
            });
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Lumière canopée :").flexAlignement("center"));
                _this.champCanopee = new I_ChampTexte_1.I_ChampTexte("Couleur");
                _this.champCanopee.activerSelecteurCouleur();
                _this.champCanopee.etirer(2);
                LIGNE.ajouterElement(_this.champCanopee);
            });
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Couleur eau :").flexAlignement("center"));
                _this.champEau = new I_ChampTexte_1.I_ChampTexte("Couleur");
                _this.champEau.activerSelecteurCouleur();
                _this.champEau.etirer(2);
                LIGNE.ajouterElement(_this.champEau);
            });
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Vitesse eau :").flexAlignement("center"));
                _this.champVEauX = new I_ChampTexte_1.I_ChampTexte("vx");
                _this.champVEauX.etirer(2);
                LIGNE.ajouterElement(_this.champVEauX);
                _this.champVEauY = new I_ChampTexte_1.I_ChampTexte("vy");
                _this.champVEauY.etirer(2);
                LIGNE.ajouterElement(_this.champVEauY);
                _this.champVEcuX = new I_ChampTexte_1.I_ChampTexte("vx");
                _this.champVEcuX.etirer(2);
                LIGNE.ajouterElement(_this.champVEcuX);
                _this.champVEcuY = new I_ChampTexte_1.I_ChampTexte("vy");
                _this.champVEcuY.etirer(2);
                LIGNE.ajouterElement(_this.champVEcuY);
            });
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Spawn joueurs").flexAlignement("center"));
                _this.champSpawnX = new I_ChampTexte_1.I_ChampTexte("x");
                _this.champSpawnX.etirer(2);
                LIGNE.ajouterElement(_this.champSpawnX);
                _this.champSpawnY = new I_ChampTexte_1.I_ChampTexte("y");
                _this.champSpawnY.etirer(2);
                LIGNE.ajouterElement(_this.champSpawnY);
                _this.btnSpawn = new I_Bouton_1.I_Bouton("Définir", function () {
                    _this.champSpawnX.defTexte(MobileADV_1.MobileADV.joueurPrincipal.positionServeur.x | 0);
                    _this.champSpawnY.defTexte(MobileADV_1.MobileADV.joueurPrincipal.positionServeur.y | 0);
                });
                LIGNE.ajouterElement(_this.btnSpawn);
            });
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Musiques").flexAlignement("center"));
                _this.champMusique = new I_ChampTexte_1.I_ChampTexte();
                _this.champMusique.etirer(2);
                LIGNE.ajouterElement(_this.champMusique);
            });
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Valider", function () {
                var couleurFond = _this.champCouleurFond.recupTexte().replace("#", "");
                var couleurLumiere = _this.champCouleur.recupTexte().replace("#", "");
                var couleurCanopee = _this.champCanopee.recupTexte().replace("#", "");
                var couleurEau = _this.champEau.recupTexte().replace("#", "");
                var chaine = new Msg801_1.default();
                chaine.eFloat(parseInt(_this.champSpawnX.recupTexte())).eFloat(parseInt(_this.champSpawnY.recupTexte()));
                chaine.e32(parseInt(couleurFond, 16));
                chaine.e32(parseInt(couleurLumiere, 16));
                chaine.e32(MondeADV_1.MondeADV.instance.rectanglesLumiereMonde.length);
                for (var i = 0; i < MondeADV_1.MondeADV.instance.rectanglesLumiereMonde.length; i++) {
                    var rect = MondeADV_1.MondeADV.instance.rectanglesLumiereMonde[i];
                    chaine.e32(rect.x);
                    chaine.e32(rect.y);
                    chaine.e32(rect.largeur);
                    chaine.e32(rect.hauteur);
                    chaine.e32(rect.couleur);
                    chaine.e16(rect.marge);
                }
                chaine.e32(parseInt(couleurCanopee, 16));
                chaine.e32(parseInt(couleurEau, 16));
                chaine.e16(parseInt(_this.champVEauX.recupTexte()));
                chaine.e16(parseInt(_this.champVEauY.recupTexte()));
                chaine.e16(parseInt(_this.champVEcuX.recupTexte()));
                chaine.e16(parseInt(_this.champVEcuY.recupTexte()));
                var listeMusiqueBrute = _this.champMusique.recupTexte().split(",");
                var listeMusique = [];
                for (var _i = 0, listeMusiqueBrute_1 = listeMusiqueBrute; _i < listeMusiqueBrute_1.length; _i++) {
                    var musique = listeMusiqueBrute_1[_i];
                    if (musique) {
                        listeMusique.push(musique);
                    }
                }
                chaine.e8(listeMusique.length);
                for (var _a = 0, listeMusiqueBrute_2 = listeMusiqueBrute; _a < listeMusiqueBrute_2.length; _a++) {
                    var musique = listeMusiqueBrute_2[_a];
                    chaine.eChaine(musique);
                }
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.majOptionMonde(chaine));
                InterfaceOptionMonde.fermer();
            }));
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Défaut", function () {
                _this.champCouleurFond.defTexte("#000000");
                _this.champCouleur.defTexte("#7F7F7F");
                _this.champCanopee.defTexte("#4B3D0A");
                _this.champEau.defTexte("#66CCCC");
                _this.champVEauX.defTexte("-50");
                _this.champVEauY.defTexte("-25");
                _this.champVEcuX.defTexte("-10");
                _this.champVEcuY.defTexte("-5");
            }));
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Annuler", function () {
                InterfaceOptionMonde.fermer();
            }));
            return _this;
        }
        InterfaceOptionMonde.afficher = function (MSG) {
            if (!InterfaceOptionMonde.instance) {
                InterfaceOptionMonde.instance = new InterfaceOptionMonde();
            }
            InterfaceOptionMonde.instance.initialisation(MSG);
            TFMAdventure_1.default.ajouterInterface(InterfaceOptionMonde.instance.elementHTML);
        };
        InterfaceOptionMonde.estAffiche = function () {
            return InterfaceOptionMonde.instance && InterfaceOptionMonde.instance.elementHTML.parentNode != null;
        };
        InterfaceOptionMonde.fermer = function () {
            if (InterfaceOptionMonde.instance) {
                InterfaceOptionMonde.instance.elementHTML.remove();
            }
        };
        InterfaceOptionMonde.prototype.initialisation = function (MSG) {
            var spawnX = MSG.lFloat();
            var spawnY = MSG.lFloat();
            var couleurFond = MSG.l32s().toString(16).toUpperCase();
            while (couleurFond.length < 6) {
                couleurFond = "0" + couleurFond;
            }
            var couleurLumiere = MSG.l32s().toString(16).toUpperCase();
            while (couleurLumiere.length < 6) {
                couleurLumiere = "0" + couleurLumiere;
            }
            var nombreRectangleLumiere = MSG.l32s();
            for (var i = 0; i < nombreRectangleLumiere; i++) {
                var x = MSG.l32s();
                var y = MSG.l32s();
                var largeur = MSG.l32s();
                var hauteur = MSG.l32s();
                var couleur = MSG.l32s();
                var marge = MSG.l16();
            }
            var couleurCanopee = MSG.l32s().toString(16).toUpperCase();
            while (couleurCanopee.length < 6) {
                couleurCanopee = "0" + couleurCanopee;
            }
            var couleurEau = MSG.l32s().toString(16).toUpperCase();
            while (couleurEau.length < 6) {
                couleurEau = "0" + couleurEau;
            }
            this.champSpawnX.defTexte(spawnX);
            this.champSpawnY.defTexte(spawnY);
            this.champCouleurFond.defTexte("#" + couleurFond);
            this.champCouleur.defTexte("#" + couleurLumiere);
            this.champCanopee.defTexte("#" + couleurCanopee);
            this.champEau.defTexte("#" + couleurEau);
            this.champVEauX.defTexte(MSG.l16s());
            this.champVEauY.defTexte(MSG.l16s());
            this.champVEcuX.defTexte(MSG.l16s());
            this.champVEcuY.defTexte(MSG.l16s());
            var listeMusique = [];
            for (var i = 0, nb = MSG.l8(); i < nb; i++) {
                listeMusique.push(MSG.lChaine());
            }
            this.champMusique.defTexte(listeMusique.join(","));
        };
        return InterfaceOptionMonde;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceOptionMonde = InterfaceOptionMonde;
});
//# sourceMappingURL=InterfaceOptionMonde.js.map