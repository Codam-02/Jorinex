'use client'

export default function Sidebar({setMode} : any) {
    return (
    <div className="flex h-screen flex-col justify-between border-e bg-gray-900">
        <div className="px-4 py-6">
            <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                Logo
            </span>

            <ul className="mt-6 space-y-1">
                <li>
                    <a
                    href="#"
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                    >
                        General
                    </a>
                </li>
            </ul>
        </div>
    </div>
    )
}