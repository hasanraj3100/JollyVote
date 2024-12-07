import {Button} from "@headlessui/react";

export default function NavButtonSm({ active, name}) {
    return (
        <>
            <Button className={"text-2xl"}>
                <ion-icon name={`${name}${active ? '': '-outline'}`}></ion-icon>
            </Button>
        </>
    )
}
