import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    IconButton,
    AddIcon,
    RemoveIcon
} from "../../shared";

export default function FaqItem({ question, answer, toggle, expanded }) {
    return (
        <Accordion className="faq-item" onChange={() => toggle()}>
            <AccordionSummary>
                <div className="faq-header">
                    <div>
                        <Typography variant="subtitle1">{question}</Typography>
                    </div>
                    <div>
                        <IconButton>
                            {expanded ? <RemoveIcon /> : <AddIcon />}
                        </IconButton>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{answer}</Typography>
            </AccordionDetails>
        </Accordion>
    );
}
