import React from "react"
import logo from './../logo.svg'
import { Button, Icon, IconBookOpen } from '@supabase/ui'
import { useNavigate } from "react-router-dom"
export default function Logo() {
    let navigate = useNavigate();
    return (
        <div className="p-2">
            <Button onClick={() => { navigate("/") }} type="default" shadow={true} size={"medium"} iconRight={<IconBookOpen />}>Library</Button>
        </div>
    )
}