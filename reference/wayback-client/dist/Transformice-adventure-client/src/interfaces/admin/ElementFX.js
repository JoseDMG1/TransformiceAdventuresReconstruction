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
define(["require", "exports", "../../../../Souritheque-client/src/outils/limonadmin/Limonadmin", "../../../../Souritheque-client/src/outils/affichage/animation/ClipAnim"], function (require, exports, Limonadmin_1, ClipAnim_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ElementFX = (function (_super) {
        __extends(ElementFX, _super);
        function ElementFX() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ElementFX.prototype.deserialisation = function (DATA) {
            this.orientable = DATA.lBool();
            this.etirable = DATA.lBool();
            this.decalageEtirement = DATA.l16s();
            this.largeur = DATA.l16();
            this.clipAnim = new ClipAnim_1.ClipAnim(DATA);
        };
        ElementFX.prototype.serialisation = function (DATA) {
            DATA.eBool(this.orientable);
            DATA.eBool(this.etirable);
            DATA.e16(this.decalageEtirement);
            DATA.e16(this.largeur);
            this.clipAnim.serialisation(DATA);
        };
        return ElementFX;
    }(Limonadmin_1.ElementLimonadmin));
    exports.default = ElementFX;
});
//# sourceMappingURL=ElementFX.js.map