// Допустимые статусы заказа
export type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled";

// Функция парсинга статуса из строки
export function parseStatus(raw: string): OrderStatus | null {
  if (raw === "new") return "new";
  if (raw === "processing") return "processing";
  if (raw === "shipped") return "shipped";
  if (raw === "delivered") return "delivered";
  if (raw === "cancelled") return "cancelled";
  return null;
}

// Функция проверки возможности перехода между статусами
export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  if (from === "new" && to === "processing") return true;
  if (from === "new" && to === "cancelled") return true;
  if (from === "processing" && to === "shipped") return true;
  if (from === "processing" && to === "cancelled") return true;
  if (from === "shipped" && to === "delivered") return true;
  return false;
}

// Функция получения списка доступных следующих статусов
export function getNextStatuses(current: OrderStatus): OrderStatus[] {
  if (current === "new") {
    return ["processing", "cancelled"];
  }
  if (current === "processing") {
    return ["shipped", "cancelled"];
  }
  if (current === "shipped") {
    return ["delivered"];
  }
  return [];
}