import React from "react"
import logo from './../logo.svg'
import { Button, Icon, IconBookOpen } from '@supabase/ui'
export default function Logo() {
    return (
        <div className="p-2">
            <Button type="default" shadow={true} size={"medium"} iconRight={<IconBookOpen />}>Library</Button>
        </div>
    )
}