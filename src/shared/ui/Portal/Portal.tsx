import { createPortal } from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
    element?: HTMLElement;
}

export const Portal = ({ children, element = document.body }: PortalProps) =>
    createPortal(children, element);
