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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../_tfmAdventure/TFMAdventure"], function (require, exports, I_Conteneur_1, I_Image_1, TFMAdventure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceCarteMondeADV = (function (_super) {
        __extends(InterfaceCarteMondeADV, _super);
        function InterfaceCarteMondeADV() {
            var _this = _super.call(this) || this;
            _this.centrerAuto(0.5, "calc(50% - 15px)");
            var image = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/MAP_pinned.jpg"))
                .defLargeurMax("90vw").defHauteurMax("85vh").defCSS("objectFit", "contain");
            image.rendreCliquable(_this.retirer.bind(_this));
            _this.ajouterElementCentre(image);
            return _this;
        }
        InterfaceCarteMondeADV.afficher = function () {
            if (!InterfaceCarteMondeADV.instance) {
                InterfaceCarteMondeADV.instance = new InterfaceCarteMondeADV();
            }
            TFMAdventure_1.default.ajouterInterface(InterfaceCarteMondeADV.instance.elementHTML);
        };
        return InterfaceCarteMondeADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceCarteMondeADV;
});
//# sourceMappingURL=InterfaceCarteMondeADV.js.map