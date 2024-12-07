import {Button} from "@headlessui/react";

export default function CategoryButton({name}) {
    return (

            <Button className={'rounded-full border-2 border-gray-300 py-2 px-4'}>
                <span>{name}</span>
            </Button>

    );
}
