import { Editor } from "@tiptap/react"

export function editorCommands(editor: Editor) {
  if (!editor) console.error('No Editor Context!!!')

  return {
    // History
    undo: () => editor.chain().focus().undo().run(),
    redo: () => editor.chain().focus().redo().run(),

    // Selection
    cut: () => {
      let selected = editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to);
      navigator.clipboard.writeText(selected).then(
        function () { console.log('Async: Copying to clipboard was successful!'); },
        function (err) { console.error('Async: Could not copy text: ', err); }
      );
      editor.chain().focus().deleteSelection().run()
    },
    copy: () => {
      let selected = editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to);

      navigator.clipboard.writeText(selected).then(
        function () { console.log('Async: Copying to clipboard was successful!'); },
        function (err) { console.error('Async: Could not copy text: ', err); }
      );
    },
    pasteWithFormatting: async () => {
      if (!editor) return
      const clipboardItems = await navigator.clipboard.read()

      for (const item of clipboardItems) {
        if (item.types.includes("text/html")) {
          const blob = await item.getType("text/html")
          const html = await blob.text()

          editor.chain().focus().insertContent(html).run()
          return
        }
      }

      // fallback to plain text
      const text = await navigator.clipboard.readText()
      editor.chain().focus().insertContent(text).run()
    },
    pastePlainText: async () => {
      if (!editor) return

      const text = await navigator.clipboard.readText()
      editor.chain().focus().insertContent(text).run()
    },
    selectALl: () => editor.chain().focus().selectAll().run(),
    deleteSelected: () => editor.chain().focus().deleteSelection().run(),

    // // Text styles
    // bold: () => editor.chain().focus().toggleBold().run(),
    // italic: () => editor.chain().focus().toggleItalic().run(),
    // underline: () => editor.chain().focus().toggleUnderline().run(),
    // strike: () => editor.chain().focus().toggleStrike().run(),

    // // Headings
    // paragraph: () => editor.chain().focus().setParagraph().run(),
    // heading: (level: 1 | 2 | 3 | 4 | 5 | 6) =>
    //   editor.chain().focus().toggleHeading({ level }).run(),

    // // Lists
    // bulletList: () => editor.chain().focus().toggleBulletList().run(),
    // orderedList: () => editor.chain().focus().toggleOrderedList().run(),

    // // Alignment (needs extension later)
    // alignLeft: () => editor.chain().focus().setTextAlign("left").run(),
    // alignCenter: () => editor.chain().focus().setTextAlign("center").run(),
    // alignRight: () => editor.chain().focus().setTextAlign("right").run(),

    // // Insert
    // horizontalRule: () => editor.chain().focus().setHorizontalRule().run(),
    // hardBreak: () => editor.chain().focus().setHardBreak().run(),

    // // Clear
    // clearFormatting: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
  }
}
