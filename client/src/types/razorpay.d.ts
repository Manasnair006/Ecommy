export {};

declare global {
    interface Window {
        Razorpay?: new (
            options: RazorpayOptions
        ) => RazorpayInstance;
    }

    interface RazorpayOptions {
        key: string;
        amount: number;
        currency: string;
        name: string;
        description?: string;
        order_id: string;
        prefill?: {
            name?: string;
            contact?: string;
        };
        handler: (response: RazorpayPaymentResponse) => void;
        modal?: {
            ondismiss?: () => void;
        };
        theme?: { color?: string };
    }

    interface RazorpayPaymentResponse {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }

    interface RazorpayInstance {
        open(): void;
        on(
            event: "payment.failed",
            callback: (response: {
                error: {
                    description?: string;
                    code?: string;
                };
            }) => void
        ): void;
    }
}