import { Button } from "@repo/ui/components/button";
import { ButtonGroup } from "@repo/ui/components/button-group";
import { Input } from "@repo/ui/components/input";
import { Search } from "lucide-react";

export default function FileSearch() {
    return (
        <ButtonGroup className="w-full">
            <Input type="text" placeholder="Search documents" className="bg-muted text-muted-foreground" />
            <Button variant="outline" aria-label="Search"><Search /></Button>
        </ButtonGroup>
    )
}