import { Rocket } from "lucide-react";
import SectionContainer from "./section-container";
import FeatureCard from "./feature-card";
import { lipiFeatures } from "@/helpers/constants";
import DesktopPreview from "./desktop";
import { useState } from "react";

export default function Features() {
    const [featSelected, setFeatSelected] = useState<number>(0);

    return (
        <section id="features" className="space-y-8">
            <SectionContainer
                BadgeIcon={Rocket}
                badge="Core Features"
                headline="What's inside Lipi?"
                subheading="10+ flexible components with developer-friendly, comprehensive codebase for rapid development."
            />
            <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 items-center">
                {lipiFeatures.slice(0, 4).map((feat, idx) => (
                    <FeatureCard
                        {...feat}
                        key={idx}
                        index={idx}
                        selected={featSelected === idx}
                        select={setFeatSelected}
                    />
                ))}
            </div>
            <span className="max-md:hidden">
                <DesktopPreview>
                    <img
                        src={`https://placehold.co/1920x1080/f7f7f7/a8a8a8/png?font=Source%20Sans%20Pro&text=${lipiFeatures[featSelected].title}`}
                        className="w-full h-full object-cover z-10"
                        alt="Preview Image"
                    />
                </DesktopPreview>
            </span>
            <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 items-center">
                {[...lipiFeatures.slice(4)].map((feat, idx) => {
                    return (
                        <FeatureCard
                            {...feat}
                            key={idx}
                            index={idx + 4}
                            selected={featSelected === idx + 4}
                            select={setFeatSelected}
                        />
                    )
                })}
            </div>
        </section>
    )
}
