import { OrderTable } from "./components/OrderTable";
import { useOrders } from "./hooks/useOrders";

const OrderPage = () => {
  const { orders, updateStatus } = useOrders();

  return (
    <div>
      <h1>Pedidos</h1>

      <OrderTable
        orders={orders}
        onStatusChange={updateStatus}
      />
    </div>
  );
};

export default OrderPage;