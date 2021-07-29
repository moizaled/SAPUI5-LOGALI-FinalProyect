// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup11.Employees1.controller.Main", {

            onAfterRendering: function () {
                // Error en el framework : Al agregar la dirección URL de "Firmar pedidos", el componente GenericTile debería navegar directamente a dicha URL,
                // pero no funciona en la version 1.78. Por tanto, una solución  encontrada es eliminando la propiedad id del componente por jquery
                var genericTileFirmarPedido = this.byId("linkFirmarPedido");
                //Id del dom
                var idGenericTileFirmarPedido = genericTileFirmarPedido.getId();
                //Se vacia el id
                jQuery("#" + idGenericTileFirmarPedido)[0].id = "";
            },

            onInit: function () {


            },

            onCreateEmployee: function (oEvent) {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RoutecreateEmployee");


            },

            onSearchEmployee: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //    sap.ui.getCore().byId("ViewEmployee").getModel("finalProjectModel").refresh(true);
                oRouter.navTo("RouteshowEmployee");

            },

            onSignSalesOrder: function (oEvent) {

                //                window.open("https://workspaces-ws-pncld-app5.us10.trial.applicationstudio.cloud.sap/logaligroup10Employees/index.html");

            }

        });
    });
