export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden border-t border-border py-20">
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
               <span className="select-none text-[20rem] font-semibold tracking-tight text-foreground/5 leading-none ">lipi</span>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} lipi.ai. All rights reserved.
                </p>
            </div>
        </footer>

    )
}
