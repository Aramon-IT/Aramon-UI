"use client";

import { createContext, useContext, useEffect, useRef, useState, type DialogHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { MediumSurface } from "@aramon/medium/react";
import { Button, type ButtonProps } from "./button";
import { cn } from "./lib/cn";

interface DialogContextValue {
  open: boolean;
  setOpen(open: boolean): void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Aramon Dialog parts must be placed inside <Dialog>.");
  return context;
}

export interface DialogProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
}

export function Dialog({ children, defaultOpen = false, onOpenChange, open: controlledOpen }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

export function DialogTrigger(props: ButtonProps) {
  const { setOpen } = useDialogContext();
  return <Button {...props} onClick={(event) => { props.onClick?.(event); if (!event.defaultPrevented) setOpen(true); }} />;
}

export function DialogClose(props: ButtonProps) {
  const { setOpen } = useDialogContext();
  return <Button {...props} className={cn(props.energy === "quiet" && "aramon-dialog-close-quiet", props.className)} onClick={(event) => { props.onClick?.(event); if (!event.defaultPrevented) setOpen(false); }} />;
}

export interface DialogContentProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  children: ReactNode;
}

export function DialogContent({ children, className, ...props }: DialogContentProps) {
  const { open, setOpen } = useDialogContext();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn("m-auto w-[min(92vw,520px)] border-0 bg-transparent p-0 text-inherit backdrop:bg-black/38 backdrop:backdrop-blur-md", className)}
      onCancel={(event) => { event.preventDefault(); setOpen(false); }}
      onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
      {...props}
    >
      <MediumSurface density="dialog" interaction="press" className="aramon-dialog-medium p-7 shadow-2xl">
        <div className="grid gap-5">{children}</div>
      </MediumSurface>
    </dialog>
  );
}

export function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("aramon-dialog-title m-0 font-serif text-3xl font-normal tracking-[-.04em]", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("aramon-dialog-description m-0 text-sm leading-[1.65]", className)} {...props} />;
}
