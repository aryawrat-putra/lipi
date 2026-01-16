import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { lipiFaqs } from "@/helpers/constants"
import { CircleQuestionMark } from "lucide-react"

export default function Faqs() {
    return (
        <section id='faqs' className="flex flex-wrap md:flex-nowrap justify-between gap-8">
            <div className="w-full md:w-1/3">
                <Badge variant="outline" className="text-sm text-muted-foreground bg-muted shadow-xl border border-border">
                    <CircleQuestionMark />
                    F.A.Q
                </Badge>
                <h1 className="mt-4 text-5xl leading-14 -tracking-wider font-semibold text-pretty mx-auto text-gray-900">Frequently Asked Questions.</h1>
                <p className="mt-2 text-lg text-muted-foreground tracking-wide">Get answers to commonly asked questions.</p>
            </div>
            <div className="w-full md:flex-1">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                >
                    {lipiFaqs.map((faq) => {
                        return (
                            <AccordionItem value={faq.id}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}

                </Accordion>
            </div>
        </section>
    )
}
