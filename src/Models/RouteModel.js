import {
  deleteRoute,
  updateStatusRoute,
  updateDomiciliaryRoute,
  updateTotalRoute,
  updateRoute_idRequest,
} from "../supabase/crudFunctions";

class RouteModel {
  constructor({
    route_id,
    domiciliary,
    time,
    status,
    date,
    requests = [],
    total,
  }) {
    this.route_id = route_id;
    this.domiciliary = domiciliary;
    this.time = time;
    this.status = status;
    this.date = date;
    this.requests = requests;
    this.total = total;
  }

  async editDomicliary(newId) {
    await updateDomiciliaryRoute({ id: this.route_id, newDomiciliary: newId });
  }

  async editStatus(newStatus) {
    await updateStatusRoute({ id: this.route_id, newStatus: newStatus });
  }

  async deleteRoute() {
    await deleteRoute({ id: this.route_id });
  }

  //!Funcion auxiliar (usada en editRequests)
  calculateTotal(newRequests) {
    return newRequests.reduce((acc, req) => acc + req.ConCuantoPago, 0);
  }

  //!Funcion auxiliar (usada en editRequests)
  areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    return arr1.every((obj1) => {
      return arr2.some((obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
      });
    });
  }

  async editRequests(newRequests) {
    //Validamos si los requestList son iguales
    if (this.areArraysEqual(this.requests, newRequests)) {
      console.log("Los arrays de requests son iguales");
    } else {
      let requestsEliminadas = this.requests.filter(
        (req) => !newRequests.includes(req)
      );

      if (requestsEliminadas.length > 0) {
        requestsEliminadas.forEach(async (req) => {
          await updateRoute_idRequest({ id: req.request_id, routeId: null });
        });
      }

      let requestsAnadidas = newRequests.filter(
        (req) => !this.requests.includes(req)
      );

      if (requestsAnadidas.length > 0) {
        requestsAnadidas.forEach(async (req) => {
          await updateRoute_idRequest({
            id: req.request_id,
            routeId: this.route_id,
          });
        });
      }

      await updateTotalRoute({
        id: this.route_id,
        newTotal: this.calculateTotal(newRequests),
      });
    }
  }
}

export default RouteModel;
