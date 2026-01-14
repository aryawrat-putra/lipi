import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { useState } from "react"
import { Replace, ReplaceAll, StepBack, X, StepForward } from "lucide-react"

type props = {
    editor: Editor;
    closeCard: (v: string) => void;
}

export function FindAndReplaceCard({ editor, closeCard }: props) {
    const [find, setFind] = useState("")
    const [replace, setReplace] = useState("")

    if (!editor) return null

    return (
        <Card className="min-w-sm">
            <CardHeader>
                <CardTitle>Find and Replace</CardTitle>
                <CardAction>
                    <Button variant={'outline'} size={'icon-sm'} onClick={() => closeCard('none')}><X /></Button>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-2">
                <Input
                    type="text"
                    placeholder="Find it"
                    value={find}
                    onChange={e => setFind(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Replace with"
                    value={replace}
                    onChange={e => setReplace(e.target.value)}
                />
            </CardContent>
            <CardFooter className="gap-4">
                <Button disabled={false} variant='secondary' size='sm'><Replace />Replace</Button>
                <Button disabled={false} variant='secondary' size='sm'><ReplaceAll />Replace All</Button>
                <Button disabled={false} variant='default' size='sm'><StepBack />Previous</Button>
                <Button disabled={false} variant='default' size='sm'><StepForward /> Next</Button>
            </CardFooter>
        </Card>
    )
}
