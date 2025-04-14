import { Button } from "@chakra-ui/react"
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"
import { JSX, PropsWithChildren } from "react"

interface DialogModal {
    open: boolean
    title: string
    footer?: React.ReactNode
    onOpenChange: (e: { open: boolean }) => void
}

export default function DialogModal(props: PropsWithChildren<DialogModal>): JSX.Element {

    const {
        open,
        title,
        children,
        onOpenChange
    } = props

    return (
        <DialogRoot
            lazyMount
            open={open}
            onOpenChange={onOpenChange}
            placement={'center'}
            trapFocus={false}
            scrollBehavior={'inside'}
            closeOnInteractOutside={false}
            unmountOnExit
        >
            <DialogTrigger />
            <DialogContent>
                <DialogCloseTrigger />
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    {children}
                </DialogBody>
                <DialogFooter><Button bg="#00476F">Login</Button></DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}