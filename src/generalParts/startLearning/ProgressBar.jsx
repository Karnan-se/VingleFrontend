

const ProgressBar = ({ progress }) => {

  let customClass 
  if(progress<20){

    customClass="bg-red-600"
  }else if(progress<50){
    customClass = "bg-yellow-600"

  }else if(progress<80){
    customClass = "bg-green-600"
  }else{
    customClass = "bg-green-700"

  }
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
       className={`${customClass} h-2.5 rounded-full transition-all duration-300 ease-in-out`}
        style={{ width: `${progress}%`, opacity: 0.6 }}
      ></div>
    </div>
  )
}

export default ProgressBar

