// Тип состояния банковского счёта (Discriminated Union)
// Поле status — это "метка", по которой компилятор понимает, какой вариант передан
export type AccountState =
  | { status: "active"; balance: number }
  | { status: "frozen"; balance: number; reason: string }
  | { status: "closed"; closedAt: string };

// Функция проверки возможности снятия средств
// Возвращает true только если счёт активен
export function canWithdraw(state: AccountState): boolean {
  if (state.status === "active") {
    return true;
  }
  return false;
}

// Функция получения описания состояния
// Для active: "Счёт активен. Баланс: <balance> руб."
// Для frozen: "Счёт заморожен. Причина: <reason>. Баланс: <balance> руб."
// Для closed: "Счёт закрыт с <closedAt>"
export function getStatusMessage(state: AccountState): string {
  if (state.status === "active") {
    return `Счёт активен. Баланс: ${state.balance} руб.`;
  }
  if (state.status === "frozen") {
    return `Счёт заморожен. Причина: ${state.reason}. Баланс: ${state.balance} руб.`;
  }
  return `Счёт закрыт с ${state.closedAt}`;
}

// Функция заморозки счёта
// Принимает активный счёт и причину, возвращает замороженный счёт
// Если счёт не активен — возвращает его без изменений
export function freezeAccount(state: AccountState, reason: string): AccountState {
  if (state.status === "active") {
    return {
      status: "frozen",
      balance: state.balance,
      reason: reason
    };
  }
  return state;
}