"use client";

import * as React from "react";
import {
  CaretSortIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CreateStore from "@/components/forms/addProject";
import { StoreIcon } from "lucide-react";
import LStorage from "@/core/localStorage";
import { useQueryClient } from "@tanstack/react-query";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}
interface TeamSwitcherPropsEx extends TeamSwitcherProps {
  className?: string;
}

export default function ProjectSwitcher({
  className,
}: TeamSwitcherPropsEx) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const queryClient = useQueryClient()

  const storage = new LStorage()

  const project = storage.projects.getProject()
  const projects = storage.projects.getProjects()

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={project?.img} alt={project?.title} />
              <AvatarFallback>{project?.title?.substring(0, 1)}</AvatarFallback>
            </Avatar>
            {project?.title}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search for store..." />
              <CommandEmpty>No stores found.</CommandEmpty>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                {projects?.length > 0 && projects?.map((project) => {
                  return (
                    <CommandItem
                      key={project.id}
                      onSelect={() => {
                        setOpen(false);
                        storage.projects.updateProject(project);
                        queryClient.refetchQueries({queryKey: ['projects']})
                        queryClient.refetchQueries({queryKey: ['products']})
                      }}
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage src={project.img} alt={project.title} />
                        <AvatarFallback>
                          {project.title?.substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      {project.title}
                    </CommandItem>
                  );
                })}
                <CommandSeparator />
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5 text-green-500" />
                    <p className="text-green-500">Create New Store</p>
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader className="border-b pb-4">
          <div className="flex space-x-4 items-center">
            <StoreIcon className="w-8 h-8 text-green-500" />
            <div className="flex flex-col space-y-1">
              <DialogTitle>Create Store</DialogTitle>
              <DialogDescription>Add a new store to manage products and customers.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <CreateStore setShowNewTeamDialog={setShowNewTeamDialog}/>
      </DialogContent>
    </Dialog>
  );
}
