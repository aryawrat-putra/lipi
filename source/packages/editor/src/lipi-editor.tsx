import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'

export function LipiEditor() {
    const editor = useEditor({
        extensions: [StarterKit], // define your extension array
        content: '<p>Hello World from lipi editor my god</p>', // initial content
    })

    return (
        <>
            <EditorContent editor={editor} />
            <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </>
    )
}
