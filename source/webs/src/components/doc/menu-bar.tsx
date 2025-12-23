import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"
import { AArrowDown, AArrowUp, ArrowBigRight, ArrowDown01, ArrowDown10, Blocks, Bold, BookAlert, BookOpen, BookOpenText, CaseLower, CaseSensitive, CaseUpper, CircleDot, Clipboard, ClipboardPaste, Columns3Cog, Copy, Crop, Dock, Dot, Droplet, Ellipsis, Eye, FileLock, FilePenLine, Files, FileUser, Fullscreen, Globe, Grid2x2, Grid2x2X, Hash, ImageUp, ImageUpscale, Italic, LayoutGrid, Link2, ListIndentDecrease, ListIndentIncrease, Maximize, MessageSquarePlus, MessageSquareQuote, Minus, Paintbrush, PanelTop, PanelTopDashed, Pin, PinOff, Printer, Redo, RefreshCw, RulerDimensionLine, ScanSearch, Scissors, SpellCheck, Square, SquareCheck, SquareDashed, SquareDashedMousePointer, Star, Strikethrough, Subscript, Superscript, Table, TableOfContents, TextAlignCenter, TextAlignEnd, TextAlignStart, TextCursorInput, TextSearch, Trash2, Underline, Undo, UnfoldHorizontal, BookUser, Languages, MicVocal, FilePlus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import FilePlusCorner from "@/components/icons/FilePlusCorner"

type Props = {}

export default function DocMenubar({ }: Props) {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem><FilePlus /> New Tab</MenubarItem>
                    <MenubarItem><Files /> Make a Copy</MenubarItem>

                    <MenubarSeparator />

                    <MenubarSub>
                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem><FileUser /> Share with others</MenubarItem>
                            <MenubarItem><Globe />Publish on web</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                        <MenubarSubTrigger>Download</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Microsoft Word (.docx)</MenubarItem>
                            <MenubarItem>Open Document Format (.odt)</MenubarItem>
                            <MenubarItem>PDF Document(.pdf)</MenubarItem>
                            <MenubarItem>Text File(.txt)</MenubarItem>
                            <MenubarItem>Rich Text File (.rtf)</MenubarItem>
                            <MenubarItem>Web Page(.html)</MenubarItem>
                            <MenubarItem>EPUB Publication (.epub)</MenubarItem>
                            <MenubarItem>Markdown (.md)</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSeparator />
                    <MenubarItem><FilePenLine /> Rename</MenubarItem>
                    <MenubarItem><Star /> Make Favorite</MenubarItem>
                    <MenubarItem><Trash2 /> Move to bin</MenubarItem>

                    <MenubarSeparator />
                    <MenubarItem><BookAlert /> Details</MenubarItem>
                    <MenubarItem><FileLock /> Security</MenubarItem>
                    <MenubarItem><BookOpen /> Page Setup</MenubarItem>
                    <MenubarItem><Printer /> Print</MenubarItem>


                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem><Undo /> Undo  <MenubarShortcut>CTRL+Z</MenubarShortcut> </MenubarItem>
                    <MenubarItem><Redo /> Redo<MenubarShortcut>CTRL+Y</MenubarShortcut> </MenubarItem>

                    <MenubarSeparator />

                    <MenubarItem><Scissors /> Cut  <MenubarShortcut>CTRL+X</MenubarShortcut> </MenubarItem>
                    <MenubarItem><Copy /> Copy <MenubarShortcut>CTRL+C</MenubarShortcut> </MenubarItem>
                    <MenubarItem><Clipboard /> Paste <MenubarShortcut>CTRL+V</MenubarShortcut> </MenubarItem>
                    <MenubarItem><ClipboardPaste /> Paste without formatting<MenubarShortcut>CTRL+SHIFT+V</MenubarShortcut> </MenubarItem>

                    <MenubarSeparator />
                    <MenubarItem><TextCursorInput />Select All<MenubarShortcut>CTRL+A</MenubarShortcut> </MenubarItem>
                    <MenubarItem><Trash2 />Delete<MenubarShortcut>DELETE</MenubarShortcut> </MenubarItem>

                    <MenubarSeparator />
                    <MenubarItem><TextSearch />Find and Replace<MenubarShortcut>CTRL+H</MenubarShortcut> </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>Mode</MenubarSubTrigger>
                        <MenubarSubContent>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <MenubarItem><FilePenLine /> Editing</MenubarItem>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Edit document directly</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <MenubarItem><MessageSquareQuote /> Suggesting</MenubarItem>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Edits become suggestions</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <MenubarItem><Eye /> Viewing</MenubarItem>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Read and print final document</p>
                                </TooltipContent>
                            </Tooltip>
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSub>
                        <MenubarSubTrigger>Comments</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarCheckboxItem>Hide Comments <MenubarShortcut>CTRL+ALT+J</MenubarShortcut> </MenubarCheckboxItem>
                            <MenubarCheckboxItem>Minimize Comments <MenubarShortcut>CTRL+ALT+J</MenubarShortcut> </MenubarCheckboxItem>
                            <MenubarCheckboxItem checked>Expand Comments <MenubarShortcut>CTRL+ALT+J</MenubarShortcut> </MenubarCheckboxItem>
                            <MenubarSeparator />
                            <MenubarCheckboxItem>Show All Comments <MenubarShortcut>CTRL+ALT+J</MenubarShortcut></MenubarCheckboxItem>
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSeparator />
                    <MenubarCheckboxItem checked>Show Print Layout</MenubarCheckboxItem>
                    <MenubarCheckboxItem >Show Ruler</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>Show Equation toolbar  </MenubarCheckboxItem>
                    <MenubarCheckboxItem >Show non-printing characters </MenubarCheckboxItem>

                    <MenubarSeparator />
                    <MenubarItem><Maximize /> Full Screen</MenubarItem>

                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Insert</MenubarTrigger>
                <MenubarContent>

                    <MenubarSub>
                        <MenubarSubTrigger>Image</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem><ImageUp /> Upload your computer</MenubarItem>
                            <MenubarItem><ScanSearch /> From web</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>


                    <MenubarSub>
                        <MenubarSubTrigger>Table</MenubarSubTrigger>
                        <MenubarSubContent>

                            <MenubarSub>
                                <MenubarSubTrigger>
                                    <MenubarItem>
                                        Building Blocks
                                    </MenubarItem>
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem>Block 1</MenubarItem>
                                    <MenubarItem>Block 2</MenubarItem>
                                    <MenubarItem>Block 3</MenubarItem>
                                    <MenubarItem>Block 4</MenubarItem>
                                    <MenubarItem>Block 5</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>

                            <MenubarSeparator />
                            <MenubarItem>Grid Input</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarItem><Link2 /> Link</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem><Link2 /> Tab</MenubarItem>
                    <MenubarItem><Minus /> Horizontal Line</MenubarItem>

                    <MenubarSub>
                        <MenubarSubTrigger>Page Element</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem><TableOfContents />Table of Contents</MenubarItem>
                            <MenubarItem><Dock />Header</MenubarItem>
                            <MenubarItem><Dock className="rotate-180" />Footer</MenubarItem>

                            <MenubarSub>
                                <MenubarSubTrigger>Page Number</MenubarSubTrigger>
                                <MenubarSubContent>

                                    <MenubarSub>
                                        <MenubarSubTrigger>Top</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem><FilePlusCorner className="rotate-180" />Left</MenubarItem>
                                            <MenubarItem><FilePlusCorner className="rotate-180 -scale-x-100" />Right</MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>

                                    <MenubarSub>
                                        <MenubarSubTrigger>Bottom</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem><FilePlusCorner className="-scale-x-100" />Left</MenubarItem>
                                            <MenubarItem><FilePlusCorner />Right</MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>

                                </MenubarSubContent>
                            </MenubarSub>

                            <MenubarItem><Droplet />Watermark</MenubarItem>
                            <MenubarItem><RulerDimensionLine />Footnote</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSeparator />
                    <MenubarItem><MessageSquarePlus /> Comment</MenubarItem>

                </MenubarContent>
            </MenubarMenu>


            <MenubarMenu>
                <MenubarTrigger>Format</MenubarTrigger>
                <MenubarContent>

                    <MenubarSub>
                        <MenubarSubTrigger>Text</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem><Bold />Bold</MenubarItem>
                            <MenubarItem><Italic />Italic</MenubarItem>
                            <MenubarItem><Underline />Underline</MenubarItem>
                            <MenubarItem><Strikethrough />Strike-through</MenubarItem>
                            <MenubarItem><Superscript />Superscript</MenubarItem>
                            <MenubarItem><Subscript />Subscript</MenubarItem>
                            <MenubarSeparator />

                            <MenubarSub>
                                <MenubarSubTrigger>Font Size</MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem><AArrowUp />Increase</MenubarItem>
                                    <MenubarItem><AArrowDown />Decrease</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarSub>
                                <MenubarSubTrigger>Capitalization</MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem><CaseLower />lower case</MenubarItem>
                                    <MenubarItem><CaseUpper />UPPER CASE</MenubarItem>
                                    <MenubarItem><CaseSensitive />Title Case</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>

                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSub>
                        <MenubarSubTrigger>Paragraph</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem><SquareDashedMousePointer />Borders and shading</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Normal</MenubarItem>
                            <MenubarItem>Title</MenubarItem>
                            <MenubarItem>Subtitle</MenubarItem>
                            <MenubarItem>Heading 1</MenubarItem>
                            <MenubarItem>Heading 2</MenubarItem>
                            <MenubarItem>Heading 3</MenubarItem>
                            <MenubarItem>Heading 4</MenubarItem>
                            <MenubarItem>Heading 5</MenubarItem>
                            <MenubarItem>Heading 6</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSub>
                        <MenubarSubTrigger>Alignment and Indentation</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem><TextAlignStart />Left <MenubarShortcut>CTRL+SHIFT+E</MenubarShortcut></MenubarItem>
                            <MenubarItem><TextAlignEnd />Right <MenubarShortcut>CTRL+SHIFT+R</MenubarShortcut></MenubarItem>
                            <MenubarItem><TextAlignCenter />Center <MenubarShortcut>CTRL+SHIFT+J</MenubarShortcut></MenubarItem>
                            <MenubarItem><TextAlignEnd />Justify  <MenubarShortcut>CTRL+SHIFT+L</MenubarShortcut></MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem><ListIndentIncrease /> Increase Indent  <MenubarShortcut>CTRL+[</MenubarShortcut></MenubarItem>
                            <MenubarItem><ListIndentDecrease /> Decrease Indent  <MenubarShortcut>CTRL+]</MenubarShortcut></MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSub>
                        <MenubarSubTrigger>Line & paragraph spacing</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarRadioGroup value="single">
                                <MenubarRadioItem value="single">Single</MenubarRadioItem>
                                <MenubarRadioItem value="1.15">1.15</MenubarRadioItem>
                                <MenubarRadioItem value="1.50">1.50</MenubarRadioItem>
                                <MenubarRadioItem value="double">Double</MenubarRadioItem>
                            </MenubarRadioGroup>
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSub>
                        <MenubarSubTrigger>Columns</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarRadioGroup value="one">
                                <MenubarRadioItem value="one">1</MenubarRadioItem>
                                <MenubarRadioItem value="two">2</MenubarRadioItem>
                                <MenubarRadioItem value="three">3</MenubarRadioItem>
                                <MenubarRadioItem value="four">4</MenubarRadioItem>
                            </MenubarRadioGroup>
                            <MenubarSeparator />
                            <MenubarItem>Custom</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSub>
                        <MenubarSubTrigger>Bullets & Numbering</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarSub>
                                <MenubarSubTrigger>
                                    <MenubarItem>List Options</MenubarItem>
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem>
                                        <Button variant='outline' size='icon'>1</Button>
                                        <Button variant='outline' size='icon'>A</Button>
                                        <Button variant='outline' size='icon'>a</Button>
                                        <Button variant='outline' size='icon'>I</Button>
                                        <Button variant='outline' size='icon'>i</Button>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <Button variant='outline' size='icon'><Dot /></Button>
                                        <Button variant='outline' size='icon'><CircleDot /></Button>
                                        <Button variant='outline' size='icon'><Square /></Button>
                                        <Button variant='outline' size='icon'><ArrowBigRight /></Button>
                                        <Button variant='outline' size='icon'><Star /></Button>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <Button variant='outline' size='icon'><SquareCheck /></Button>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Restart numbering</MenubarItem>
                                    <MenubarItem>Continue previous numbering</MenubarItem>
                                    <MenubarItem>More bullets</MenubarItem>

                                </MenubarSubContent>
                            </MenubarSub>

                            <MenubarSub>
                                <MenubarSubTrigger>
                                    <MenubarItem>Numbers List Menu</MenubarItem>
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem>Numbers List Menu 1</MenubarItem>
                                    <MenubarItem>Numbers List Menu 2</MenubarItem>
                                    <MenubarItem>Numbers List Menu 3</MenubarItem>
                                    <MenubarItem>Numbers List Menu 4</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>

                            <MenubarSub>
                                <MenubarSubTrigger>
                                    <MenubarItem>Bullet List Menu</MenubarItem>
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem>Bullet List Menu 1</MenubarItem>
                                    <MenubarItem>Bullet List Menu 2</MenubarItem>
                                    <MenubarItem>Bullet List Menu 3</MenubarItem>
                                    <MenubarItem>Bullet List Menu 4</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>

                            <MenubarSub>
                                <MenubarSubTrigger>
                                    <MenubarItem>Checklist Menu</MenubarItem>
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem>Checklist Menu 1</MenubarItem>
                                    <MenubarItem>Checklist Menu 2</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>

                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSeparator />
                    <MenubarGroup>
                        <MenubarItem><PanelTop />Header & Footers</MenubarItem>
                        <MenubarItem><Hash /> Page Number</MenubarItem>
                        <MenubarItem><RefreshCw /> Page Orientation</MenubarItem>
                        <MenubarItem><Fullscreen /> Switch to Pageless format</MenubarItem>
                    </MenubarGroup>

                    <MenubarSeparator />
                    <MenubarGroup>
                        <MenubarSub>
                            <MenubarSubTrigger>Table</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem><PanelTopDashed />Insert Title Row</MenubarItem>
                                <MenubarItem><PanelTop />Insert Row Above</MenubarItem>
                                <MenubarItem><PanelTop className="rotate-180" />Insert Row Below</MenubarItem>
                                <MenubarItem><PanelTop className="-rotate-90" />Insert Column Above</MenubarItem>
                                <MenubarItem><PanelTop className="rotate-90" />Insert Column Below</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem variant="destructive"><Grid2x2X />Delete Row</MenubarItem>
                                <MenubarItem variant="destructive"><Grid2x2X className="rotate-180" />Delete Column</MenubarItem>
                                <MenubarItem variant="destructive"><Table />Delete Table</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem><Pin />Pin Header</MenubarItem>
                                <MenubarItem><PinOff />Unpin Header</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem><UnfoldHorizontal className="rotate-90" />Distribute Columns</MenubarItem>
                                <MenubarItem><UnfoldHorizontal />Distribute Rows</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem><Grid2x2 />Merge Cells</MenubarItem>
                                <MenubarItem><Blocks />Unmerge Cells</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem><ArrowDown01 />Sort Ascending</MenubarItem>
                                <MenubarItem><ArrowDown10 />Sort Descending</MenubarItem>

                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <MenubarItem><Columns3Cog />Set Column type</MenubarItem>
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarRadioGroup value="none">
                                            <MenubarRadioItem value="none">None</MenubarRadioItem>
                                            <MenubarSeparator />
                                            <MenubarRadioItem value="date">Date</MenubarRadioItem>
                                            <MenubarRadioItem value="dropdown">Dropdown</MenubarRadioItem>
                                            <MenubarRadioItem value="file">File</MenubarRadioItem>
                                            <MenubarRadioItem value="people">People</MenubarRadioItem>
                                        </MenubarRadioGroup>
                                    </MenubarSubContent>
                                </MenubarSub>

                                <MenubarSeparator />
                                <MenubarItem><LayoutGrid />Table Options</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>

                        <MenubarSub>
                            <MenubarSubTrigger>Image</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem><Crop />Crop Image</MenubarItem>
                                <MenubarItem><ScanSearch />Replace Image</MenubarItem>
                                <MenubarItem><ImageUpscale />Reset Image</MenubarItem>
                                <MenubarItem>Image Options</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>

                        <MenubarSub>
                            <MenubarSubTrigger>Borders & Lines</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarSub>
                                    <MenubarSubTrigger>Border weight</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarRadioGroup value="1">
                                            <MenubarRadioItem value="1">1 pt</MenubarRadioItem>
                                            <MenubarRadioItem value="2">2 pt</MenubarRadioItem>
                                            <MenubarRadioItem value="3">3 pt</MenubarRadioItem>
                                            <MenubarRadioItem value="4">4 pt</MenubarRadioItem>
                                            <MenubarRadioItem value="8">8 pt</MenubarRadioItem>
                                            <MenubarRadioItem value="12">12 pt</MenubarRadioItem>
                                            <MenubarRadioItem value="16">16 pt</MenubarRadioItem>
                                            <MenubarRadioItem value="24">24 pt</MenubarRadioItem>
                                        </MenubarRadioGroup>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSub>
                                    <MenubarSubTrigger>Border dash</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarRadioGroup value="None">
                                            <MenubarRadioItem value="none">None</MenubarRadioItem>
                                            <MenubarRadioItem value="plain"> <Minus /> </MenubarRadioItem>
                                            <MenubarRadioItem value="dashed"> <SquareDashed /> </MenubarRadioItem>
                                            <MenubarRadioItem value="dotted"> <Ellipsis /> </MenubarRadioItem>
                                        </MenubarRadioGroup>
                                    </MenubarSubContent>
                                </MenubarSub>
                            </MenubarSubContent>
                        </MenubarSub>
                    </MenubarGroup>
                    <MenubarSeparator />

                    <MenubarItem><Paintbrush />Clear Formatting <MenubarShortcut>CTRL+\</MenubarShortcut></MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Tools</MenubarTrigger>
                <MenubarContent>
                    <MenubarGroup>
                        <MenubarItem><SpellCheck />Spelling & Grammar</MenubarItem>
                        <MenubarItem><BookOpenText />Word Count</MenubarItem>
                        <MenubarItem><BookUser />Dictionary</MenubarItem>
                    </MenubarGroup>
                    <MenubarSeparator />
                    <MenubarGroup>
                        <MenubarItem><Languages />Translate Document</MenubarItem>
                        <MenubarItem><MicVocal />Voice Typing</MenubarItem>
                    </MenubarGroup>
                </MenubarContent>
            </MenubarMenu>

        </Menubar>
    )
}