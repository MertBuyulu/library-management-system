import React from "react"
import { Button, Icon, IconBookOpen } from '@supabase/ui'
import { useNavigate } from "react-router-dom"


export default function Logo() {
    let navigate = useNavigate();
    return (
        <div className="flex space-x-2 flex items-stretch">
            <div>
                <Button style={{ "fontWeight": "bold", "color": "black" }} onClick={() => { navigate("/") }} type="text" size={"large"} icon={<IconBookOpen />} >
                    Library
                </Button>
            </div>
            {/* <body className="relative">
                <div className="absolute left-1/2 ml-1 w-0.5 h-full bg-slate-600">
                </div>
            </body> */}
        </div>
    )
}

