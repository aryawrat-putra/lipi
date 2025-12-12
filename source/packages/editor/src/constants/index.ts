import { LuHeading } from 'react-icons/lu';
import { CiBoxList } from "react-icons/ci";
import {
    MdOutlineTextFields,
    MdOutlineFormatListBulleted,
    MdOutlineFormatListNumbered,
    MdOutlineFormatQuote,
    MdOutlineCode,
    MdOutlineHorizontalRule,
    MdOutlineImage,
    MdOutlineTableChart,
    MdOutlineInsertLink ,
} from 'react-icons/md';

export const FloatingMenuItemsData = [
    {
        name: "Paragraph",
        icon: MdOutlineTextFields,
        onClick: () => {
            // Logic for inserting a Paragraph
            console.log("Insert Paragraph");
        }
    },
    {
        name: "Heading",
        icon: LuHeading,
        onClick: () => {
            // Logic for inserting a Heading
            console.log("Insert Heading");
        }
    },
    {
        name: "Bullet list",
        icon: MdOutlineFormatListBulleted,
        onClick: () => {
            // Logic for inserting a Bullet List
            console.log("Insert Bullet List");
        }
    },
    {
        name: "Numbered list",
        icon: MdOutlineFormatListNumbered,
        onClick: () => {
            // Logic for inserting a Numbered List
            console.log("Insert Numbered List");
        }
    },
    {
        name: "Task list",
        icon: CiBoxList,
        onClick: () => {
            // Logic for inserting a Task List
            console.log("Insert Task List");
        }
    },
    {
        name: "Quote",
        icon: MdOutlineFormatQuote,
        onClick: () => {
            // Logic for inserting a Quote
            console.log("Insert Quote");
        }
    },
    {
        name: "Code block",
        icon: MdOutlineCode,
        onClick: () => {
            // Logic for inserting a Code Block
            console.log("Insert Code Block");
        }
    },
    {
        name: "Divider",
        icon: MdOutlineHorizontalRule,
        onClick: () => {
            // Logic for inserting a Divider (Horizontal Rule)
            console.log("Insert Divider");
        }
    },
    {
        name: "Image",
        icon: MdOutlineImage,
        onClick: () => {
            // Logic for inserting an Image
            console.log("Insert Image");
        }
    },
    {
        name: "Table",
        icon: MdOutlineTableChart,
        onClick: () => {
            // Logic for inserting a Table
            console.log("Insert Table");
        }
    },
    {
        name: "Embed",
        icon: MdOutlineInsertLink ,
        onClick: () => {
            // Logic for inserting an Embed
            console.log("Insert Embed");
        }
    },
];
