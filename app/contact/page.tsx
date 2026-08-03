import React from "react";
import ContactForm from "./_components/ContactForm";


// 🚀 এখন এটি সার্ভার সাইডে সম্পূর্ণ বৈধ এবং বিল্ড ক্র্যাশ করবে না
export const dynamic = "force-dynamic"; 

export default function ContactPage() {
    return <ContactForm />;
}
