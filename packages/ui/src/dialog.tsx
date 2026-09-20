"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, type DialogHTMLAttributes, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { MediumSurface } from "@aramon/medium/react";
import { Button, type ButtonProps } from "./button";
import { cn } from "./lib/cn";

interface DialogContextValue {
  descriptionId: string;
  open: boolean;
  setOpen(open: boolean): void;
  titleId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const wasOpen = useRef(open);
  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  useEffect(() => {
    if (wasOpen.current && !open) requestAnimationFrame(() => triggerRef.current?.focus());
    wasOpen.current = open;
  }, [open]);
  return <DialogContext.Provider value={{ descriptionId, open, setOpen, titleId, triggerRef }}>{children}</DialogContext.Provider>;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}

export function DialogTrigger({ ref, ...props }: ButtonProps) {
  const { setOpen, triggerRef } = useDialogContext();
  return <Button {...props} ref={(node) => { triggerRef.current = node; assignRef(ref, node); }} onClick={(event) => { props.onClick?.(event); if (!event.defaultPrevented) setOpen(true); }} />;
}

export function DialogClose(props: ButtonProps) {
  const { setOpen } = useDialogContext();
  return <Button {...props} className={cn(props.energy === "quiet" && "aramon-dialog-close-quiet", props.className)} onClick={(event) => { props.onClick?.(event); if (!event.defaultPrevented) setOpen(false); }} />;
}

export interface DialogContentProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  children: ReactNode;
}

export function DialogContent({ children, className, ...props }: DialogContentProps) {
  const { descriptionId, open, setOpen, titleId } = useDialogContext();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    return () => { if (dialog.open) dialog.close(); };
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={ref}
      aria-labelledby={props["aria-labelledby"] ?? titleId}
      aria-describedby={props["aria-describedby"] ?? descriptionId}
      className={cn("m-auto w-[min(92vw,520px)] border-0 bg-transparent p-0 text-inherit backdrop:bg-black/48", className)}
      onCancel={(event) => { event.preventDefault(); setOpen(false); }}
      onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
      {...props}
    >
      <MediumSurface density="dialog" interaction="press" className="aramon-dialog-medium p-7">
        <div className="grid gap-5">{children}</div>
      </MediumSurface>
    </dialog>
  );
}

export function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  const { titleId } = useDialogContext();
  return <h2 id={props.id ?? titleId} className={cn("aramon-dialog-title m-0 text-3xl font-semibold tracking-[-.04em]", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  const { descriptionId } = useDialogContext();
  return <p id={props.id ?? descriptionId} className={cn("aramon-dialog-description m-0 text-sm leading-[1.65]", className)} {...props} />;
}
