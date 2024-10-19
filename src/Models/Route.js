class Route {
  constructor(id, domiciliario, pedidos = [], estado) {
    this.id = id;
    this.domiciliario = domiciliario;
    this.pedidos = pedidos;
    this.estado = estado;
  }
}

export default Route;
