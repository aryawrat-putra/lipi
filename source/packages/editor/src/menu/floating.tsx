import {
    FloatingMenu,
    FloatingMenuLabel,
    FloatingMenuItem,
    FloatingMenuGroup,
    FloatingMenuEmpty
} from './floating-reusable.js';
import { FloatingMenuItemsData } from '../constants/index.js';

type Props = {}

export default function Floating({ }: Props) {
    return (
        <FloatingMenu>
            <FloatingMenuLabel>Suggestions</FloatingMenuLabel>
            <FloatingMenuGroup isSideBySide>
                {FloatingMenuItemsData.length === 0 ? (
                    <FloatingMenuEmpty>No suggestions available</FloatingMenuEmpty>
                ) : (
                    FloatingMenuItemsData.map((item, idx) => (
                        <FloatingMenuItem
                            key={item.name}
                            autoFocus={idx === 0}
                            onSelect={() => console.log(`Selected: ${item.name}`)}
                        >
                            <item.icon />
                            {item.name}
                        </FloatingMenuItem>
                    ))
                )}
            </FloatingMenuGroup>
        </FloatingMenu>
    )
};
