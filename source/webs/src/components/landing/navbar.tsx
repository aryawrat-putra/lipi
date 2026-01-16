import Logo from '@/components/non-interactive/logo';
import { Button } from '@/components/ui/button';
import XDotCom from '@/components/icons/XDotCom';
import Github from '@/components/icons/Github';
import { Link } from '@tanstack/react-router';

export default function Navbar() {
    return (
        <nav className='fixed top-2 md:top-6 left-0 w-full grid place-items-center z-50'>
            <div className='px-4 py-4 md:px-6 md:py-4 shadow-2xl border border-border w-full max-w-2xl md:min-w-4xl bg-accent rounded-xl flex justify-between'>
                <a href={'#hero'}>
                    <Logo />
                </a>
                <ul className='flex flex-nowrap max-sm:hidden gap-2 md:gap-4 items-center'>
                    <li>
                        <Button variant='ghost'>
                            <a href={'#features'}>Features</a>
                        </Button>
                    </li>
                    <li>
                        <Button variant='ghost'>
                            <a href={'#faqs'}>Solutions</a>
                        </Button>
                    </li>
                    <li>
                        <Button variant='ghost'>
                            <a href={''}>Resources</a>
                        </Button>
                    </li>
                    <li>
                        <Button variant='ghost'>
                            <a href={'#pricing'}>Pricing</a>
                        </Button>
                    </li>
                </ul>
                <ol className='max-md:hidden flex flex-nowrap gap-6 items-center'>
                    <Button asChild variant={'outline'} size={'icon-sm'}>
                        <a target='_blank' href="https://x.com/anup_in_"><XDotCom /></a>
                    </Button>
                    <Button asChild variant={'outline'} size={'icon-sm'}>
                        <a target='_blank' href="https://github.com/aryawrat-putra/lipi/"><Github /></a>
                    </Button>
                </ol>
                <Button className="sm:hidden" asChild size='lg'>
                    <Link to="/signup">Get Started </Link>
                </Button>
            </div>
        </nav>
    )
}
