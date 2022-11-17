import react from "react"

type StatCardProps = {
    Name?: String,
    Amount?: String,
    Loading?: String
}

export default function StatCard(props: StatCardProps) {
    if (props.Amount) {
        return (
            <div className="relative w-80 h-80 bg-[#6D696A] rounded-lg">
                <div className="text-white font-semibold p-2">
                    {props.Amount}
                </div>
            </div>
        )
    }


    return (
        <div className="relative w-80 h-80 bg-[#6D696A] rounded-lg">
            <div className="text-white font-semibold p-2">
                Books
            </div>
        </div>
    )
}