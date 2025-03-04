import { deleteRoute, updateStatusRoute } from "../supabase/crudFunctions";

class RouteModel {
  constructor({route_id, domicilary, time, estatus, date, requests = [], total}) {
    this.route_id = route_id;
    this.domicilary = domicilary;
    this.time = time;
    this.estatus = estatus;
    this.date = date;
    this.requests = requests;
    this.total = total;
  }

  calculateTotal(newRequests) {
    return newRequests.reduce((acc, req) => acc + req.ConCuentoPago, 0);
  }

  async editDomicliary(newId) {
    
  }

  async editStatus(newStatus) {
    await updateStatusRoute(this.route_id, newStatus);
  }

  async editRequests(newRequests) {

    //Validamos si los requestList son iguales
    if (true) {
      
    }else {
      // request eliminadas
      requestsEliminadas = this.requests.filter((req) => !newRequests.includes(req));
      // request añadidas
      requestsAnadidas = newRequests.filter((req) => !this.requests.includes(req));
    }
    
  }

  async deleteRoute() {
    
  }


}

export default Route;
