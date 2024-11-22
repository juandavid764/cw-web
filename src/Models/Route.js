class Route {
  constructor(id, domiciliario, pedidos = [], estado) {
    this.id = id;
    this.domiciliario = domiciliario;
    this.pedidos = pedidos;
    this.estado = estado;
  }

  addPedido(pedido) {
    this.pedidos.push(pedido);
  }

  removePedido(pedido) {
    this.pedidos = this.pedidos.filter((p) => p.id !== pedido.id);
  }
}

export default Route;
