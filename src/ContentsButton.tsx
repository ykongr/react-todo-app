const ContentsButton = ({isTodo, setIsTodo}: {isTodo: boolean, setIsTodo: (value: boolean) => void}) =>  {
    const setDay1 = () => {return(setIsTodo(true))}
    const setDay2 = () => {return(setIsTodo(false))}
    return(
        <div className="flex justify-between list-none w-[350px] sm:w-[400px]  mt-5 mb-10 ">
                <button
                    onClick={() => {setDay1()}} 
                    className={`text-3xl font-name ${isTodo 
                        ? "border-none underline underline-offset-8 decoration-subtitle bg-transparent"
                        :"text-subtitle bg-transparent border-none"}`
                    }
                >
                    ガチャ石管理
                </button>
                <button
                    onClick={() => {setDay2()} }
                    className={`text-3xl font-name ${isTodo
                        ? "text-subtitle bg-transparent border-none"
                        :"border-none underline underline-offset-8 decoration-subtitle bg-transparent"}`
                    }
                >
                    カレンダー
                </button>
        </div>
    );
}
export default  ContentsButton 