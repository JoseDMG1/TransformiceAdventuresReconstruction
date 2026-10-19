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
define(["require", "exports", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/interface/Couleur", "../_monde/MondeADV", "../_tfmAdventure/ProtoADV"], function (require, exports, TFMAdventure_1, Couleur_1, MondeADV_1, ProtoADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceEmoteADV = (function (_super) {
        __extends(InterfaceEmoteADV, _super);
        function InterfaceEmoteADV() {
            var _this = _super.call(this) || this;
            _this.largeur = 29 + 4;
            _this.hauteur = 26 + 4;
            _this.listeBtn = [];
            _this.boucle = _this.boucle.bind(_this);
            var nbEmote = 10;
            for (var i = 0; i < nbEmote; i++) {
                var clip = new Emote(i + 1);
                _this.addChild(clip);
                _this.listeBtn.push(clip);
            }
            return _this;
        }
        InterfaceEmoteADV.afficher = function () {
            if (!InterfaceEmoteADV.instance) {
                InterfaceEmoteADV.instance = new InterfaceEmoteADV();
            }
            InterfaceEmoteADV.instance.majPos();
            TFMAdventure_1.default.instance.coucheInterfacePixi.addChild(InterfaceEmoteADV.instance);
            InterfaceEmoteADV.instance.initialisation();
        };
        InterfaceEmoteADV.estAffiche = function () {
            return Boolean(InterfaceEmoteADV.instance && InterfaceEmoteADV.instance.parent);
        };
        InterfaceEmoteADV.fermer = function () {
            if (InterfaceEmoteADV.instance && InterfaceEmoteADV.instance.parent) {
                InterfaceEmoteADV.instance.parent.removeChild(InterfaceEmoteADV.instance);
            }
            MondeADV_1.MondeADV.instance.supprimerBoucle("InterfaceEmoteADV");
        };
        InterfaceEmoteADV.prototype.initialisation = function () {
            var temps = Date.now();
            var nb = this.listeBtn.length;
            var quartier = (Math.PI * 2) / nb;
            var base = -Math.PI / 2;
            var rayon = 50;
            for (var i = 0; i < nb; i++) {
                var clip = this.listeBtn[i];
                clip.alpha = 0;
                clip.enPauseJusqua = temps + i * 10;
                clip.position.set(0, 0);
                clip.posCibleX = Math.cos(base) * rayon;
                clip.posCibleY = Math.sin(base) * rayon;
                base += quartier;
            }
            MondeADV_1.MondeADV.instance.ajouterBoucle("InterfaceEmoteADV", this.boucle);
        };
        InterfaceEmoteADV.prototype.boucle = function (TEMPS) {
            for (var _i = 0, _a = this.listeBtn; _i < _a.length; _i++) {
                var clip = _a[_i];
                if (TEMPS > clip.enPauseJusqua) {
                    clip.x += (clip.posCibleX - clip.x) * 0.2;
                    clip.y += (clip.posCibleY - clip.y) * 0.2;
                    clip.alpha += (1 - clip.alpha) * 0.2;
                }
            }
        };
        InterfaceEmoteADV.prototype.majPos = function () {
            this.position.set(TFMAdventure_1.default.SOURIS_X, TFMAdventure_1.default.SOURIS_Y);
        };
        return InterfaceEmoteADV;
    }(PIXI.Container));
    exports.InterfaceEmoteADV = InterfaceEmoteADV;
    var Emote = (function (_super) {
        __extends(Emote, _super);
        function Emote(CODE) {
            var _this = _super.call(this, TFMAdventure_1.default.recupTextureDistante("interface/emote/T" + CODE + ".png")) || this;
            _this.posCibleX = 0;
            _this.posCibleY = 0;
            _this.enPauseJusqua = 0;
            _this.anchor.set(0.5, 0.5);
            _this.interactive = true;
            _this.buttonMode = true;
            _this.on("click", function () {
                InterfaceEmoteADV.fermer();
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.emoji(CODE));
            });
            _this.on("mouseover", function () {
                _this.filters = [Couleur_1.Couleur.filtreLumiere];
            });
            _this.on("mouseout", function () {
                _this.filters = null;
            });
            return _this;
        }
        return Emote;
    }(PIXI.Sprite));
});
//# sourceMappingURL=InterfaceEmoteADV.js.map