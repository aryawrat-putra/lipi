import { ToggleGroup, ToggleGroupItem } from "@repo/ui/components/toggle-group"
import { Button } from "@repo/ui/components/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@repo/ui/components/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@repo/ui/components/dropdown-menu"
import { Undo, Redo, Printer, SpellCheck, Minus, Plus, Bold, Italic, Underline, Highlighter, Link, Image, AlignLeft, AlignCenter, AlignRight, MoreHorizontal, MessageSquarePlus, ListChevronsDownUp, ListTodo, ListChecks, Dot, CircleDot, Square, ArrowBigRight, Star, ListIndentIncrease, ListIndentDecrease, EllipsisVertical, FilePenLine, ArrowDownToLine } from "lucide-react"
import { Separator } from "@repo/ui/components/separator"
import { ButtonGroup } from "@repo/ui/components/button-group"
import { CollapsibleTrigger } from "@repo/ui/components/collapsible"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover"
import { useLayoutEffect, useRef, useState, ReactElement } from "react"

const allEditToolbars: { id: string; element: ReactElement }[] = [
    {
        id: 'undo-redo-print-spellcheck',
        element: <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm"><Undo /></Button>
            <Button variant="ghost" size="sm"><Redo /></Button>
            <Button variant="ghost" size="sm"><Printer /></Button>
            <Button variant="ghost" size="sm"><SpellCheck /></Button>
        </div>
    },
    {
        id: 'separator-1',
        element: <Separator orientation="vertical" className="mx-1 min-h-8" />
    },
    {
        id: 'zoom-level',
        element: <Select defaultValue="100%">
            <SelectTrigger className="min-w-fit" size="sm">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="50%">50%</SelectItem>
                <SelectItem value="75%">75%</SelectItem>
                <SelectItem value="100%">100%</SelectItem>
                <SelectItem value="125%">125%</SelectItem>
                <SelectItem value="150%">150%</SelectItem>
            </SelectContent>
        </Select>
    },
    {
        id: 'separator-2',
        element: <Separator orientation="vertical" className="mx-1 min-h-8" />
    },
    {
        id: 'text-style',
        element: <Select defaultValue="normal">
            <SelectTrigger className="min-w-fit" size="sm">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="normal">Normal text</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="subtitle">Subtitle</SelectItem>
            </SelectContent>
        </Select>
    },
    {
        id: 'font-family',
        element: <Select defaultValue="arial">
            <SelectTrigger className="min-w-fit" size="sm">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="arial">Arial</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="inter">Inter</SelectItem>
            </SelectContent>
        </Select>
    },
    {
        id: 'font-size',
        element: <ButtonGroup>
            <Button variant="outline" size="sm"><Minus /></Button>
            <Button variant="secondary" size="sm">12</Button>
            <Button variant="outline" size="sm"><Plus /></Button>
        </ButtonGroup>
    },
    {
        id: 'separator-3',
        element: <Separator orientation="vertical" className="mx-1 min-h-8" />
    },
    {
        id: 'text-formatting',
        element: <ToggleGroup type="multiple" className="flex gap-1" size='sm'>
            <ToggleGroupItem size="sm" value="bold"><Bold /></ToggleGroupItem>
            <ToggleGroupItem size="sm" value="italic"><Italic /></ToggleGroupItem>
            <ToggleGroupItem size="sm" value="underline"><Underline /></ToggleGroupItem>
            <ToggleGroupItem size="sm" value="highlight"><Highlighter /></ToggleGroupItem>
        </ToggleGroup>
    },
    {
        id: 'separator-4',
        element: <Separator orientation="vertical" className="mx-1 min-h-8" />
    },
    {
        id: 'insert-media',
        element: <div className="flex gap-1">
            <Button variant="ghost" size="sm"><Link /></Button>
            <Button variant="ghost" size="sm"><MessageSquarePlus /></Button>
            <Button variant="ghost" size="sm"><Image /></Button>
        </div>
    },
    {
        id: 'separator-5',
        element: <Separator orientation="vertical" className="mx-1 min-h-8" />
    },
    {
        id: 'text-alignment',
        element: <Select defaultValue='left'>
            <SelectTrigger className="min-w-fit" size="sm">
                <SelectValue placeholder="Alignment" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem defaultChecked value="left"><AlignLeft /></SelectItem>
                <SelectItem value="center"><AlignCenter /></SelectItem>
                <SelectItem value="right"><AlignRight /></SelectItem>
            </SelectContent>
        </Select>
    },
    {
        id: 'separator-6',
        element: <Separator orientation="vertical" className="mx-1 min-h-8" />
    },
    {
        id: 'line-spacing',
        element: <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm"><ListChevronsDownUp /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value='none'>
                    <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="1.15">1.15</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="1.50">1.50</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="double">Double</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    },
    {
        id: 'checklist-type',
        element: <Select defaultValue='circle-list'>
            <SelectTrigger className="min-w-fit" size="sm">
                <SelectValue placeholder="Check List type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="circle-list"><ListChecks /></SelectItem>
                <SelectItem value="square-list"><ListTodo /></SelectItem>
            </SelectContent>
        </Select>
    },
    {
        id: 'unordered-list-type',
        element: <Select defaultValue='circleDot'>
            <SelectTrigger className="min-w-fit" size="sm">
                <SelectValue placeholder="Unordered List type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="dot"><Dot /></SelectItem>
                <SelectItem value="circleDot"><CircleDot /></SelectItem>
                <SelectItem value="square"><Square /></SelectItem>
                <SelectItem value="arrowBigRight"><ArrowBigRight /></SelectItem>
                <SelectItem value="star"><Star /></SelectItem>
            </SelectContent>
        </Select>
    },
    {
        id: 'ordered-list-type',
        element: <Select defaultValue='1'>
            <SelectTrigger className="min-w-fit" size="sm">
                <SelectValue placeholder="Order List Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem defaultChecked value="1">1</SelectItem>
                <SelectItem defaultChecked value="A">A</SelectItem>
                <SelectItem value="a">a</SelectItem>
                <SelectItem value="I">I</SelectItem>
                <SelectItem value="i">i</SelectItem>
            </SelectContent>
        </Select>
    },
    {
        id: 'indentation',
        element: <ButtonGroup>
            <Button variant="outline" size="sm"><ListIndentIncrease /></Button>
            <Button variant="outline" size="sm"><ListIndentDecrease /></Button>
        </ButtonGroup>
    },
    {
        id: 'separator-7',
        element: <Separator orientation="vertical" className="mx-1 min-h-8" />
    },
    {
        id: 'more-options',
        element: <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm"><MoreHorizontal /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Clear formatting</DropdownMenuItem>
                <DropdownMenuItem>Page setup</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    }
]

export default function DocEditor() {
    const [visibleCount, setVisibleCount] = useState(allEditToolbars.length);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const calculateVisibleItems = () => {
            if (!containerRef.current || !itemsRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const popoverButtonWidth = 40; // Approximate width of the popover button
            const availableWidth = containerWidth - popoverButtonWidth;

            const items = itemsRef.current.children;
            let totalWidth = 0;
            let idx = 0;

            for (let i = 0; i < items.length; i++) {
                const itemWidth = items[i].getBoundingClientRect().width + 8; // Adding gap
                if (totalWidth + itemWidth <= availableWidth) {
                    totalWidth += itemWidth;
                    idx++;
                } else {
                    break;
                }
            }

            setVisibleCount(idx);
        };

        // Initial calculation
        calculateVisibleItems();

        // Recalculate on window resize
        const handleResize = () => {
            calculateVisibleItems();
        };

        window.addEventListener('resize', handleResize);

        // Use ResizeObserver for more accurate container size changes
        const resizeObserver = new ResizeObserver(calculateVisibleItems);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
        };
    }, []);

    const visibleItems = allEditToolbars.slice(0, visibleCount);
    const overflowItems = allEditToolbars.slice(visibleCount);

    return (
        <div className="flex items-center gap-2 rounded-full px-4 py-2 shadow border justify-center flex-wrap">
            <div className="w-full flex flex-nowrap items-center gap-2 px-4 py-2 justify-between">
                <div ref={containerRef} className="flex items-center gap-2 flex-nowrap max-w-full flex-1 overflow-x-hidden">
                    <div ref={itemsRef} className="flex items-center gap-2 flex-nowrap">
                        {visibleItems.map((ele) => (
                            <span key={ele.id} id={ele.id} className="inline-flex">
                                {ele.element}
                            </span>
                        ))}
                    </div>

                    {overflowItems.length > 0 && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='secondary' size='sm' className="ml-auto">
                                    <EllipsisVertical className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" align="end" className="w-fit max-w-svw md:max-w-lg">
                                <div className="flex flex-wrap gap-2 p-2">
                                    {overflowItems.map((ele) => (
                                        <span key={ele.id} id={ele.id}>
                                            {ele.element}
                                        </span>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                </div>

                <div className="flex flex-nowrap gap-3 items-center">
                    <Separator orientation="vertical" className="mx-1 min-h-8" />
                    <Button variant='outline' size='sm'><FilePenLine /></Button>
                    <CollapsibleTrigger asChild>
                        <Button variant='ghost' size='sm' className="[&[data-state=open]>svg]:rotate-180 "><ArrowDownToLine className="transition-transform duration-200" /></Button>
                    </CollapsibleTrigger>
                </div>
            </div>
        </div>
    )
}
