import { IPaymentLink } from "@/core/types";

export default function FilterTodayInvoices (invoices: IPaymentLink[]) {
  
  // Функция для преобразования строки даты в объект Date
  const parseCreatedAt = (createdAtString: string): Date => new Date(createdAtString);
  
  // Функция для получения ключа часа из объекта Date
  const getHourKey = (date: Date): string => {
      const hour = date.getHours().toString().padStart(2, '0');
      return `${hour}:00`;
  };
  
  // Получаем текущую дату и время
  const currentDate: Date = new Date();
  
  // Определяем начало текущего дня
  const startOfDay: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
  
  // Определяем конец текущего дня
  const endOfDay: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
  
  // Функция для проверки, был ли инвойс создан сегодня
  const isInToday = (invoice: IPaymentLink): boolean => {
      const invoiceDate: Date = parseCreatedAt(invoice.createdAt!);
      return invoiceDate >= startOfDay && invoiceDate <= endOfDay;
  };
  
  // Отфильтровываем инвойсы, созданные в последние 24 часа
  const invoicesInLast24Hours = invoices.filter((invoice) => isInToday(invoice));
  
  // Группируем инвойсы по часам за последние 24 часа
  const groupedInvoices: any = invoicesInLast24Hours.reduce((groups: any, invoice) => {
      const createdAtDate = parseCreatedAt(invoice.createdAt!);
      const hourKey = getHourKey(createdAtDate);
      if (!groups[hourKey]) {
          groups[hourKey] = [];
      }
      groups[hourKey].push(invoice);
      return groups;
  }, {});
  
      const hoursOfDay: string[] = [];
      for (let hour = 0; hour < 24; hour++) {
          const hourString = hour.toString().padStart(2, '0');
          hoursOfDay.push(`${hourString}:00`);
      }
  
      return hoursOfDay.map((hour) => {
          if (groupedInvoices[hour]) {
              return {
                  name: hour,
                  invoices: groupedInvoices[hour].length,
                  sales:  groupedInvoices[hour].filter((i: IPaymentLink) => i.invoiceId).length,
                  rejected: 0
              }
          } else {
              return {
                  name: hour,
                  invoices: 0,
                  sales:  0,
                  rejected: 0
              }
          }
      })
}