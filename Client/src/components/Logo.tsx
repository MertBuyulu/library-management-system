import { Button, IconBookOpen } from '@supabase/ui'
import { useNavigate } from "react-router-dom"


const Logo = () => {
    const navigate = useNavigate();
    return (
        <div className="flex space-x-2 items-stretch">
            <div>
                <Button style={{ "fontWeight": "bold", "color": "black" }} onClick={() => { navigate("/") }} type="text" size={"large"} icon={<IconBookOpen />} >
                    Library
                </Button>
            </div>
        </div>
    )
}

export default Logo;

