import { faker } from "@faker-js/faker";

export default function InvoiceItem() {

  const date = new Date().toLocaleString('en-US', { timeZone: 'UTC' }).replace(',', '');

  const title = faker.commerce.productName();
  const img = faker.image.imageUrl(120, 120, "products", true);
  const price = faker.number.int({min: 10, max: 100});
  const random = faker.number.int({min: 0, max: 100});

  return (
    <div className="flex flex-col">
        <p className="text-xs text-neutral-500">{date.toLocaleString()}</p>
        <div className="flex justify-between w-full p-2 border items-end rounded-lg mt-1 bg-zinc-950/50">
        <div className="flex space-x-4 w-52 items-center">
            <img src={img} className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-lg bg-zinc-800 object-cover" />
            <div className="flex flex-col w-full">
            <p className="font-bold text-neutral-300 line-clamp-1">{title}</p>
            <div className="flex space-x-2 items-center">
            <svg className="animate-spin h-2 w-2 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
            <p className="text-xs text-orange-400">Pending</p>
            </div>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <p className="text-neutral-300">+ ${price}</p>
            <p className="text-xs text-neutral-500">{(price / 41660).toFixed(6)} BTC</p>
        </div>
        </div>
    </div>
  );
}
