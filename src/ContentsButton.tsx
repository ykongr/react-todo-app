const ContentsButton = ({isTodo, setIsTodo}: {isTodo: boolean, setIsTodo: (value: boolean) => void}) =>  {
    const setDay1 = () => {return(setIsTodo(true))}
    const setDay2 = () => {return(setIsTodo(false))}
    return(
        <div className="flex justify-between list-none w-[200px]">
                <button
                    onClick={() => {setDay1()}} 
                    className={`text-3xl font-Hachi ${isTodo 
                        ? "border-none underline underline-offset-8 decoration-subtitle bg-transparent"
                        :"text-subtitle bg-transparent border-none"}`
                    }
                >
                    day1
                </button>
                <button
                    onClick={() => {setDay2()} }
                    className={`text-3xl font-Hachi ${isTodo
                        ? "text-subtitle bg-transparent border-none"
                        :"border-none underline underline-offset-8 decoration-subtitle bg-transparent"}`
                    }
                >
                    day2
                </button>
        </div>
    );
}
export default  ContentsButton 