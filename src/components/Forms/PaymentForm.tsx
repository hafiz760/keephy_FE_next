import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux/store/store";
import { createSubscription } from "@/Redux/slices/planSlice";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import LoaderIcon from "@/assets/icons/LoaderIcon";
import { useRouter } from "next/navigation";

const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
  iconStyle: "solid", // Explicitly "solid" or "default"
  hidePostalCode: true,
  style: {
    base: {
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "red",
    },
  },
};

const CardPaymentForm = ({ planId, setModalOpen }: { planId: any, setModalOpen: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: any) => state?.plans?.isCreateSubscriptionLoading);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast.error("Payment information not found.");
      return;
    }

    const paymentMethod = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentMethod.error) {
      console.log(paymentMethod.error.message);
      toast.error(paymentMethod.error.message);
    } else {
      const data = {
        planId: planId,
        payment_method: paymentMethod?.paymentMethod?.id,
      };
      // console.log(data);
      dispatch(createSubscription({ data, setModalOpen, router }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={CARD_ELEMENT_OPTIONS}
        className="border border-[#EDEDED] h-14 p-4 rounded-xl bg-white text-base"
      />
      <div className="flex items-center justify-center mt-8">
        <button
          disabled={isLoading}
          type="submit"
          className={`z-10 py-3 px-6 rounded-full flex items-center justify-center gap-1 text-base bg-black text-white w-44`}
        >
          {isLoading ? <LoaderIcon /> : "Subscribe Now"}
        </button>
      </div>
    </form>
  );
};

export default CardPaymentForm;
