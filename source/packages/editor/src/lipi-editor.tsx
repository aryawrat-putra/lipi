import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu as FloatingMenuComponent, BubbleMenu } from '@tiptap/react/menus'
import FloatingMenu from '@tiptap/extension-floating-menu'

import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
// import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import FontFamily from '@tiptap/extension-font-family';

import Floating from './menu/floating.js'
import Bubble from './menu/bubble.js'

export function LipiEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            // Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph', 'h1'],
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            // Link.configure({
            //     openOnClick: false,
            // }),
            Image,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            FontFamily,
            FloatingMenu.configure({
                options: {
                    placement: "bottom-start",
                }
            }),

        ],
        content: `
        <p>This page would be blank in normal cases</p>
        <h1>Heading</h1>
        `,
    })

    return (
        <>
            <EditorContent editor={editor} />
            <FloatingMenuComponent editor={editor} className='not-prose'>
                <Floating />
            </FloatingMenuComponent>
            <BubbleMenu editor={editor} className='not-prose'>
                <Bubble />
            </BubbleMenu>
        </>
    )
}
