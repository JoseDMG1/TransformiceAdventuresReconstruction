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
    var ElementMonstre = (function (_super) {
        __extends(ElementMonstre, _super);
        function ElementMonstre() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ElementMonstre.prototype.deserialisation = function (DATA) {
            this.clipAnim = new ClipAnim_1.ClipAnim(DATA);
            this.comportement = DATA.lChaine();
            this.hauteurClipNom = DATA.l16();
            this.largeurOmbre = DATA.l16();
            this.sonBoucle = DATA.lChaine();
            this.volumeSon = "" + DATA.l8();
            this.bibliothequeSon = DATA.l16();
        };
        ElementMonstre.prototype.serialisation = function (DATA) {
            this.clipAnim.serialisation(DATA);
            DATA.eChaine(this.comportement);
            DATA.e16(this.hauteurClipNom);
            DATA.e16(this.largeurOmbre);
            DATA.eChaine(this.sonBoucle);
            DATA.e8(this.volumeSon ? parseInt(this.volumeSon) : 100);
            DATA.e16(this.bibliothequeSon);
        };
        return ElementMonstre;
    }(Limonadmin_1.ElementLimonadmin));
    exports.default = ElementMonstre;
});
//# sourceMappingURL=ElementMonstre.js.map