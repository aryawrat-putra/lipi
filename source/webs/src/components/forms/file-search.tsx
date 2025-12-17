import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FileSearch() {
    return (
        <ButtonGroup className="w-full">
            <Input type="text" placeholder="Search documents" className="bg-muted text-muted-foreground" />
            <Button variant="outline" aria-label="Search"><Search /></Button>
        </ButtonGroup>
    )
}