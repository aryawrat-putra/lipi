import { Check, MoveUpRight, Tag } from "lucide-react";
import SectionContainer from "./section-container";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { lipiPremiumFeatures } from "@/helpers/constants";

export default function Pricing() {
    return (
        <section id='pricing' className="space-y-8">
            <SectionContainer
                BadgeIcon={Tag}
                badge="Pricing"
                headline="Get just one or get ’em all."
                subheading="Get free updates for all templates and components, with unlimited use on personal and commercial projects."
            />

            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-fit rounded-4xl border border-border p-8 flex flex-col justify-between bg-card space-y-8">
                    <div>
                        <p className="text-sm text-muted-foreground mb-4">Lipi Free</p>
                        <div className="flex items-baseline gap-2 mb-6">
                            <h2 className="text-4xl font-semibold">$0</h2>
                            <span className="text-sm text-muted-foreground">forever</span>
                        </div>
                        <ul className="space-y-4 text-sm text-foreground">
                            {[
                                'Basic Indic typing support',
                                'Limited language conversions',
                                'Core text formatting tools',
                                'Community updates'
                            ].map((l, idx) => {
                                return (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span className="text-muted-foreground text-sm leading-4">{l}</span>
                                    </li>

                                )
                            })}
                        </ul>
                    </div>
                    <Button variant='secondary' size='lg' asChild>
                        <Link to="/signup">Get started <MoveUpRight /></Link>
                    </Button>
                    <p className="text-xs text-muted-foreground">Free forever. No credit card required.</p>
                </div>

                <div className="rounded-4xl border border-border bg-card text-card-foreground p-8 shadow-2xl flex flex-col justify-between  space-y-8">
                    <p className="text-sm text-primary mb-4">Get Lipi.ai All-Access</p>

                    <div className="flex items-baseline gap-2 mb-6">
                        <h2 className="text-4xl font-semibold">$19</h2>
                        <span className="text-sm text-muted-foreground">per month</span>
                    </div>

                    <Button variant='default' size='lg' asChild>
                        <Link to="/signup">Get All Access <MoveUpRight /></Link>
                    </Button>

                    <div className="space-y-6 text-sm">
                        {lipiPremiumFeatures.map((feat) => {
                            return (
                                <div className="flex gap-4" key={feat.name}>
                                    <feat.icon className="text-primary size-7" />
                                    <p>
                                        <strong>{feat.name}</strong> — {feat.shortDetail}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </section>
    )
}
