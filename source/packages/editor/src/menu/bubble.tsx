import { FloatingMenu, FloatingMenuGroup } from './floating-reusable.js';

import { ToggleGroup, ToggleGroupItem } from "@repo/ui/components/toggle-group"
import { Button } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import { Bold, Italic, Underline, Highlighter, Strikethrough, Eraser, AlignLeft, AlignCenter, AlignRight, ListIndentIncrease, ListIndentDecrease } from "lucide-react"

type Props = {}

export default function Bubble({ }: Props) {
    return (
        <FloatingMenu>
            <FloatingMenuGroup isSideBySide>
                <ToggleGroup type="multiple" className="flex gap-1" size='sm'>
                    <ToggleGroupItem size="sm" value="bold" title="Bold"><Bold /></ToggleGroupItem>
                    <ToggleGroupItem size="sm" value="italic" title="Italic"><Italic /></ToggleGroupItem>
                    <ToggleGroupItem size="sm" value="underline" title="Underline"><Underline /></ToggleGroupItem>
                    <ToggleGroupItem size="sm" value="strikethrough" title="Strikethrough"><Strikethrough /></ToggleGroupItem>
                    <ToggleGroupItem size="sm" value="highlight" title="Highlight"><Highlighter /></ToggleGroupItem>
                </ToggleGroup>
                <Button size="icon" variant='ghost' value="clear-formatting" title="Clear formatting" ><Eraser /></Button>

                <ToggleGroup type="multiple" className="flex gap-1" size='sm' defaultValue={['left']}>
                    <ToggleGroupItem size="sm" value="left" title='Left Align'><AlignLeft /></ToggleGroupItem>
                    <ToggleGroupItem size="sm" value="center" title='Center Align'><AlignCenter /></ToggleGroupItem>
                    <ToggleGroupItem size="sm" value="right" title='Right Align'><AlignRight /></ToggleGroupItem>
                </ToggleGroup>

                <ButtonGroup>
                    <Button variant="outline" size="sm" title='Increase indent'><ListIndentIncrease /></Button>
                    <Button variant="outline" size="sm" title='Decrease indent'><ListIndentDecrease /></Button>
                </ButtonGroup>
            </FloatingMenuGroup>
        </FloatingMenu>
    )
};
