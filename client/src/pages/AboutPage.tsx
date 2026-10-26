import { useState, type FormEvent } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import api from "../config/api";
import useNotification from "../context/NotificationContext";
import sunriseImage from "../assets/Sunrise.jpg"

interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function AboutPage() {
    const [formData, setFormData] = useState<ContactForm>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const {notify} = useNotification()

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(false);

        try {
            const response = await api.post("/api/contact", formData);

            setSubmitted(true);

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
            notify({
                type:"success",
                message:"Message sent successfully"
            })
            console.log(response.data.message);
        } catch (error) {
            console.error("Failed to submit contact form:", error);
            notify({
                type: "error",
                message: "Unable to send your message. Please try again."
            })
    }

        // Connect this handler to your backend contact API.
        // This demo confirms submission locally only.
        setSubmitted(true);
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    }

    return (
        <>
            <NavBar />

            <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">

                    {/* Hero */}
                    <section className="mx-auto mb-12 max-w-3xl text-center">
                        <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
                            About Us
                        </span>

                        <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            Shopping made
                            <span className="text-blue-600"> simple.</span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                            ECOMMY brings your favorite products together in one
                            place, with a focus on convenient shopping, transparent
                            pricing, and a smooth checkout experience.
                        </p>
                    </section>

                    {/* Mission */}
                    <section className="mb-12 grid items-center gap-8 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 md:grid-cols-2">
                        <div>
                            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
                                Our Mission
                            </p>

                            <h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl">
                                A better way to shop online
                            </h2>

                            <p className="mb-4 leading-7 text-gray-600">
                                We believe online shopping should be straightforward.
                                Finding a product, comparing options, and placing an
                                order should feel effortless.
                            </p>

                            <p className="leading-7 text-gray-600">
                                ECOMMY is designed to make browsing, managing your
                                cart, and checking out a seamless experience from
                                start to finish.
                            </p>
                        </div>

                        <div
                            className="flex min-h-64 items-center justify-center rounded-xl bg-cover bg-center p-8 text-center text-white"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.4)), url(${sunriseImage})`,
                            }}
                        >
                            <div>
                                <div className="mb-5 text-5xl font-black tracking-tight drop-shadow-lg">
                                    ECOMMY
                                </div>

                                <p className="text-lg font-medium text-white drop-shadow-md">
                                    Your everyday shopping destination
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section className="mb-14">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                What makes us different?
                            </h2>
                            <p className="mt-3 text-gray-600">
                                Built around a better shopping experience.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-6 w-6"
                                    >
                                        <path d="M3 7h18l-2 13H5L3 7Z" />
                                        <path d="M8 7a4 4 0 0 1 8 0" />
                                    </svg>
                                </div>

                                <h3 className="mb-2 text-lg font-bold text-gray-900">
                                    Easy Shopping
                                </h3>
                                <p className="leading-7 text-gray-600">
                                    Browse products, explore categories, and find
                                    what you need without unnecessary complexity.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-6 w-6"
                                    >
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <path d="M3 10h18M7 15h4" />
                                    </svg>
                                </div>

                                <h3 className="mb-2 text-lg font-bold text-gray-900">
                                    Smooth Checkout
                                </h3>
                                <p className="leading-7 text-gray-600">
                                    A streamlined checkout flow designed to help you
                                    place orders with less hassle.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:col-span-2 lg:col-span-1">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-6 w-6"
                                    >
                                        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </div>

                                <h3 className="mb-2 text-lg font-bold text-gray-900">
                                    Customer First
                                </h3>
                                <p className="leading-7 text-gray-600">
                                    We aim to provide a reliable, clear, and
                                    convenient experience at every step.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Form */}
                    <section
                        id="contact"
                        className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10"
                    >
                        <div className="mb-8">
                            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
                                Contact Us
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                Get in touch
                            </h2>

                            <p className="mt-3 leading-7 text-gray-600">
                                Have a question about an order, a product, or your
                                shopping experience? Send us a message.
                            </p>
                        </div>

                        {submitted && (
                            <div
                                role="status"
                                className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                            >
                                Your message has been received successfully. Our team will review your inquiry.
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Send Message
                            </button>
                        </form>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}