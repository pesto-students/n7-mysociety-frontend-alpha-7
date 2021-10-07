import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import faqService from "../../services/faq";
import FaqItem from "./faqItem";
import { SpinnerLoader } from "../../shared";
import "./faq.scss";
export default function FAQ() {
    const [faqs, setFaqs] = useState([]);
    const [isFaqLoading, setFaqLoader] = useState(false);
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
        setFaqLoader(true);
        faqService
            .getAllFaqs()
            .then((fs) => {
                console.log(fs);
                setFaqs(fs.data?.result);
                setFaqLoader(false);
            })
            .catch(() => {
                setFaqs([]);
                setFaqLoader(false);
            });
        return () => {
            setFaqs([]);
        };
    }, []);
    return (
        <div className="wrapper">
            <DefaultLayout>
                <SpinnerLoader show={isFaqLoading} fullScreen={true}>
                    <div className="faqs" data-testid="all_faqs_items">
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
                </SpinnerLoader>
            </DefaultLayout>
        </div>
    );
}
