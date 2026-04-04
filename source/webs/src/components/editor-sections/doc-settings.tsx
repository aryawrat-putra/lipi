import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel, FieldContent, FieldGroup, FieldTitle, } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import { format } from "date-fns";
import Loading from '@/components/non-interactive/loader';
import SomethingWentWrong from '@/components/non-interactive/error';
import { X, FileCog, Calendar, CalendarClock, GalleryHorizontalEnd } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useParams } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { getDocById } from "@/services/document"
import UserDetails from "../cards/user-details"

function DocSettings() {
    const { docId } = useParams({ from: '/(auth)/editor/$docId/' });

    const { isPending, error, data } = useQuery({
        queryKey: ['document', docId],
        queryFn: () => getDocById(docId),
    });

    if (isPending) return <Loading />
    if (error) return <SomethingWentWrong />

    const document = data?.data?.[0];

    if (!document) return null;

    console.log(document)
    return (
        <Dialog>
            <Tooltip>
                <DialogTrigger asChild>
                    <TooltipTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <FileCog />
                        </Button>
                    </TooltipTrigger>
                </DialogTrigger>

                <TooltipContent>
                    <p>Document Settings</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="min-w-xl">
                <DialogHeader>
                    <DialogTitle>Document Settings</DialogTitle>
                    <DialogDescription>
                        Manage document visibility, metadata and collaboration access.
                    </DialogDescription>
                </DialogHeader>


                <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4 space-y-6">
                    {/* DOCUMENT INFO SECTION */}
                    <div className="space-y-4">
                        <h3 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">Info</h3>

                        <Field>
                            <FieldLabel htmlFor="input-demo-api-key">Document Name</FieldLabel>
                            <Input
                                id="input-demo-api-key"
                                type="text"
                                defaultValue={document.title}
                                placeholder="Document name"
                            />
                            <FieldDescription>
                                Name of this document.
                            </FieldDescription>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="input-demo-api-key">Editing Lock</FieldLabel>
                            <div className="flex items-center space-x-2">
                                <Switch id="editing-lock"
                                    defaultChecked={document.isLocked}
                                />
                                <Label htmlFor="editing-lock">{document.isLocked ? 'Document is locked. Nobody can edit.' : 'Document is not locked. Anyone can edit.'}</Label>
                            </div>
                            <FieldDescription>
                                On or Off editing mode.
                            </FieldDescription>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="document-versions">Versions</FieldLabel>
                            <div>
                                <Badge variant="secondary">
                                    {document.allVersionsIds.length} Versions
                                    <GalleryHorizontalEnd data-icon="inline-start" className="size-3" />
                                </Badge>
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="input-demo-api-key">Timestamps</FieldLabel>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-muted-foreground">Created</p>
                                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                                        <Calendar className="size-4" />
                                        {format(new Date(document.createdAt), "MMM d, yyyy")}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-muted-foreground">Updated</p>
                                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                                        <CalendarClock className="size-4" />
                                        {format(new Date(document.updatedAt), "MMM d, yyyy")}
                                    </div>
                                </div>
                            </div>
                            <FieldDescription>
                                It shows everyone's edit.
                            </FieldDescription>
                        </Field>
                    </div>

                    {/* PUBLISHING & VISIBILITY SECTION */}
                    <div className="space-y-4">
                        <h3 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">Publishing & Visibility</h3>
                        <FieldGroup>
                            <FieldLabel htmlFor="switch-published">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>Published</FieldTitle>
                                        <FieldDescription>Make document visible to others</FieldDescription>
                                    </FieldContent>
                                    <Switch
                                        id="switch-published"
                                        defaultChecked={document.isPublished}
                                    />
                                </Field>
                            </FieldLabel>

                            <FieldLabel htmlFor="switch-favorite">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>Add to Favorites</FieldTitle>
                                        <FieldDescription>Star this document for quick access</FieldDescription>
                                    </FieldContent>
                                    <Switch
                                        id="switch-favorite"
                                        defaultChecked={document.isFavorite}
                                    />
                                </Field>
                            </FieldLabel>

                            <FieldLabel htmlFor="switch-trash">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>Move to trash</FieldTitle>
                                        <FieldDescription>Move to trash folder.</FieldDescription>
                                    </FieldContent>
                                    <Switch
                                        id="switch-trash"
                                        defaultChecked={document.isDeleted}
                                    />
                                </Field>
                            </FieldLabel>
                        </FieldGroup>
                    </div>

                    {/* COLLABORATION SECTION */}
                    <div className="space-y-4">
                        <h3 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">Collaboration</h3>

                        {/* Created By */}
                        {document.createdByUserId && (
                            <div className="space-y-2">
                                <p className="text-xs font-medium text-muted-foreground uppercase">Created By</p>
                                <UserDetails userIds={[document.createdByUserId]} />
                            </div>
                        )}

                        {/* Last Edited By */}
                        {document.lastEditedByUserId && (
                            <div className="space-y-2">
                                <p className="text-xs font-medium text-muted-foreground uppercase">Last Edited By</p>
                                <UserDetails userIds={[document.lastEditedByUserId]} />
                            </div>
                        )}

                        {/* Editors */}
                        {document.editorsId.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs font-medium text-muted-foreground uppercase">Editors ({document.editorsId.length})</p>
                                <UserDetails userIds={document.editorsId} />
                            </div>
                        )}
                    </div>
                </div>

                 <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Close</Button>
                    </DialogClose>

                    <Button disabled>
                        Save changes
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default DocSettings;