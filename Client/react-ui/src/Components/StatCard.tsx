import react from "react"

type StatCardProps = {
    Name?: String,
    Amount?: String,
    Loading?: String
}

export default function StatCard(props: StatCardProps) {
    if (props.Amount != undefined) {
        return (
            <div className="flex flex-col items-center  w-60 h-60 bg-[#6D696A] rounded-lg">
                <div className="text-white  font-semibold p-2">
                    {props.Name}
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div className="text-white font-bold text-6xl">
                        {props.Amount}
                    </div>
                </div>


            </div>
        )
    }

    return (
        <div>
            Loading
        </div>

    )


    return (
        <div className="relative w-80 h-80 bg-[#6D696A] rounded-lg">
            <div className="text-white font-semibold p-2">
                Books
            </div>
        </div>
    )
}