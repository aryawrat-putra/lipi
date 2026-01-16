import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import DesktopPreview from "@/components/landing/desktop"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { ChevronRight, FilePen } from "lucide-react"

function Hero() {
    return (
        <main id="hero" className="w-full min-h-96 my-48 text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Write with structure. <br /> Think with clarity.
            </h1>
            <p className="text-xl leading-relaxed max-w-xl mx-auto">
                Lipi is the document editor built for focus. Structured like code,
                intelligent like AI, fast like your thoughts.
            </p>
            <Button className="mx-auto" asChild size='lg'>
                <Link to="/signup">Get Started </Link>
            </Button>

            <aside className="relative origin-bottom max-md:hidden">
                <DesktopPreview>
                    <img
                        src="https://placehold.co/1920x1080/f05023/fff/png"
                        className="w-full h-full object-cover z-10"
                        alt="Preview Image"
                    />
                </DesktopPreview>
                <div className="absolute -inset-px top-1/3 z-20 bg-linear-180 from-transparent to-background rounded-b-2xl py-4 pt-24">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <FilePen className="text-primary"/>
                            </EmptyMedia>
                            <EmptyTitle>Try live editor</EmptyTitle>
                            <EmptyDescription>Click on the button to use live text editor</EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button size={'sm'}>Try live <ChevronRight /></Button>
                        </EmptyContent>
                    </Empty>
                </div>
            </aside>
        </main>
    )
}

export default Hero