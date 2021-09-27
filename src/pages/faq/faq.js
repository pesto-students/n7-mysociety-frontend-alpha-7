import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import faqService from "../../services/faq";
import FaqItem from "./faqItem";
import "./faq.scss";
const FAQ = () => {
    const [faqs, setFaqs] = useState([]);

    const toggle = (faq) => {
        const tempFaq = [...faqs];
        faq.expanded = !faq.expanded;
        const index = tempFaq.findIndex((f) => f._id === faq._id);
        if (index >= 0) {
            tempFaq[index] = faq;
        }
        setFaqs(tempFaq);
    };

    useEffect(() => {
        faqService
            .getAllFaqs()
            .then((fs) => {
                console.log(fs);
                setFaqs(fs.data?.result);
            })
            .catch(() => {
                setFaqs([]);
            });
    }, []);
    return (
        <div className="wrapper">
            <DefaultLayout>
                <div className="faqs">
                    {faqs.map((faq) => {
                        return (
                            <FaqItem
                                {...faq}
                                key={faq?._id}
                                toggle={() => toggle(faq)}
                            />
                        );
                    })}
                </div>
            </DefaultLayout>
        </div>
    );
};

export default FAQ;
