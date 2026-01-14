import { FloatingMenu, FloatingMenuLabel, FloatingMenuItem, FloatingMenuGroup } from '@/components/ui/floating-menu';

type Props = {}

export default function Floating({ }: Props) {
    return (
        <FloatingMenu>
            <FloatingMenuLabel>Suggestions</FloatingMenuLabel>
            <FloatingMenuGroup isSideBySide>
                <FloatingMenuItem
                    autoFocus={true}
                    onSelect={() => console.log(`Selected: Paragraph`)}
                >
                    Paragraph
                </FloatingMenuItem>
            </FloatingMenuGroup>
        </FloatingMenu>
    )
};
