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
define(["require", "exports", "../../../Souritheque-client/src/outils/divers/CacheLocal801"], function (require, exports, CacheLocal801_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CLES_CACHE_ADV;
    (function (CLES_CACHE_ADV) {
        CLES_CACHE_ADV["EFFETS_EAU"] = "effet_eau";
        CLES_CACHE_ADV["EFFETS_LUMIERE"] = "effet_lumiere";
        CLES_CACHE_ADV["OPTIM_AUTO"] = "optim_auto";
        CLES_CACHE_ADV["VOLUME_GLOBAL"] = "volume_global";
        CLES_CACHE_ADV["VOLUME_MUSIQUE"] = "volume_musique";
        CLES_CACHE_ADV["VOLUME_FX"] = "volume_fx";
        CLES_CACHE_ADV["PLEIN_ECRAN"] = "fullscreen";
        CLES_CACHE_ADV["AFFICHER_PSEUDO_PRINCIPAL"] = "afficher_pseudo";
    })(CLES_CACHE_ADV || (CLES_CACHE_ADV = {}));
    var CacheLocalADV = (function (_super) {
        __extends(CacheLocalADV, _super);
        function CacheLocalADV() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CacheLocalADV.enregistrer = function (CLE, VALEUR) {
            _super.enregistrer.call(this, CLE, VALEUR.toString());
        };
        CacheLocalADV.recup = function (CLE) {
            return _super.recup.call(this, CLE);
        };
        CacheLocalADV.recupBooleen = function (CLE, VRAI_PAR_DEFAUT) {
            if (VRAI_PAR_DEFAUT === void 0) { VRAI_PAR_DEFAUT = true; }
            return VRAI_PAR_DEFAUT ? CacheLocalADV.recup(CLE) !== "false" : CacheLocalADV.recup(CLE) === "true";
        };
        CacheLocalADV.recupNombre = function (CLE) {
            return parseFloat(CacheLocalADV.recup(CLE));
        };
        CacheLocalADV.possede = function (CLE) {
            return _super.possede.call(this, CLE);
        };
        CacheLocalADV.CLES = Object.assign({}, CacheLocal801_1.default.CLES, CLES_CACHE_ADV);
        return CacheLocalADV;
    }(CacheLocal801_1.default));
    exports.default = CacheLocalADV;
});
//# sourceMappingURL=CacheLocalADV.js.map