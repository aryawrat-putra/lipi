import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { toast } from "sonner"
import { FolderPlus } from "lucide-react"

import { Controller, useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"

import { createProjectSchema } from '../../../../api/src/constants/types';

import { postProject } from "@/services/project"
import z from "zod"
import { Spinner } from "../ui/spinner"
import { useState } from "react"

export default function CreateProjectForm() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate({ from: '/dashboard' });

    const form = useForm<z.input<typeof createProjectSchema>>({
        resolver: standardSchemaResolver(createProjectSchema),
        defaultValues: {
            name: '',
            description: '',
        }
    })

    const createProject = useMutation({
        mutationKey: ['create-project'],
        mutationFn: (values: z.input<typeof createProjectSchema>) => postProject({ description: values.description!, name: values.name }),
        onSuccess: ({ data }) => {
            // ? Navigate user to project link 
            navigate({ to: `/projects/$projectId`, params: { projectId: data![0].id! } });

            // ? Close the dialog
            setDialogOpen(false);

            // ? Inform user
            toast.success("Your project has been created");
        },
        onError: (e) => {
            console.error('Failed to create project!!!')
            console.error(e);

            toast.error("Failed to create project");
        }
    })

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant='outline'
                >
                    <FolderPlus />
                    New Project
                </Button>
            </DialogTrigger>

            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Create project with name and description here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>

                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    required={true}
                                    placeholder="Manhattan Project"
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Input
                                    id="description"
                                    type="text"
                                    placeholder="Get a Nuke ASAP team"
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" disabled={form.formState.isSubmitting} onClick={form.handleSubmit((values: z.input<typeof createProjectSchema>) => createProject.mutate(values))}>
                        {form.formState.isSubmitting && <Spinner />}
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
