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
define(["require", "exports", "./types/RecompenseADV", "../../../Souritheque-client/src/outils/affichage/MoteurShader", "../graphismes/ShaderFlammes", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/outils/affichage/animation/AnimMath", "../_monde/MondeADV", "../../../Souritheque-client/src/outils/UtilPIXI"], function (require, exports, RecompenseADV_1, MoteurShader_1, ShaderFlammes_1, TFMAdventure_1, AnimMath_1, MondeADV_1, UtilPIXI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Graphics = PIXI.Graphics;
    var InterfaceRecompense = (function (_super) {
        __extends(InterfaceRecompense, _super);
        function InterfaceRecompense() {
            var _this = _super.call(this) || this;
            _this.conteneurShader = new Container();
            _this.conteneurRecompenses = new Container();
            return _this;
        }
        InterfaceRecompense.afficher = function (MSG) {
            if (!this.instance) {
                this.instance = new InterfaceRecompense();
            }
            this.instance.initialisation(MSG);
            this.instance.x = 0;
            this.instance.y = 0;
            TFMAdventure_1.default.instance.coucheInterfacePixi.addChild(this.instance);
            this.shaderFlammes = new ShaderFlammes_1.default();
            MoteurShader_1.MoteurShader.instance.appliquerShader(this.instance.conteneurShader, this.shaderFlammes);
        };
        InterfaceRecompense.prototype.initialisation = function (MSG) {
            var _this = this;
            this.removeChildren();
            this.addChild(this.conteneurShader);
            this.addChild(this.conteneurRecompenses);
            var fondTransparent = new Graphics();
            fondTransparent.beginFill(0, 0);
            fondTransparent.drawRect(0, 0, TFMAdventure_1.default.LARGEUR, TFMAdventure_1.default.HAUTEUR);
            this.addChild(fondTransparent);
            var nbRecompenses = MSG.l8();
            var recompenses = [];
            for (var i = 0; i < nbRecompenses; i++) {
                var recompense = RecompenseADV_1.default.deserialiser(MSG);
                recompenses.push(recompense);
            }
            this.conteneurRecompenses.removeChildren();
            rendreCliquable(this.conteneurRecompenses, null);
            var largeurMax = TFMAdventure_1.default.LARGEUR - 2 * 100;
            var margeCotes = 250;
            var espaceUnitaireRecompense = Math.min(200, (largeurMax - 2 * margeCotes) / nbRecompenses);
            var largeurConteneurRecompenses = 2 * margeCotes + espaceUnitaireRecompense * nbRecompenses;
            var fondConteneurRecompenses = new PIXI.Graphics();
            fondConteneurRecompenses.beginFill(0, 0);
            fondConteneurRecompenses.drawRect(0, 0, largeurConteneurRecompenses, InterfaceRecompense.HAUTEUR_RECOMPENSES);
            this.conteneurRecompenses.addChild(fondConteneurRecompenses);
            var listeConteneurRecompense = [];
            for (var i = 0; i < nbRecompenses; i++) {
                var clipRecompense = recompenses[i].recupSprite();
                var conteneurRecompense = new ConteneurAnime(-TFMAdventure_1.default.DEMI_HAUTEUR - 100, InterfaceRecompense.HAUTEUR_RECOMPENSES / 2);
                conteneurRecompense.x = margeCotes + espaceUnitaireRecompense * (i + 0.5);
                var rect = clipRecompense.getLocalBounds();
                conteneurRecompense.addChild(clipRecompense);
                this.conteneurRecompenses.addChild(conteneurRecompense);
                listeConteneurRecompense.push(conteneurRecompense);
            }
            this.conteneurShader.removeChildren();
            var fondConteneurShader = new Sprite(PIXI.Texture.EMPTY);
            fondConteneurShader.width = largeurConteneurRecompenses + 2 * margeCotes;
            fondConteneurShader.height = InterfaceRecompense.HAUTEUR_RECOMPENSES + 200;
            this.conteneurShader.addChild(fondConteneurShader);
            this.conteneurShader.x = TFMAdventure_1.default.DEMI_LARGEUR - this.conteneurShader.width / 2;
            this.conteneurShader.y = TFMAdventure_1.default.DEMI_HAUTEUR - this.conteneurShader.height / 2;
            this.conteneurRecompenses.x = this.conteneurShader.x + (this.conteneurShader.width - this.conteneurRecompenses.width) / 2;
            this.conteneurRecompenses.y = this.conteneurShader.y + (this.conteneurShader.height - this.conteneurRecompenses.height) / 2;
            for (var i = 0; i < listeConteneurRecompense.length; i++) {
                listeConteneurRecompense[i].animation(i * 250, (i == (listeConteneurRecompense.length - 1)) ? (function () {
                    rendreCliquable(_this.conteneurRecompenses, function (ELM) {
                        if (_this && _this.parent) {
                            _this.parent.removeChild(_this);
                        }
                    });
                }) : null);
            }
        };
        InterfaceRecompense.HAUTEUR_RECOMPENSES = 200;
        return InterfaceRecompense;
    }(PIXI.Container));
    exports.default = InterfaceRecompense;
    var ConteneurAnime = (function (_super) {
        __extends(ConteneurAnime, _super);
        function ConteneurAnime(DEPART_Y, FIN_Y) {
            var _this = _super.call(this) || this;
            _this.visible = false;
            _this.departY = DEPART_Y;
            _this.finY = FIN_Y;
            _this.y = _this.departY;
            _this.cibleFlash = _this;
            return _this;
        }
        ConteneurAnime.prototype.animation = function (DECALAGE_DATE_DEBUT, FIN) {
            var _this = this;
            this.finAnim = FIN;
            var filtre = new PIXI.filters.ColorMatrixFilter();
            this.visible = true;
            var distance = this.finY - this.departY;
            var premierRebond = false;
            AnimMath_1.default.animBoucle(1000, function (P2) {
                _this.y = _this.departY + distance * P2;
            }, 0, 1, DECALAGE_DATE_DEBUT).defMouvement(function (TEMPS, b, c, d) {
                if (premierRebond == false && (TEMPS /= d) >= (1 / 2.75)) {
                    MondeADV_1.MondeADV.instance.tremblement(5, 100, 20, Math.PI / 4);
                    premierRebond = true;
                }
                return AnimMath_1.Mouvement.easeOutBounce(TEMPS, b, c, d);
            }).boucleAuto().defFonctionFin(function () {
                if (_this.finAnim) {
                    _this.finAnim();
                }
                if (_this.cibleFlash) {
                    AnimMath_1.default.animBoucle(1000, function (P2) {
                        filtre.brightness(5 - (P2 * 4));
                    }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                }
            });
        };
        return ConteneurAnime;
    }(Container));
    function rendreCliquable(ELEMENT, FONCTION, CLIQUE_DROIT) {
        UtilPIXI_1.default.rendreElementCliquable(ELEMENT, FONCTION, CLIQUE_DROIT);
    }
});
//# sourceMappingURL=InterfaceRecompense.js.map