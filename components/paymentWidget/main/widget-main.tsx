import { useWidgetContext } from "../widget-provider";
import ProductInfo from "./productInfo";
import PaymentMethods from "./selectPaymentMethod";

export default function WidgetMainPage () {

    const {paymentLink} = useWidgetContext()

    return (
        <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-start h-full">
          <div className="flex flex-col justify-between h-full w-full pt-4 px-4">
            {paymentLink?.data?.productId && <ProductInfo />}
            <PaymentMethods />
          </div>
        </div>
      </div>
    </div>
    )
}