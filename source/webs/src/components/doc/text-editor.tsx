import { Editor, EditorContent } from '@tiptap/react'
import { FloatingMenu as FloatingMenuComponent, BubbleMenu } from '@tiptap/react/menus'

import Floating from '@/components/doc/floating-menu';
import Bubble from '@/components/doc/bubble-menu';

type Props = {
    editor: Editor
}

export default function TextEditor({ editor }: Props) {
    return (
        <>
            <EditorContent editor={editor} />
            <FloatingMenuComponent editor={editor} className='not-prose' options={{
                placement: 'bottom-start',
                strategy: 'fixed'
            }}>
                <Floating />
            </FloatingMenuComponent>
            <BubbleMenu editor={editor} className='not-prose' options={{
                placement: 'bottom-start',
                strategy: 'fixed'
            }}>
                <Bubble />
            </BubbleMenu>
        </>
    )
}