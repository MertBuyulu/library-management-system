import { Button, IconBookOpen } from "@supabase/ui";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute flex">
        <Button
          style={{ fontWeight: "bold", color: "black" }}
          onClick={() => {
            navigate("/");
          }}
          type="text"
          size={"large"}
          icon={<IconBookOpen />}
        >
          Library
        </Button>
      </div>
  );
};

export default Logo;
